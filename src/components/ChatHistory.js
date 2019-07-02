import React, { Component } from 'react';

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
    questionClick = (param) => {
        this.props.sendMessage({
            message: param.message,
            questionId: param.messageId,
            from: 'you'
        });
    }

    render() {
        return (
            <div className="chat-output chat-output-content">
                <div className="chat-output-inner">
                    {this.props.messages.map((message, i) => {
                        //console.log("************", message);
                        return (
                            <div key={i} className={this.generateClasses(message)}>
                                {
                                    message.from === 'bot-auto'
                                        ? <div className="message" onClick={this.questionClick.bind(null, message)} >{message.message}</div>
                                        : (message.video !== undefined)
                                            ?
                                            <video controls >
                                                <source src={message.video} type="video/mp4"></source>
                                            </video>
                                            : (message.image !== undefined)
                                                ?
                                                <img src={message.image} alt="Coffee"></img>
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