import React, { Component } from 'react';
import ChatMessage from "./ChatMessage";


class ChatHistory extends Component {
    state = {}
    render() {
        return (
            <div className="chat-output">
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