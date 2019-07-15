/* eslint-disable */
import React from "react";
import { Redirect } from "react-router-dom";
import $ from "jquery";
import spinner from "../images/logo.svg";
import openChat from "../images/openChat.svg";
import ChatHeader from './ChatHeader';

class Login extends React.Component
{
  el = null;
  el1 = null;

  constructor ( props )
  {
    super( props );
    this.state = {
      username: "",
      email: "",
      returnedUserId: "",
      isAuthenticated: false,
      isSubmitting: false,
      errorMessage: ""
    };
  }

  componentDidMount = () =>
  {
    this.el = document.getElementsByClassName( "login-box-visible" )[ 0 ];
    this.el1 = document.getElementsByClassName( "chat-popup" )[ 0 ];
  };

  onSubmit = e =>
  {
    if ( this.validateUser() && this.validateEmail() )
    {
      e.preventDefault();
      this.login();
    } else
    {
      e.preventDefault();
      this.showErrorMessage( "please enter a valid email id" );
    }
  };

  validateUser = () =>
  {
    return this.state.username !== "" ? true : false;
  };

  validateEmail = () =>
  {
    const email = this.state.email;
    let regexCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexCheck.test( email ) ? true : false;
  };

  showErrorMessage = errorText =>
  {
    this.setState( {
      errorMessage: errorText
    } );
    this.removeErrorMessage();
  };

  removeErrorMessage = () =>
  {
    let timer = setTimeout( () =>
    {
      this.setState( { errorMessage: "" } );
      clearTimeout( timer );
    }, 3000 );
  };

  removeErrorMessageImmediate = () => this.setState( { errorMessage: "" } );

  login = () =>
  {
    this.toggleIsSubmitting();
    this.removeErrorMessageImmediate();

        let url = "http://localhost:3001/user/register";
        let data = {
          nameInput: this.state.username,
          emailIdInput: this.state.email
        }

    const promise1 = new Promise( ( resolve, reject ) =>
    {
      $.post( url, data, function ( data, status, xhr )
      {
        resolve( data );
      } );
    } );

    promise1.then( value =>
    {
      let spinnerTime = setTimeout( () =>
      {
        this.setState( {
          isAuthenticated: true,
          returnedUserId: value[ 0 ].UserId
        } );
        clearTimeout( spinnerTime );
      }, 2000 );
    } );
  };

  toggleIsSubmitting = () =>
  {
    this.setState( prevState => ( {
      isSubmitting: !prevState.isSubmitting
    } ) );
  };

  handleInputChange = e => this.setState( { username: e.target.value } );
  handleInputChangeEmail = e => this.setState( { email: e.target.value } );

  closeChatWindow = () =>
  {
    this.el.style.transform = "scale(0)";
    this.el1.style.transform = "scale(1)";
  };
  openChatWindow = () =>
  {
    this.el.style.transform = "scale(1)";
    this.el1.style.transform = "scale(0)";
  };

  render ()
  {
    if ( this.state.isAuthenticated )
    {
      return (
        <Redirect
          to={ {
            pathname: "/chat",
            state: {
              username: this.state.username,
              userId: this.state.returnedUserId
            }
          } }
        />
      );
    }

    return (
      <div>
        <div className="chat-popup" onClick={ this.openChatWindow }>
          <img src={ openChat } alt="Open chat" />
        </div>

        <div className="App login-box-visible">
          <ChatHeader closeChat={ this.closeChatWindow }  ></ChatHeader>

          <form className="form" onSubmit={ this.onSubmit }>
            <input
              placeholder="Enter Your Name"
              onChange={ this.handleInputChange }
              type="text"
            />
            <input
              placeholder="Enter Your Email"
              onChange={ this.handleInputChangeEmail }
              type="text"
            />
            <span className="error">{ this.state.errorMessage }</span>

            { this.state.isSubmitting ? (
              <img src={ spinner } alt="Spinner component" className="App-logo" />
            ) : (
                <input
                  type="submit"
                  disabled={ this.state.username === "" }
                  value="Submit"
                />
              ) }
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
