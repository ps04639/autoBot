import React, { Component } from 'react';
//import ChatMessage from "./ChatMessage";

class ChatHistory extends Component {

    generateClasses = (message) => {
        if (message.from === 'bot') {
            return 'bot-message';
        } else if (message.from === 'bot-auto') {
            return 'bot-master-message';
        }
        else {
            return 'user-message';
        }
    }
    cl = (event) => {
        this.props.sendMessage({
            message: event.currentTarget.textContent,
            from: 'you'
        });
    }

    render() {
        return (
            <div className="chat-output chat-output-content">
                <div className="chat-output-inner">
                    {this.props.messages.map((message, i) => {
                        return (
                            <div key={i} className={this.generateClasses(message)}>
                                {
                                    message.from === 'bot-auto'
                                        ? <div className="message" onClick={this.cl} >{message.message}</div>
                                        : <div className="message" >{message.message}</div>
                                }

                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default ChatHistory;