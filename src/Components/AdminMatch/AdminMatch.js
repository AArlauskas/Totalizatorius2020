import React, { Component } from "react";
import { Form, Col, Button } from "react-bootstrap";
import Axios from "axios";

class AdminMatch extends Component {
  state = {
    MatchId: this.props.entry.MatchId,
    Team1Name:
      this.props.entry.Team1Name === null ? "" : this.props.entry.Team1Name,
    Team2Name:
      this.props.entry.Team2Name === null ? "" : this.props.entry.Team2Name,
    Team1Goals:
      this.props.entry.Team1Goals === null ? "" : this.props.entry.Team1Goals,
    Team2Goals:
      this.props.entry.Team2Goals === null ? "" : this.props.entry.Team2Goals,
    Date: this.props.entry.date.split("T")[0],
    Time: this.props.entry.time,
    IsDone: this.props.entry.IsDone,
    Submited: false,
    Deleted: false
  };
  render() {
    return (
      <div>
        {this.state.Deleted ? null : (
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  value={this.state.Team1Name}
                  type="text"
                  onChange={event =>
                    this.setState({ Team1Name: event.target.value })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  value={this.state.Team2Name}
                  type="text"
                  onChange={event =>
                    this.setState({ Team2Name: event.target.value })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  value={this.state.Team1Goals}
                  type="number"
                  onChange={event =>
                    this.setState({ Team1Goals: event.target.value })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  value={this.state.Team2Goals}
                  type="number"
                  onChange={event =>
                    this.setState({ Team2Goals: event.target.value })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  value={this.state.Date}
                  type="date"
                  onChange={event =>
                    this.setState({ Date: event.target.value })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  value={this.state.Time}
                  type="time"
                  onChange={event =>
                    this.setState({ Time: event.target.value })
                  }
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  checked={this.state.IsDone}
                  onChange={event =>
                    this.setState({ IsDone: !this.state.IsDone })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Button
                  style={{ marginLeft: 15, marginRight: 15 }}
                  onClick={this.SubmitChanges}
                  variant={this.state.Submited ? "success" : "danger"}
                >
                  Atnaujinti
                </Button>
              </Form.Group>
              <Form.Group>
                <Button variant="dark" onClick={this.DeleteMatch}>
                  Ištrinti
                </Button>
              </Form.Group>
            </Form.Row>
          </Form>
        )}
      </div>
    );
  }
  SubmitChanges = () => {
    Axios.put("http://lozikas-001-site1.htempurl.com/api/Matches", {
      MatchId: this.state.MatchId,
      Team1Name: this.state.Team1Name,
      Team2Name: this.state.Team2Name,
      Team1Goals: this.state.Team1Goals,
      Team2Goals: this.state.Team2Goals,
      date: this.state.Date,
      time: this.state.Time,
      IsDone: this.state.IsDone
    })
      .then(Response => console.log(Response))
      .then(this.setState({ Submited: true }));
  };

  DeleteMatch = () => {
    Axios.delete("http://lozikas-001-site1.htempurl.com/api/Matches", {
      params: {
        id: this.state.MatchId
      }
    }).then(this.setState({ Deleted: true }));
  };
}

export default AdminMatch;
