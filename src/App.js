import React, { Component } from "react";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from "./Components/NavBar/Navbar";
import Rules from "./Pages/Rules/Rules";
import Guesses from "./Pages/Guessess/Guesses";
import NotFound from "./Pages/NotFound/NotFound";
import Register from "./Pages/Register/Register";
import Admin from "./Pages/Home/Admin/Admin";
import Results from "./Pages/Results/Results";
import Axios from "axios";
import Credentials from "./Pages/ChangeCredentials/Credentials";

class App extends Component {
  state = {
    isLoggedIn: false,
    userId: null,
    username: null,
    points: null,
    isAdmin: false,
    RouteUsernames: null
  };
  render() {
    return (
      <div>
        <div className="Navbar">
          {this.state.isLoggedIn ? (
            <Navbar
              changeLoginState={this.LogoutMark}
              username={this.state.username}
              isAdmin={this.state.isAdmin}
            />
          ) : null}
        </div>
        <div>
          <Router>
            <Switch>
              {this.state.isLoggedIn ? (
                <Redirect exact path="/" push to="/home" />
              ) : null}
              <Route path="/register" exact component={Register} />
              <Route
                path="/"
                exact={this.state.isLoggedIn}
                component={() => <Login changeLoginState={this.LoginMark} />}
              />
              {this.state.isLoggedIn ? (
                <Route
                  path="/home"
                  exact
                  component={() => <Home userId={this.state.userId} />}
                />
              ) : null}
              {this.state.isLoggedIn ? (
                <Route path="/rules" exact component={Rules} />
              ) : null}
              {this.state.isLoggedIn && this.state.RouteUsernames !== null
                ? this.state.RouteUsernames.map(username => (
                    <Route
                      key={username}
                      path={`/guesess/${username}`}
                      exact
                      component={() => (
                        <Guesses
                          UserId={this.state.userId}
                          Username={this.state.username}
                        />
                      )}
                    />
                  ))
                : null}
              {this.state.isLoggedIn ? (
                <Route
                  path="/credentials"
                  exact
                  component={() => (
                    <Credentials
                      changeLoginState={this.LogoutMark}
                      Username={this.state.username}
                      UserId={this.state.userId}
                    />
                  )}
                />
              ) : null}
              {this.state.isLoggedIn ? (
                <Route
                  path="/results"
                  exact
                  component={() => <Results username={this.state.username} />}
                />
              ) : null}
              {this.state.isLoggedIn && this.state.isAdmin ? (
                <Route path="/admin" exact component={Admin} />
              ) : null}

              {this.state.isLoggedIn && this.state.RouteUsernames !== null ? (
                <Route component={NotFound} />
              ) : null}
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
  LoginMark = (userId, username, points, isAdmin) => {
    this.setState({ isLoggedIn: true, userId, username, points, isAdmin });
  };

  LogoutMark = () => {
    this.setState({
      isLoggedIn: false,
      userId: null,
      username: null,
      points: null,
      isAdmin: false
    });
  };

  componentDidUpdate() {
    localStorage.setItem("isLoggedIn", JSON.stringify(this.state.isLoggedIn));
    localStorage.setItem("userId", JSON.stringify(this.state.userId));
    localStorage.setItem("username", JSON.stringify(this.state.username));
    localStorage.setItem("points", JSON.stringify(this.state.points));
    localStorage.setItem("isAdmin", JSON.stringify(this.state.isAdmin));
  }

  UNSAFE_componentWillMount() {
    this.setState({
      isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")),
      userId: JSON.parse(localStorage.getItem("userId")),
      username: JSON.parse(localStorage.getItem("username")),
      points: JSON.parse(localStorage.getItem("points")),
      isAdmin: JSON.parse(localStorage.getItem("isAdmin"))
    });
  }

  componentDidMount() {
    Axios.get(
      "http://lozikas-001-site1.htempurl.com/api/Users/usernames"
    ).then(Response => this.setState({ RouteUsernames: Response.data }));
  }
}

export default App;
