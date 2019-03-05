import React, { component } from "react";
import "./SignUp.css";

class SignUp extends Component {
    
    
    
    
    render() {
        return (
            <div id="signUpForm">
                <form>
                    <input type="text" name="email" placeholder="Enter Email..." />
                    <input type="password" name="password" placeholder="Enter Password..." />
                    <input type="password" name="rePassword" placeholder="Re-enter Password..." />
                </form>
            </div>
        )
    }
}

export default SignUp;