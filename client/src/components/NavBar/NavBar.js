import React from "react";
import "./NavBar.css";

const NavBar = () => (
    <div className="wrapper">
    <nav>
        <div className="logo">Climb BETA</div>
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/Training">Training</a>
            </li>
            <li>
                <a href="/Nutrition">Nutrition</a>
            </li>
            <li>
                <a href="/Pictures">Pictures</a>
            </li>
            <li>
                <a className="active" href="https://github.com/James-Inch">Log in</a>
            </li>
        </ul>
    </nav>
</div>
);

export default NavBar;