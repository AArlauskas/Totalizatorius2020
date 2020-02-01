import React, { Component } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

class Results extends Component {
  state = {
    username: this.props.username,
    Users: null,
    Matches: null,
    Guesses: null
  };
  render() {
    return (
      <div>
        {this.state.Guesses === null ||
        this.state.Matches === null ||
        this.state.Users === null ? (
          <Loading />
        ) : (
          <div className="table">
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th style={{ verticalAlign: "middle" }}>#</th>
                  <th style={{ verticalAlign: "middle" }}>Vardas</th>
                  <th style={{ verticalAlign: "middle" }}>taškai</th>
                  {this.state.Matches.map(item => (
                    <th
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        minWidth: 220
                      }}
                      key={item.MatchId}
                    >
                      {item.Team1Name} : {item.Team2Name}
                      {item.Team1Goals !== null && item.Team2Goals !== null ? (
                        <div>
                          <hr style={{ marginTop: 0, marginBottom: 0 }} />
                          {item.Team1Goals} : {item.Team2Goals}
                        </div>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.Users.map(user => (
                  <tr key={user.UserId}>
                    <td style={{ verticalAlign: "middle" }}>
                      {this.state.Users.indexOf(user) + 1}
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <Link to={`/guesess/${user.username}`}>
                        {user.username}
                      </Link>
                    </td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      {user.points}
                    </td>
                    {this.state.Matches.map(match => (
                      <td key={user.UserId + match.MatchId}>
                        {this.getGuess(user.UserId, match.MatchId)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    );
  }

  getGuess = (UserId, MatchId) => {
    for (var item in this.state.Guesses) {
      if (
        this.state.Guesses[item].Match === MatchId &&
        this.state.Guesses[item].Guesser === UserId &&
        this.state.Matches.find(match => match.MatchId === MatchId).IsDone
      ) {
        return (
          <div style={{ textAlign: "center" }}>
            {this.state.Guesses[item].Team1Score === -1 ? null : (
              <div>
                {this.state.Guesses[item].Team1Score} :{" "}
                {this.state.Guesses[item].Team2Score}
                <hr style={{ marginTop: 0, marginBottom: 0 }} />
              </div>
            )}

            {this.state.Guesses[item].Points === null ? null : (
              <div style={{ paddingBottom: 0, verticalAlign: "center" }}>
                {this.state.Guesses[item].Points}
              </div>
            )}
          </div>
        );
      }
    }
    return null;
  };

  componentDidMount() {
    Axios.get("http://lozikas-001-site1.htempurl.com/api/Users/")
      .then(Response => this.setState({ Users: Response.data }))
      .then(
        Axios.get("http://lozikas-001-site1.htempurl.com/api/Matches/")
          .then(Response => this.setState({ Matches: Response.data }))
          .then(
            Axios.get(
              "http://lozikas-001-site1.htempurl.com/api/Guesses"
            ).then(Response => this.setState({ Guesses: Response.data }))
          )
      );
  }
}

export default Results;
