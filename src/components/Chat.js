import React, { Component } from "react";

import ChatHistory from "./ChatHistory";
import ChatMessageComposer from "./ChatMessageComposer";
import ChatHeader from "./ChatHeader";

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
  }

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
    this.addMessage(message)
  }

  closeChatWindow() {
    console.log("from chat.js")
  }

  render() {
    return (
      <div className="chat-box-visible">
        <ChatHeader onclick="closeChatWindow()"></ChatHeader>
        <ChatHistory messages={this.state.messages}></ChatHistory>
        <ChatMessageComposer sendMessage={this.sendMessage}></ChatMessageComposer>
      </div>
    );
  }

}

export default Chat;