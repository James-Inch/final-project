import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Auth from "./utils/auth";
import NavBar from "./components/NavBar";
import BackGround from "./components/BackGround";
import Home from "./pages/Home";
import Nutrition from "./pages/Nutrition";
import Pictures from "./pages/Pictures";
import Training from "./pages/Training";
import LoginPage from "./pages/LoginPage";


class App extends Component {
    state = {
        token: Auth.getToken()
    }    
    
    componentDidMount() {
        Auth.onAuthChange(this.handleAuthChange);
    }

    handleAuthChange = token => {
        this.setState({
            token
        });
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <NavBar token={this.state.token} />
                    <BackGround />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <PrivateRoute exact path="/nutrition" component={Nutrition} token={this.state.token} />
                        <PrivateRoute exact path="/pictures" component={Pictures} token={this.state.token} />
                        <PrivateRoute exact path="/training" component={Training} token={this.state.token} />
                        <Route exact path="/login" component={LoginPage} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

const PrivateRoute = ({ component: Component, token, ...rest }) => (	  
    <Route {...rest} render={props => (
		token ? (
			<Component {...props} token={token} />
		) : (
			<Redirect to={{
				pathname: '/login',
				state: { from: props.location }
			}}/>
		)
	)}/>
)


export default App;