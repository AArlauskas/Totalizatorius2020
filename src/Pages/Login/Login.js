import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import logo from "../../Logos/loginLogo.png";
import "./styles.css";
import { Redirect, Link } from "react-router-dom";
import Axios from "axios";
class Login extends Component {
  state = {
    username: "",
    password: "",
    redirect: false,
    Wrong: false
  };
  render() {
    return (
      <div>
        {this.state.redirect ? <Redirect to="/home" /> : null}
        <div className="image">
          <img src={logo} alt="Euro2020 logo" />
        </div>
        <div className="form">
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={event =>
                  this.setState({ username: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
              />
            </Form.Group>
            <div className="button">
              <Button
                type="button"
                disabled={
                  this.state.username === "" || this.state.password === ""
                }
                onClick={this.handleSignIn}
              >
                Sign in
              </Button>
            </div>
            <div className="register">
              <Link to="/Register">Register</Link>
            </div>
            <div className="badAttempt">
              {this.state.Wrong ? <p>Wrong username or password</p> : null}
            </div>
          </Form>
        </div>
      </div>
    );
  }
  handleSignIn = () => {
    Axios.get("http://lozikas-001-site1.htempurl.com/api/Users/login", {
      params: { username: this.state.username, password: this.state.password }
    }).then(
      response =>
        this.props.changeLoginState(
          response.data.UserId,
          response.data.username,
          response.data.points,
          response.data.IsAdmin
        ),
      this.setState({ Wrong: true })
    );
  };
}
export default Login;
