import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";

// the below components will be created shortly
import Login from "./components/Login";
import Chat from "./components/Chat";
import Webcontent from "./components/Webcontent";

class App extends Component {

  render() {
    return (
      <div>
        <Webcontent />
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </div>
    );
  }

}
export default App;
