import "./sounds.css";
import React, { useState, useEffect } from "react";
import { SoundCard } from "./sound-card";
import { BsFillPlayFill, BsFillStopFill } from "react-icons/bs";

export const Sounds = ({ navbarSearchValue, onChangeCounter }) => {

    let urlFilesytem = (process.env.NODE_ENV === "production" ? process.env.REACT_APP_FILESYSTEM_HOST_PRODUCTION : process.env.REACT_APP_FILESYSTEM_HOST_DEVELOPMENT);

    const [files, setFiles] = useState([]);

    useEffect(() => {
        const start = async () => {
            let response = await fetch(urlFilesytem + "/filesystem.json", {
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const responseParse = await response.json();
            let paths = responseParse;
            let filteredPaths = [];
            for (let path of paths) {
                let pathSplitted = path.split("/");
                let fileName = String(pathSplitted[pathSplitted.length - 2] + "/" + pathSplitted[pathSplitted.length - 1]).toLowerCase();
                if (String(fileName).includes(String(navbarSearchValue).toLocaleLowerCase())) {
                    filteredPaths.push(path);
                }
            }

            for (let index of Object.keys(soundCards)) {
                soundCards[index].setPlayPause(<BsFillPlayFill></BsFillPlayFill>);
                soundCards[index].setState(false);
                soundCards[index].setTimeTranscurred(0);
            }

            for (let index of Object.keys(audios)) {
                audios[index].pause();
                audios[index].currentTime = 0;
                if (audios[index].interval) {
                    clearInterval(audios[index].interval);
                }
                if (audios[index].timeout) {
                    clearTimeout(audios[index].timeout);
                }
            }

            onChangeCounter(filteredPaths.length);
            setFiles(filteredPaths);
        }
        start();
    }, [navbarSearchValue]);

    const soundCards = {};
    let audios = {};

    const saveSoundCard = (propierties) => {
        soundCards[propierties.index] = propierties;
    }

    const playAudio = async (propierties) => {

        for (let index of Object.keys(soundCards)) {
            if (index !== propierties.index) {
                soundCards[index].setPlayPause(<BsFillPlayFill></BsFillPlayFill>);
                soundCards[index].setState(false);
                soundCards[index].setTimeTranscurred(0);
            }
        }

        for (let index of Object.keys(audios)) {
            if (index !== propierties.index) {
                audios[index].pause();
                audios[index].currentTime = 0;
                if (audios[index].interval) {
                    clearInterval(audios[index].interval);
                }
                if (audios[index].timeout) {
                    clearTimeout(audios[index].timeout);
                }
            }
        }


        if (soundCards[propierties.index].state) {

            soundCards[propierties.index].setPlayPause(<BsFillPlayFill></BsFillPlayFill>);
            soundCards[propierties.index].setTimeTranscurred(0);

            audios[propierties.index].pause();
            audios[propierties.index].currentTime = 0;

            clearInterval(audios[propierties.index].interval);
            clearTimeout(audios[propierties.index].timeout);

        } else {

            audios[propierties.index] = new Audio(propierties.fileUrl);

            await new Promise((resolve, reject) => {
                audios[propierties.index].addEventListener("canplay", async () => {
                    resolve();
                });
            });

            audios[propierties.index].interval = setInterval(() => {
                soundCards[propierties.index].setTimeTranscurred(soundCards[propierties.index].timeTranscurred + 10 / 1000);
            }, 10);

            audios[propierties.index].timeout = setTimeout(() => {

                soundCards[propierties.index].setPlayPause(<BsFillPlayFill></BsFillPlayFill>);
                soundCards[propierties.index].setState(false);
                soundCards[propierties.index].setTimeTranscurred(0);

                clearInterval(audios[propierties.index].interval);
                clearTimeout(audios[propierties.index].timeout);
            }, audios[propierties.index].duration * 1000);

            soundCards[propierties.index].setDuration(audios[propierties.index].duration);
            soundCards[propierties.index].setPlayPause(<BsFillStopFill></BsFillStopFill>);
            audios[propierties.index].play();

        }
        soundCards[propierties.index].setState(!soundCards[propierties.index].state);

    };

    return (
        <>
            <div className="sounds">
                {
                    files.map((path, index) => {
                        let pathSplitted = path.split("/");
                        let fileName = pathSplitted[pathSplitted.length - 2] + "/" + pathSplitted[pathSplitted.length - 1];
                        let fileUrl = urlFilesytem + path;
                        return <SoundCard
                            key={index}
                            index={index}
                            fileName={fileName}
                            fileUrl={fileUrl}
                            playAudio={playAudio}
                            saveSoundCard={saveSoundCard}
                        ></SoundCard>
                    })
                }
            </div>
        </>
    );
}