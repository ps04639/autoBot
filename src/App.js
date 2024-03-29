import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import Chat from "./components/Chat";
import Webcontent from "./components/Webcontent";

class App extends Component {

  render() {
    return (
      <React.Fragment>
        <Webcontent />
        <Login></Login>
        <Switch>
         {/* <Redirect exact from="/" to="/login" />*/}
          <Route path="/chat" component={Chat} />
        </Switch>
      </React.Fragment>
    );
  }

}
export default App;
