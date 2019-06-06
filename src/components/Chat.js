import React, { Component } from "react";
import axios from 'axios';
import $ from "jquery";
import ChatHistory from "./ChatHistory";
import ChatMessageComposer from "./ChatMessageComposer";
//import ChatHeader from "./ChatHeader";

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      greetings: null
    };
  }

  componentDidMount = () => {
    const jsonData = axios.get("./data/data.json");
    jsonData.then(res => {
      this.setState({
        greetings: res.data.automated_messages
      })
    }).catch(err => {
      console.log(err);
    })

    let user_name = this.props.location.state.username;
    this.welcomeGreetings(user_name);
  }

  welcomeGreetings = (name) => {
    if (name !== "" && name !== undefined) {
      let greeting = "Hello " + name + ".I’m Cody, the Chatbot!  Welcome to the Coffee World.  How can i assist you ?"
      this.recieveMessage({ message: greeting, sender: 'bot' })
    }
  }

  addMessage = (message) => {
    this.setState((prevState) => {
      prevState.messages.push(message);
      return { messages: prevState.messages };
    });
  }

  recieveMessage = (message) => {
    this.setState((prevState) => {
      prevState.messages.push({
        message: message.message,
        from: message.sender
      });
      return { messages: prevState.messages };
    });
  }


  /****************************************************************************************************/

  sendMessage = (message) => {
    console.log('Send Message --> ', message)
    this.addMessage(message);

    if (message.message !== "hi" && message.message !== "Hi") {

      const promise1 = new Promise((resolve, reject) => {
        let userMessage = message.message;
        userMessage = userMessage.replace(/[^a-zA-Z ]/g, "");
        $.get("http://localhost:3001/response/" + userMessage + "/0/1", function (data, status, xhr) {
          resolve(data);
        });
      });

      promise1.then((value) => {
        let resp = value[0];
        console.info("Receied mesages--->   ", resp);
        if (resp.length > 1) {
          this.addMessageToList(resp);
        } else {
          if (resp[0].ResponseText) {
            this.recieveMessage({ message: resp[0].ResponseText, sender: 'bot' });
          } else {
            this.addMessageToList(resp);
          }
        }
      });

    } else {
      this.recieveMessage({ message: "Hello " + this.props.location.state.username, sender: 'bot' })
    }

    this.scrollToBottom();
  }

  addMessageToList = (resp) => {
    const randomGreetArray = this.state.greetings.unmatched_words;
    const randomGreetMsg = randomGreetArray[Math.floor(Math.random() * randomGreetArray.length)];

    let greetTimer = setTimeout(() => {
      this.recieveMessage({ message: randomGreetMsg, sender: 'bot' })
      //this.recieveMessage({ message: "Have a look on below suggestions :", sender: 'bot' })
      clearTimeout(greetTimer)
    }, 800)
    let rectimer = setTimeout(() => {
      resp.forEach((rcvdmsg) => {
        this.recieveMessage({ message: rcvdmsg.QuestionText, sender: 'bot-auto' })
      })
      clearTimeout(rectimer)
    }, 2000);

  }

  /****************************************************************************************************/


  closeChatWindow = () => {
    let el = document.getElementsByClassName('chat-box-visible')[0];
    el.style.transform = "scale(0)";
    let el1 = document.getElementsByClassName('chat-popup-hide')[0];
    el1.style.transform = "scale(1)";
  }
  openChatWindow = () => {
    let el = document.getElementsByClassName('chat-box-visible')[0];
    el.style.transform = "scale(1)";
    let el1 = document.getElementsByClassName('chat-popup-hide')[0];
    el1.style.transform = "scale(0)";
  }

  scrollToBottom = () => {
    const chat = document.getElementsByClassName("chat-output");
    chat.scrollTop = chat.scrollHeight;
  };



  render() {
    return (
      <div>
        <a className="chat-popup-hide" onClick={this.openChatWindow}><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></a>

        <div className="chat-box-visible">
          <div className="chat-header">
            <h2 className="chat-header-h2">Auto Bot(ATA)</h2>
            <a className="chat-header-close-button" onClick={this.closeChatWindow}><svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></a>
          </div>
          <ChatHistory sendMessage={this.sendMessage} messages={this.state.messages}></ChatHistory>
          <ChatMessageComposer sendMessage={this.sendMessage}></ChatMessageComposer>
        </div>
      </div>
    );
  }
}

export default Chat;