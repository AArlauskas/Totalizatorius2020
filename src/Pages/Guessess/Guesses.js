import React, { Component } from "react";
import Match from "../../Components/Match/Match";
import "./styles.css";
import Axios from "axios";
import Loading from "../../Components/Loading/Loading";

class Guesses extends Component {
  state = {
    data: null,
    URLid: null
  };
  render() {
    return (
      <div className="Matches">
        {this.state.data === null || this.state.URLid === null ? (
          <Loading />
        ) : (
          this.state.data.map(item => (
            <div key={item.MatchId}>
              <Match
                data={item}
                UserId={this.props.UserId}
                URLid={this.state.URLid}
              />
              <hr />
            </div>
          ))
        )}
      </div>
    );
  }
  UNSAFE_componentWillMount() {
    let url = window.location.href;
    let param = url.split("/");
    param = param[param.length - 1];
    Axios.get("http://lozikas-001-site1.htempurl.com/api/users/getId", {
      params: {
        username: param
      }
    })
      .then(Response => this.setState({ URLid: Response.data }))
      .then(
        Axios.get(
          "http://lozikas-001-site1.htempurl.com/api/matches"
        ).then(data => this.setState({ data: data.data }))
      );
  }
}

export default Guesses;
