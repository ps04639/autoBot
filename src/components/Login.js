import React from "react";
import { Redirect } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import spinner from "../logo.svg";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            isAuthenticated: false,
            user: null,
            isSubmitting: false,
            errorMessage: ""
        };
    }
    onSubmit = e => {
        if (this.state.username !== "") {
            e.preventDefault();
            this.login();
        }
    };

    login = () => {
        this.toggleIsSubmitting();
        let user = this.state.username;
        setTimeout((user) => {
            this.setState({
                user,
                isAuthenticated: true
            });
        }, 3000);
    };

    toggleIsSubmitting = () => {
        this.setState(prevState => ({
            isSubmitting: !prevState.isSubmitting
        }));
    };

    handleInputChange = e => {
        this.setState({
            username: e.target.value
        });
    };

    render() {
        if (this.state.isAuthenticated) {
            return (
                <Redirect
                    to={{
                        pathname: "/chat",
                        state: { user: this.state.user }
                    }}
                />
            );
        }

        return (
            <div className="App chat-box-visible">
                <ChatHeader></ChatHeader>
                <form className="form" onSubmit={this.onSubmit}>

                    <input placeholder="Enter Your Name" onChange={this.handleInputChange} type="text" />
                    <input placeholder="Enter Your Email" onChange={this.handleInputChange} type="email" />
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
        );
    }
}

export default Login;
