import React from "react";
import NavBar from "./components/NavBar";
import BackGround from "./components/BackGround";
import Scraped from "./components/Scraped";

const App = () => (
    <div className="container">
        <NavBar />
        <BackGround />
        <Scraped />
    </div>
);

export default App;