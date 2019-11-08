import React, { Component } from "react";

import axios from 'axios';
import $ from "jquery";

import ChatHistory from "./ChatHistory";
import ChatMessageComposer from "./ChatMessageComposer";
import ChatHeader from './ChatHeader';

import openChat from "../images/openChat.svg";


class Chat extends Component
{

  el = null;
  el1 = null;

  constructor ( props )
  {
    super( props );
    this.state = {
      messages: [],
      greetings: null,
      chatUserID: null
    };
  }

  componentDidMount = () =>
  {

    this.el = document.getElementsByClassName( 'chat-box-visible' )[ 0 ];
    this.el1 = document.getElementsByClassName( 'chat-popup-hide' )[ 0 ];

    const jsonData = axios.get( "./data/data.json" );
    jsonData.then( res =>
    {
      this.setState( {
        greetings: res.data
      } )
    } ).catch( err =>
    {
      console.log( err );
    } )

    let user_name = this.props.location.state.username;
    this.setState( {
      chatUserID: this.props.location.state.userId
    } )
    this.welcomeGreetings( user_name );
  }


  welcomeGreetings = ( name ) =>
  {
    if ( name !== "" && name !== undefined )
    {
      let greeting = "Hello " + name + ".I’m Cody, the Chatbot!  Welcome to the Coffee World.  How can i assist you ?"
      this.recieveMessage({ message: greeting, sender: 'bot' })

    }
  }


  addMessage = ( message ) =>
  {
    this.setState( ( prevState ) =>
    {
      prevState.messages.push( message );
      return { messages: prevState.messages };
    });
  }


  recieveMessage = ( message ) =>
  {
    this.setState( ( prevState ) =>
    {
      prevState.messages.push( {
        message: message.message,
        from: message.sender,
        video: message.video,
        image: message.image,
        messageId: message.messageId
      });
      return { messages: prevState.messages };
    });
  }

  /****************************************************************************************************/

  sendMessage = ( message ) =>
  {
    this.addMessage( message );

    if ( message.message !== "hi" && message.message !== "Hi" )
    {

      const promise1 = new Promise( ( resolve, reject ) =>
      {
        let userMessage = message.message;
        userMessage = userMessage.replace( /[^a-zA-Z ]/g, "" );
        let questionID = 0, userID = this.state.chatUserID;

        // if(message.questionId !== undefined){ questionID = message.questionId; }
        if (userMessage.length === 0) { userMessage = "abc" }
        $.get("http://localhost:3001/response?inputText=" + userMessage + "&questionId=" + questionID + "&userId=" + userID + "&ipAddress=2342", function (data, status, xhr) {
          resolve(data);
        });
      });

      promise1.then( ( value ) =>
      {
        let resp = value;
        console.info( "Receied mesages--->   ", resp );
        if ( resp.length > 1 )
        {
          this.addMessageToList( resp );
        } else
        {
          if ( resp[ 0 ].ResponseText )
          {
            let msgTimer = setTimeout( () =>
            {
              this.recieveMessage( this.checkVidImgTxt( resp[ 0 ] ) );
              this.scrollToBottom();
              clearTimeout( msgTimer )
            }, 500 )

          } else
          {
            this.addMessageToList( resp );
          }
        }
      } );

    } else
    {
      this.recieveMessage( { message: "Hello " + this.props.location.state.username, sender: 'bot' } )
    }

  }


  checkVidImgTxt = ( param ) =>
  {
    switch ( param.ResponseType )
    {
      case "V":
        return { video: param.ResponseText, sender: 'bot' }
      case "I":
        return { image: param.ResponseText, sender: 'bot' }
      default:
        return { message: param.ResponseText, sender: 'bot' }
    }
  }


  addMessageToList = ( resp ) =>
  {

    let randomUnmatchedWordsArray = this.state.greetings.automated_messages.partialMatched;
    if ( resp[ 0 ].IsMaster )
    {
      randomUnmatchedWordsArray = this.state.greetings.automated_messages.unmatched_words;
    }

    const randomUnmatchMsg = randomUnmatchedWordsArray[ Math.floor( Math.random() * randomUnmatchedWordsArray.length ) ];

    let greetTimer = setTimeout( () =>
    {
      this.recieveMessage( { message: randomUnmatchMsg, sender: 'bot' } );
      clearTimeout( greetTimer )
    }, 800 )
    let rectimer = setTimeout( () =>
    {
      resp.forEach( ( rcvdmsg ) =>
      {
        this.recieveMessage( { message: rcvdmsg.QuestionText, sender: 'bot-auto', messageId: rcvdmsg.QuestionId } )
      } )
      this.scrollToBottom();
      clearTimeout( rectimer )
    }, 1500 );
  }

  /***************************************************************************************************/


  closeChatWindow = () =>
  {
    this.el.style.transform = "scale(0)";
    this.el1.style.transform = "scale(1)";
  }
  openChatWindow = () =>
  {
    this.el.style.transform = "scale(1)";
    this.el1.style.transform = "scale(0)";
  }

  scrollToBottom = () =>
  {
    $( '.chat-output' ).animate( { scrollTop: $( '#chat-scroll' )[ 0 ].scrollHeight }, 2000 );
  };

  render ()
  {
    return (
      <div>
        <div className="chat-popup-hide" onClick={ this.openChatWindow }> <img src={ openChat } alt="Open chat" /></div>

        <div className="chat-box-visible">

          <ChatHeader closeChat={ this.closeChatWindow }  ></ChatHeader>
          <ChatHistory sendMessage={ this.sendMessage } messages={ this.state.messages }></ChatHistory>
          <ChatMessageComposer sendMessage={ this.sendMessage }></ChatMessageComposer>

        </div>
      </div>
    );
  }
}

export default Chat;