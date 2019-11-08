import React, { Component } from 'react';
import VideoComponent from './VideoComp.js';
import ImageComponent from './ImageComp.js'

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
                <div id="chat-scroll" className="chat-output-inner">
                    {this.props.messages.map((message, i) => {
                        return (
                            <div key={i} className={this.generateClasses(message)}>
                                {
                                    message.from === 'bot-auto'
                                        ? <div className="message" onClick={this.questionClick.bind(null, message)} >{message.message}</div>
                                        : (message.video !== undefined)
                                            ? <VideoComponent videoPath = {message.video} ></VideoComponent>
                                            : (message.image !== undefined)
                                                ? <ImageComponent imagePath = {message.image}></ImageComponent>
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