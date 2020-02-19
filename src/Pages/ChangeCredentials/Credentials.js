import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles.css";
import Axios from "axios";
class Credentials extends Component {
  state = {
    Username: this.props.Username,
    UserId: this.props.UserId,
    NewUsername: "",
    NewPassword: "",
    RepeatPassword: ""
  };
  render() {
    return (
      <div>
        <div className="tabsCredentials">
          <Tabs
            className="tabs"
            defaultActiveKey="username"
            id="uncontrolled-tab-example"
          >
            <Tab eventKey="username" title="Prisijungimo vardo keitimas">
              <div className="form">
                <Form>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder={this.state.Username}
                      onChange={event =>
                        this.setState({ NewUsername: event.target.value })
                      }
                    />
                  </Form.Group>
                  <div className="button">
                    <Button
                      type="button"
                      variant="success"
                      disabled={this.state.NewUsername === ""}
                      onClick={this.changeUsername}
                    >
                      Keisti prisijungimo vardą
                    </Button>
                  </div>
                </Form>
              </div>
            </Tab>
            <Tab eventKey="password" title="Slaptažodžio keitimas">
              <div className="form">
                <Form>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      placeholder="Naujas slaptažodis"
                      onChange={event =>
                        this.setState({ NewPassword: event.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      type="password"
                      placeholder="Pakartoti slaptažodį"
                      onChange={event =>
                        this.setState({ RepeatPassword: event.target.value })
                      }
                    />
                  </Form.Group>
                  <div className="button">
                    <Button
                      type="button"
                      variant="success"
                      disabled={
                        this.state.NewPassword.length < 5 ||
                        this.state.NewPassword !== this.state.RepeatPassword
                      }
                      onClick={this.changePassword}
                    >
                      Keisti slaptažodį
                    </Button>
                  </div>
                </Form>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
  changeUsername = () => {
    Axios.put(
      "http://lozikas-001-site1.htempurl.com/api/users/changeusername",
      {
        userId: this.state.UserId,
        username: this.state.NewUsername
      }
    ).then(Response => {
      Response.status === 200
        ? this.props.changeLoginState()
        : console.log(Response);
    });
  };

  changePassword = () => {
    Axios.put(
      "http://lozikas-001-site1.htempurl.com/api/users/changepassword",
      {
        userId: this.state.UserId,
        password: this.state.NewPassword
      }
    ).then(Response =>
      Response.status === 200
        ? this.props.changeLoginState()
        : console.log(Response)
    );
  };
}

export default Credentials;
