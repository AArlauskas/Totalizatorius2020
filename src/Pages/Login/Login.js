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
                placeholder="Prisijungimo vardas"
                onChange={event =>
                  this.setState({ username: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Control
                type="password"
                placeholder="Slaptažodis"
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
              />
            </Form.Group>
            <div className="button">
              <Button
                type="button"
                variant="success"
                disabled={
                  this.state.username === "" || this.state.password === ""
                }
                onClick={this.handleSignIn}
              >
                Prisijungti
              </Button>
            </div>
            <div className="register">
              <Link to="/Register" style={{ color: "white" }}>
                Registracija
              </Link>
            </div>
            <div className="badAttempt">
              {this.state.Wrong ? (
                <p>Blogas prisijungimo vardas arba slaptažodis</p>
              ) : null}
            </div>
          </Form>
        </div>
      </div>
    );
  }
  handleSignIn = async () => {
    let response = await this.fetchLoginData();
    if (response === undefined) {
      this.setState({ Wrong: true });
    } else {
      this.props.changeLoginState(
        response.data.UserId,
        response.data.username,
        response.data.points,
        response.data.IsAdmin
      );

      console.log(response.status);
    }
  };

  fetchLoginData = async () => {
    let result;
    try {
      result = await Axios.get(
        "http://lozikas-001-site1.htempurl.com/api/Users/login",
        {
          params: {
            username: this.state.username,
            password: this.state.password
          }
        }
      );
    } catch {
      return null;
    } finally {
      return result;
    }
  };
}
export default Login;
