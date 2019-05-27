import React, { Component } from 'react';
import ChatMessage from "./ChatMessage";


class ChatHistory extends Component {
    render() {
        return (
            <div className="chat-output chat-output-content">
                {this.props.messages.map(function (message, i) {
                    return (
                        <ChatMessage key={i} message={message}></ChatMessage>
                    );
                })}
            </div>
        )
    }
}

export default ChatHistory;