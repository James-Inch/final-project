import React, { Component } from "react";
import "./LoginPage.css";
import Auth from "../../utils/auth";

class LoginPage extends Component {
    state = {
        email: "",
        password: ""
    }

    handleInputChange = event => {      
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.password
        };

        fetch("/login", {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => {
                // Server returns "JWT ..." so we need to split off the token
                const token = response.token.split(" ")[1];
                Auth.login(token);
            })
            .catch(error => console.error('Error:', error));
    }


    render() {
        return (
            <div id="formContainer">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="email" placeholder="Email..." onChange={this.handleInputChange} />
                    <input type="password" name="password" placeholder="Password..." onChange={this.handleInputChange} />
                    <button>Log in</button>
                </form>
            </div>
        );
    }
}

export default LoginPage;