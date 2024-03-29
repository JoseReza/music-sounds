
import "./sound-card.css";
import React, { useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";

export const SoundCard = ({ index, fileName, fileUrl, playAudio, saveSoundCard }) => {


    const [playPause, setPlayPause] = useState(<BsFillPlayFill></BsFillPlayFill>);
    const [state, setState] = useState(false);
    const [duration, setDuration] = useState(0);
    const [timeTranscurred, setTimeTranscurred] = useState(0);

    let propierties = {
        index,
        playPause,
        setPlayPause,
        state,
        setState,
        duration,
        setDuration,
        timeTranscurred,
        setTimeTranscurred,
        fileName,
        fileUrl,
    };

    saveSoundCard(propierties);

    const getUrl = async (event, url) => {
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(url)
                let oldHTML = event.target.innerHTML;
                event.target.innerHTML = "Copied succesfully!!";
                let styles = getComputedStyle(event.target);
                let oldBackgroundColor = styles.backgroundColor;
                event.target.style.backgroundColor = "#444";
                setTimeout(() => {
                    event.target.innerHTML = oldHTML;
                    event.target.style.backgroundColor = oldBackgroundColor;
                }, 3000);
            } catch (error) {
                console.error('Unable to copy text to clipboard', error);
            }
        } else {
            console.error('Clipboard API not supported. Using fallback method.');
        }
    }

    const getName = async (event, fileName) => {
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(fileName)
                let oldHTML = event.target.innerHTML;
                event.target.innerHTML = "Copied succesfully!!";
                let styles = getComputedStyle(event.target);
                let oldBackgroundColor = styles.backgroundColor;
                event.target.style.backgroundColor = "#444";
                setTimeout(() => {
                    event.target.innerHTML = oldHTML;
                    event.target.style.backgroundColor = oldBackgroundColor;
                }, 3000);
            } catch (error) {
                console.error('Unable to copy text to clipboard', error);
            }
        } else {
            console.error('Clipboard API not supported. Using fallback method.');
        }
    }

    return (<>
        <div className="sounds-card">
            <div style={{ minHeight: "4rem", maxHeight: "4rem", wordBreak: "break-all" }}>
                <b>{fileName}</b>
            </div>
            <div>
                <div style={{ fontSize: "2rem" }} onClick={() => playAudio(propierties)}>
                    {playPause}
                </div>
                <progress style={{ width: "8rem" }} value={timeTranscurred} max={duration}></progress>
            </div>
            <p>{Number(timeTranscurred).toFixed(1)}s/{Number(duration).toFixed(1)}s</p>
            <div
                style={{ borderRadius: "5px", backgroundColor: "orange", color: "white", cursor: "pointer" }}
                onClick={(event) => { getUrl(event, fileUrl) }}
            >Get url</div>
            <br></br>
            <div
                style={{ borderRadius: "5px", backgroundColor: "rgb(33, 150, 243)", color: "white", cursor: "pointer" }}
                onClick={(event) => { getName(event, fileName) }}
            >Get name</div>
            <br></br>
        </div>
    </>);
}