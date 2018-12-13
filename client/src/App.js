import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import NavBar from "./components/NavBar";
import BackGround from "./components/BackGround";
import Home from "./pages/Home";
import Nutrition from "./pages/Nutrition";
import Pictures from "./pages/Pictures";
import Training from "./pages/Training";
import LoginPage from "./pages/LoginPage";

const App = () => (
    <Router>
        <div className="container">
            <NavBar />
            <BackGround />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/nutrition" component={Nutrition} />
                    <Route exact path="/pictures" component={Pictures} />
                    <Route exact path="/training" component={Training} />
                    <Route exact path="/login" component={LoginPage} />
                </Switch>
        </div>
    </Router>
);

export default App;