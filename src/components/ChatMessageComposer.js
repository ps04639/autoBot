import React, { Component } from 'react';

class ChatMessageComposer extends Component {
    //state = {}

    /*getInitialState = () => {
        return {
            inputValue: ''
        };
    }*/
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }

    onKeyPress = (event) => {
        if (event.key !== 'Enter') { return; }
        console.log('do we get here', this.props.messages, this.state.inputValue)
        this.props.sendMessage({
            message: this.state.inputValue,
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
                <input placeholder="Hello Prashant" className="user-input" type="text" value={this.state.inputValue} onChange={this.handleChange} onKeyPress={this.onKeyPress} />
            </div>
        );
    }
}

export default ChatMessageComposer;