import React, { Component } from "react";
import "./styles.css";
import { Form, Col, Button } from "react-bootstrap";
import Axios from "axios";
import { IoIosDoneAll } from "react-icons/io";
import AdminMatch from "../../../Components/AdminMatch/AdminMatch";

class Admin extends Component {
  currentDate = new Date();
  state = {
    Team1name: "Airija",
    Team2name: "Airija",
    date: null,
    time: null,
    DidAdd: false,
    Matches: null
  };
  teams = new Array(
    "Airija",
    "Anglija",
    "Austrija",
    "Baltarusija",
    "Belgija",
    "Bosnija ir Hercegovina",
    "Bulgarija",
    "Danija",
    "Gruzija",
    "Islandija",
    "Ispanija",
    "Italija",
    "Izraelis",
    "Kosovas",
    "Kroatija",
    "Lenkija",
    "Makedonija",
    "Norvegija",
    "Nyderlandai",
    "Portugalija",
    "Prancūzija",
    "Rumunija",
    "Rusija",
    "Serbija",
    "Slovakija",
    "Suomija",
    "Turkija",
    "Ukraina",
    "Velsas",
    "Vengrija",
    "Vokietija",
    "Čekija",
    "Šiaurės Airija",
    "Škotija",
    "Švedija",
    "Šveicarija"
  );
  render() {
    return (
      <div className="content">
        <div className="FormAddMatch">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>1 komanda</Form.Label>
                <Form.Control
                  as="select"
                  onChange={event => {
                    this.setState({ Team1name: event.target.value });
                  }}
                >
                  {this.teams.map(item => (
                    <option key={item}>{item}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>2 komanda</Form.Label>
                <Form.Control
                  as="select"
                  onChange={event => {
                    this.setState({ Team2name: event.target.value });
                  }}
                >
                  {this.teams.map(item => (
                    <option key={item}>{item}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Data</Form.Label>
                <Form.Control
                  type="date"
                  onChange={event =>
                    this.setState({ date: event.target.value })
                  }
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Laikas </Form.Label>
                <Form.Control
                  type="time"
                  onChange={event =>
                    this.setState({ time: event.target.value })
                  }
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="justify-content-md-center">
              <Button
                disabled={
                  this.state.date === null ||
                  this.state.time === null ||
                  this.state.Team1name === null ||
                  this.state.Team2name === null
                }
                onClick={this.AddNewGame}
              >
                Prideti
              </Button>
            </Form.Row>
            {this.state.DidAdd ? (
              <h3>
                <IoIosDoneAll />
              </h3>
            ) : null}
          </Form>
        </div>
        <hr />
        <div className="EditMatches">
          {this.state.Matches === null
            ? null
            : this.state.Matches.map(entry => (
                <AdminMatch key={entry.MatchId} entry={entry} />
              ))}
        </div>
      </div>
    );
  }
  AddNewGame = () => {
    Axios.post("http://lozikas-001-site1.htempurl.com/api/Matches", {
      Team1name: this.state.Team1name,
      Team2name: this.state.Team2name,
      Date: this.state.date,
      time: this.state.time
    }).then(this.setState({ DidAdd: true }));
  };

  componentDidMount() {
    Axios.get(
      "http://lozikas-001-site1.htempurl.com/api/Matches"
    ).then(Response => this.setState({ Matches: Response.data }));
  }
}

export default Admin;
