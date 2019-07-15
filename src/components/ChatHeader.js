import React from 'react';
import close from '../images/close.svg';

const ChatHeader = ( props ) =>
{
    return (
        <div className="chat-header">
            <h2 className="chat-header-h2">Auto Bot(ATA)</h2>
            <span className="chat-header-close-button" onClick={ props.closeChat }><img src={ close } alt="Close" /></span>
        </div>
    );
}

export default ChatHeader; 