import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import BackGround from "./components/BackGround";
import Home from "./pages/Home";
import Nutrition from "./pages/Nutrition";
import Pictures from "./pages/Pictures";
import Training from "./pages/Training";



const App = () => (
    <Router>
        <div className="container">
            <NavBar />
            <BackGround />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/Nutrition" component={Nutrition} />
                    <Route exact path="/Pictures" component={Pictures} />
                    <Route exact path="/Training" component={Training} />
                </Switch>
        </div>
    </Router>
);

export default App;