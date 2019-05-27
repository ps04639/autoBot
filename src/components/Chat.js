import React, { Component } from "react";

import ChatHistory from "./ChatHistory";
import ChatMessageComposer from "./ChatMessageComposer";

class Chat extends Component {


  constructor(props) {
    super(props);
    this.state = {
      status: 'Not paired',
      messages: []
    };
  }
  /*
    getInitialState = () => {
      return {
        status: 'Not paired',
        messages: []
      };
    }*/


  addMessage = (message) => {
    this.setState(function (prevState) {
      prevState.messages.push(message);
      return { messages: prevState.messages };
    });
  }

  recieveMessage = (message) => {
    this.setState(function (prevState) {
      prevState.messages.push({
        message: message.message,
        from: 'bot'
      });
      return { messages: prevState.messages };
    });
  }

  sendMessage = (message) => {
    console.log('Send Message --> ', message)
    // socket.emit('create:message', message.message);
    this.addMessage(message)
  }

  render() {
    return (
      <div>
        <ChatHistory messages={this.state.messages}></ChatHistory>
        <ChatMessageComposer sendMessage={this.sendMessage}></ChatMessageComposer>
      </div>
    );
  }



}

export default Chat;