import React from "react";
import { Redirect } from "react-router-dom";
//import ChatHeader from "./ChatHeader";
import spinner from "../logo.svg";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            isAuthenticated: false,
            email: '',
            isSubmitting: false,
            errorMessage: ''
        };
    }

    onSubmit = e => {
        if (this.validateUser() && this.validateEmail()) {
            e.preventDefault();
            this.login();
        } else { e.preventDefault(); this.showErrorMessage("please enter a valid email id"); }
    };

    validateUser = () => {
        return (this.state.username !== "") ? true : false;
    }

    validateEmail = () => {
        const email = this.state.email;
        let regexCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (regexCheck.test(email)) ? true : false;
    };

    showErrorMessage = errorText => {
        this.setState({
            errorMessage: errorText
        });
        this.removeErrorMessage();
    }
    removeErrorMessage = () => {
        let timer = setTimeout(() => {
            this.setState({ errorMessage: "" });
            clearTimeout(timer);
        }, 3000)
    };

    removeErrorMessageImmediate = () => this.setState({ errorMessage: "" });

    login = () => {
        this.toggleIsSubmitting();
        this.removeErrorMessageImmediate();
        let spinnerTime = setTimeout(() => {
            this.setState({
                isAuthenticated: true
            });
            clearTimeout(spinnerTime);
        }, 2000);
    };

    toggleIsSubmitting = () => {
        this.setState(prevState => ({
            isSubmitting: !prevState.isSubmitting
        }));
    };

    handleInputChange = e => this.setState({ username: e.target.value });
    handleInputChangeEmail = e => this.setState({ email: e.target.value });


    closeChatWindow = () => {
        let el = document.getElementsByClassName('login-box-visible')[0];
        let el1 = document.getElementsByClassName('chat-popup')[0];
        el.style.transform = "scale(0)";
        el1.style.transform = "scale(1)";
    };
    openChatWindow = () => {
        let el = document.getElementsByClassName('login-box-visible')[0];
        let el1 = document.getElementsByClassName('chat-popup')[0];
        el.style.transform = "scale(1)";
        el1.style.transform = "scale(0)";
    };

    render() {
        if (this.state.isAuthenticated) {
            return (
                <Redirect
                    to={{
                        pathname: "/chat",
                        state: { username: this.state.username }
                    }}
                />
            );
        }

        return (

            <div>
                <a className="chat-popup" onClick={this.openChatWindow}><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></a>

                <div className="App login-box-visible">
                    <div className="chat-header">
                        <h2 className="chat-header-h2">Auto Bot(ATA)</h2>
                        <a className="chat-header-close-button" onClick={this.closeChatWindow}><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></a>
                    </div>

                    <form className="form" onSubmit={this.onSubmit}>

                        <input placeholder="Enter Your Name" onChange={this.handleInputChange} type="text" />
                        <input placeholder="Enter Your Email" onChange={this.handleInputChangeEmail} type="text" />
                        <span className="error">{this.state.errorMessage}</span>


                        {this.state.isSubmitting ? (
                            <img src={spinner} alt="Spinner component" className="App-logo" />
                        ) : (
                                <input
                                    type="submit"
                                    disabled={this.state.username === ""}
                                    value="LOGIN"
                                />
                            )}
                    </form>

                </div>
            </div>
        );
    }
}

export default Login;
