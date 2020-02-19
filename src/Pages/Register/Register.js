import React, { Component } from "react";
import logo from "../../Logos/loginLogo.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Redirect } from "react-router-dom";
import "./styles.css";
import Axios from "axios";

class Register extends Component {
  state = {
    username: "",
    name: "",
    surname: "",
    password: "",
    RepeatedPassword: "",
    DoesMatch: true,
    DidRegister: false,
    AlreadyExists: false
  };
  render() {
    return (
      <div>
        <div className="image">
          <img src={logo} alt="Euro2020 logo" />
        </div>
        <div className="form">
          <Form>
            <Form.Group controlId="formGroupUsername">
              <Form.Control
                type="text"
                placeholder="Prisijungimo vardas"
                onChange={event =>
                  this.setState({ username: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formGroupName">
              <Form.Control
                type="text"
                placeholder="Vardas"
                onChange={event => this.setState({ name: event.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formGroupSurname">
              <Form.Control
                type="text"
                placeholder="Pavardė"
                onChange={event =>
                  this.setState({ surname: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword1">
              <Form.Control
                type="password"
                placeholder="Slaptažodis"
                onChange={event =>
                  this.setState({ password: event.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword2">
              <Form.Control
                type="password"
                placeholder="Pakartoti slaptažodį"
                onChange={event =>
                  this.setState({
                    RepeatedPassword: event.target.value,
                    DoesMatch: true
                  })
                }
              />
            </Form.Group>
            <div className="button">
              <Button
                type="button"
                disabled={
                  this.state.username.length < 5 ||
                  this.state.password.length < 5 ||
                  this.state.RepeatedPassword.length < 5 ||
                  this.state.name === "" ||
                  this.state.surname === "" ||
                  this.state.username.includes(" ") ||
                  this.state.username.includes("/") ||
                  this.state.username.includes("?")
                }
                onClick={this.handleRegister}
              >
                Registruotis
              </Button>
            </div>
            <div className="badAttempt">
              {this.state.DoesMatch ? null : <p>Nesutampa Slaptažodžiai!</p>}
              {this.state.AlreadyExists ? (
                <p>Vartotojas tokiu vardu jau egzistuoja!</p>
              ) : null}
            </div>
            <div className="goodAttempt">
              {this.state.DidRegister ? <p>Sėkmingai užsiregistruota</p> : null}
              {this.state.DidRegister ? <Redirect to="/" /> : null}
            </div>
          </Form>
        </div>
      </div>
    );
  }
  handleRegister = () => {
    if (!this.DoesPasswordsMatch()) {
      return;
    }
    this.getConfirmation().then(status => {
      if (status === 201) {
        this.setState({ DidRegister: true });
      } else if (status === 409) {
        this.setState({ AlreadyExists: true });
      } else console.log(status);
    });
  };

  getConfirmation = async () => {
    let data = await Axios.post(
      "http://lozikas-001-site1.htempurl.com/api/Users",
      {
        username: this.state.username,
        password: this.state.password,
        name: this.state.name,
        surname: this.state.surname
      }
    );
    return data.status;
  };

  DoesPasswordsMatch = () => {
    if (this.state.password !== this.state.RepeatedPassword) {
      this.setState({ DoesMatch: false });
      return false;
    }
    return true;
  };
}

export default Register;
