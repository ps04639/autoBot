import React, { Component } from 'react';
import ChatMessage from "./ChatMessage";


class ChatHistory extends Component {
    render() {
        return (
            <div className="chat-output chat-output-content">
                <div className="chat-output-inner">
                    {this.props.messages.map(function (message, i) {
                        return (
                            <ChatMessage key={i} message={message}></ChatMessage>
                        );
                    })}

                </div>

            </div>
        )
    }
}

export default ChatHistory;