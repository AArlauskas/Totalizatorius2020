import React, { Component } from "react";
import { InputGroup, FormControl, Button, Collapse } from "react-bootstrap/";
import { IoIosDoneAll } from "react-icons/io";

import "./styles.css";
import Axios from "axios";
import { Link } from "react-router-dom";

class Match extends Component {
  state = {
    UserId: this.props.UserId,
    URLid: this.props.URLid,
    MatchId: this.props.data.MatchId,
    GuessId: null,
    Team1Name: this.props.data.Team1Name,
    Team2Name: this.props.data.Team2Name,
    Date: this.props.data.date,
    Time: this.props.data.time,
    IsDone: this.props.data.IsDone,
    Team1Score: this.props.data.Team1Goals,
    Team2Score: this.props.data.Team2Goals,
    Team1Input: "",
    Team2Input: "",
    Points: null,
    DidFetch: false,
    DidGetResults: false
  };
  render() {
    return (
      <div className="Match">
        <div className="Teams">
          <div className="Team1">
            <InputGroup className="mb-2" size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text
                  style={{
                    minWidth: 100,
                    backgroundColor: this.GuessBackgroundColor(),
                    justifyContent: "flex-end"
                  }}
                >
                  {this.state.Team1Name}
                </InputGroup.Text>
              </InputGroup.Prepend>
              <div className="scoreInput">
                <FormControl
                  aria-label="Guess1"
                  maxLength={1}
                  value={
                    this.state.Team1Input === -1 ||
                    (!this.state.IsDone &&
                      this.state.UserId !== this.state.URLid)
                      ? ""
                      : this.state.Team1Input
                  }
                  disabled={
                    this.state.IsDone || this.state.URLid !== this.state.UserId
                  }
                  onChange={event =>
                    this.setState({ Team1Input: event.target.value })
                  }
                  //style={this.GuessBackgroundColor()}
                />
              </div>
            </InputGroup>
          </div>
          <div className="separator">
            <p>:</p>
          </div>
          <div className="Team2">
            <InputGroup className="mb-2" size="sm">
              <div className="scoreInput">
                <FormControl
                  aria-label="Guess2"
                  maxLength={1}
                  value={
                    this.state.Team2Input === -1 ||
                    (!this.state.IsDone &&
                      this.state.UserId !== this.state.URLid)
                      ? ""
                      : this.state.Team2Input
                  }
                  disabled={
                    this.state.IsDone || this.state.URLid !== this.state.UserId
                  }
                  onChange={event =>
                    this.setState({ Team2Input: event.target.value })
                  }
                  //style={this.GuessBackgroundColor()}
                />
              </div>
              <InputGroup.Append>
                <InputGroup.Text
                  style={{
                    minWidth: 100,
                    backgroundColor: this.GuessBackgroundColor()
                  }}
                >
                  <div>{this.state.Team2Name}</div>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </div>
        <div className="aditionalInfo">
          <Collapse
            in={
              this.state.Team1Input.length === 1 &&
              !this.state.IsDone &&
              this.state.Team2Input.length === 1 &&
              isFinite(String(this.state.Team1Input)) &&
              isFinite(String(this.state.Team2Input))
            }
          >
            <Button variant="success" size="sm" onClick={this.SubmitGuess}>
              Paskelbti
            </Button>
          </Collapse>
          {this.state.DidGetResults ? (
            <div>
              <h3>
                <IoIosDoneAll />
              </h3>
            </div>
          ) : null}
          <div className="details">
            <p>
              Data: <strong>{this.state.Date.split("T")[0]}</strong>
            </p>
            <p>
              Laikas: <strong>{this.state.Time.substring(0, 5)}</strong>
            </p>
            {this.state.IsDone ? (
              <div className="afterMatch">
                <p>
                  rezultatas:{" "}
                  <strong>
                    {this.state.Team1Score} : {this.state.Team2Score}
                  </strong>
                </p>
                <p>
                  taškai: <strong>{this.state.Points}</strong>
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
  SubmitGuess = async () => {
    if (this.state.DidFetch) {
      Axios.put("http://lozikas-001-site1.htempurl.com/api/Guesses", {
        id: this.state.GuessId,
        Team1Score: this.state.Team1Input,
        Team2Score: this.state.Team2Input
      }).then(Response =>
        Response === null ? null : this.setState({ DidGetResults: true })
      );
    } else {
      let payload = {
        Team1Score: this.state.Team1Input,
        Team2Score: this.state.Team2Input,
        Guesser: this.state.UserId,
        Match: this.state.MatchId
      };

      Axios.post(
        "http://lozikas-001-site1.htempurl.com/api/Guesses",
        payload
      ).then(Response =>
        Response === null ? null : this.setState({ DidGetResults: true })
      );
    }
  };

  componentDidMount() {
    Axios.get("http://lozikas-001-site1.htempurl.com/api/Guesses/getGuess", {
      params: {
        userId: this.state.URLid,
        matchId: this.state.MatchId
      }
    })
      .then(Response => {
        this.setState({
          Team1Input: Response.data.Team1Score,
          Team2Input: Response.data.Team2Score,
          GuessId: Response.data.GuessId,
          Points: Response.data.Points,
          DidFetch: true
        });
      })
      .catch(error => {});
  }

  GuessBackgroundColor = () => {
    if (this.state.Team1Input === -1 && this.state.Team2Input === -1)
      return "#ff4d4d";
    else if (this.state.Points === -3 || this.state.Points === -7)
      return "#65d45f";
    else if (
      (this.state.Points !== -3 || this.state.Points !== -7) &&
      this.state.Points !== null
    )
      return "#ffff66";
    return "white";
  };
}

export default Match;
