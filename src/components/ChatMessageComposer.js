import React, { Component } from 'react';

class ChatMessageComposer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }

    onKeyPress = (event) => {
        if (event.key !== 'Enter' || this.state.inputValue.trim().length <= 0) { return; }
        this.postMessageToScreen();
    }

    postMessageToScreen = () => {

        if (this.state.inputValue.trim().length <= 0) { return; }
        this.props.sendMessage({
            message: this.state.inputValue.trim(),
            from: 'you'
        });
        this.setState({ inputValue: '' });
    }

    handleChange = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    render() {
        return (
            <div className="chat-input">
                <input placeholder="Provide your input here" className="user-input user-input-text" type="text" value={this.state.inputValue} onChange={this.handleChange} onKeyPress={this.onKeyPress} />
                <button className="submit-button" onClick={this.postMessageToScreen}><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 500 500"><g><g><polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75"></polygon></g></g></svg></button>
            </div>
        );
    }
}

export default ChatMessageComposer;