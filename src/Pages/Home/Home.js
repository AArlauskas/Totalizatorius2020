import React, { Component } from "react";
import "../Home/styles.css";
import Axios from "axios";
import { Tab, Tabs } from "react-bootstrap";
import Loading from "../../Components/Loading/Loading";
import Piechart from "../../Components/PieChart/Piechart";

class Home extends Component {
  state = {
    UserId: this.props.userId,
    Username: null,
    Name: null,
    Surname: null,
    TotalGuesses: null,
    SuccessfullGuesses: null,
    FailedGuesses: null,
    MissedGuesses: null,
    RatedGuesses: null,
    Rank: null,
    Points: null
  };
  render() {
    return (
      <div className="home">
        {this.state.Username === null ? (
          <Loading />
        ) : (
          <div>
            <h1>
              <i>
                {this.state.Name} {this.state.Surname}
              </i>
            </h1>
            <h5>
              <i>Vieta: {this.state.Rank}</i>
            </h5>
            <h5>
              <i>Taškai: {this.state.Points}</i>
            </h5>
            <Tabs
              className="tabs"
              defaultActiveKey="personal"
              id="uncontrolled-tab-example"
            >
              <Tab
                style={{ Color: "white" }}
                eventKey="personal"
                title="Asmeninė statistika"
                variant="dark"
              >
                <Piechart
                  SuccessfullGuesses={this.state.SuccessfullGuesses}
                  MissedGuesses={this.state.MissedGuesses}
                  FailedGuesses={this.state.MissedGuesses}
                />
              </Tab>
              <Tab eventKey="profile" title="Profile"></Tab>
              <Tab eventKey="contact" title="Contact" disabled></Tab>
            </Tabs>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    Axios.get("http://lozikas-001-site1.htempurl.com/api/Users/home", {
      params: {
        userId: this.props.userId
      }
    }).then(Response =>
      this.setState({
        Username: Response.data.Username,
        Name: Response.data.Name,
        Surname: Response.data.Surname,
        TotalGuesses: Response.data.TotalGuesses,
        SuccessfullGuesses: Response.data.SuccessfullGuesses,
        FailedGuesses: Response.data.FailedGuesses,
        MissedGuesses: Response.data.MissedGuesses,
        RatedGuesses: Response.data.RatedGuesses,
        Rank: Response.data.Rank,
        Points: Response.data.Points
      })
    );
  }
}

export default Home;
