import React, { Component } from 'react';

class ChatMessage extends Component {

    generateClasses = () => {
        if (this.props.message.from === 'bot') {
            return 'bot-message';
        } else {
            return 'user-message';
        }
    }

    render() {
        return (
            <div className={this.generateClasses()}>
                <div className="message">{this.props.message.message}</div>
            </div>
        );
    }
}

export default ChatMessage;