import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

import LoginPage from "./Components/LoginPage";
import UserPage from "./Components/UserPage";

import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/user" />
            <Route
              exact
              path="/login"
              render={(routeProps) => <LoginPage {...routeProps} />}
            />
            <Route
              exact
              path="/user"
              render={(routeProps) => <UserPage {...routeProps} />}
            />
            <Route
              exact
              path="/:id"
              render={() => (
                <h3>
                  This Page does not exist!...{" "}
                  <Link to="/">Click to go Home !</Link>{" "}
                </h3>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
