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
    imageClick = () => {
        let modal = document.getElementsByClassName('modal')[0];
        modal.style.display = "block";
    }

    closePopUp = () => {
        let modal = document.getElementsByClassName('modal')[0];
        modal.style.display = "none";
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
                                        ? <div className="message" onClick={this.questionClick.bind(null, message)} >{message.message}</div>
                                        : (message.video !== undefined)
                                            ?
                                            <video controls >
                                                <source src={message.video} type="video/mp4"></source>
                                            </video>
                                            : (message.image !== undefined)
                                                ?
                                                <div><img className="respImg" src={message.image} alt="Coffee" onClick={this.imageClick}></img>
                                                    <div className="modal">
                                                        <span className="close" onClick={this.closePopUp}>&times;</span>
                                                        <img src={message.image} className="modal-content" alt="Coffee"></img>
                                                    </div></div>
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