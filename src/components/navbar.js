import "./navbar.css";
import React, { useEffect, useState } from "react";
import icon from "./../icon.svg"

export const Navbar = ({ onChangeSearchValue, soundsCounter }) => {

    return (
        <>
            <div style={{ position: "fixed", backgroundColor: "#222", color: "white", width: "100%", padding: "1rem", top: "0", display: "flex", overflowX: "hidden", whiteSpace:"nowrap" }}>
                <div style={{ float: "left", marginLeft: "1rem", marginRight: "1rem", backgroundColor: "#333", borderRadius: "5px", borderBottom: "solid 3px rgb(33, 150, 243)", borderRight: "solid 3px rgb(33, 150, 243)", display:"flex" }}>
                    <div style={{ float: "left", marginLeft: "1rem" }}>
                        <img src={icon} style={{ width: "50px" }}></img>
                    </div>
                    <div style={{ float: "left", marginLeft: "0.5rem", marginRight: "1rem", marginTop: "1rem" }}>
                        Music Sounds
                    </div>
                </div>
                <div style={{ width: "8rem", float: "left", marginLeft: "0.25rem", marginRight: "1rem", backgroundColor: "#333", borderRadius: "5px", borderBottom: "solid 3px rgb(33, 150, 243)", borderRight: "solid 3px rgb(33, 150, 243)" }}>
                    <div style={{ margin: "1rem" }}>
                        <b>
                            {soundsCounter} Results
                        </b>
                    </div>
                </div>
                <input type="text" onChange={
                    (event) => {
                        onChangeSearchValue(event.target.value);
                    }
                }
                    style={{ width: "60%", minHeight: "2.5rem", float: "left", marginTop: "0.5rem", borderRadius: "5px", backgroundColor: "#777", color: "white", borderBottom: "solid 3px rgb(33, 150, 243)", borderRight: "solid 3px rgb(33, 150, 243)" }} placeholder="Search sound"></input>
            </div>
        </>
    );
}