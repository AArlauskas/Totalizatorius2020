import React, { Component } from "react";
import gif from "../../Logos/LoadingGif.gif";
import "./styles.css";

class Loading extends Component {
  state = {};
  render() {
    return (
      <div className="loading">
        <img src={gif} alt="loading" className="gif" />
      </div>
    );
  }
}

export default Loading;
