import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";

// the below components will be created shortly
import Login from "./components/Login";
import Chat from "./components/Chat";

class App extends Component {

  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/chat" component={Chat} />
      </Switch>
    );
  }

}
export default App;
