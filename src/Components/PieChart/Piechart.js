import React, { Component } from "react";
import PieChart from "react-minimal-pie-chart";
import Badge from "react-bootstrap/Badge";

class Piechart extends Component {
  state = {};
  render() {
    return (
      <div className="chart">
        <h3 style={{ marginBottom: 60 }}>Spėjimų diagrama</h3>
        <div className="explanation" style={{ marginBottom: 10 }}>
          <Badge
            pill
            variant="success"
            style={{ backgroundColor: "#65d45f", color: "black" }}
          >
            Atspėta
          </Badge>
          <Badge
            pill
            variant="warning"
            style={{
              marginLeft: 10,
              marginRight: 10,
              backgroundColor: "#ffff66"
            }}
          >
            Neatspėta
          </Badge>
          <Badge
            pill
            variant="danger"
            style={{ backgroundColor: "#ff4d4d", color: "black" }}
          >
            Praleista
          </Badge>
        </div>
        <PieChart
          radius={12}
          cy={14}
          animate
          animationDuration={1000}
          animationEasing="ease-out"
          data={[
            {
              title: "Atspėta",
              value:
                this.props.SuccessfullGuesses === 0
                  ? null
                  : this.props.SuccessfullGuesses,
              color: "#65d45f"
            },
            {
              title: "Neatspėta",
              value:
                this.props.FailedGuesses === 0
                  ? null
                  : this.props.FailedGuesses,
              color: "#ffff66"
            },
            {
              title: "Praleista",
              value:
                this.props.MissedGuesses === 0
                  ? null
                  : this.props.MissedGuesses,
              color: "#ff4d4d"
            }
          ]}
          label
          labelPosition={60}
          labelStyle={{
            fontFamily: "sans-serif",
            fontSize: "2px"
          }}
          lengthAngle={360}
          lineWidth={12}
          paddingAngle={18}
          rounded
          startAngle={0}
          viewBoxSize={[100, 100]}
        />
      </div>
    );
  }
}

export default Piechart;
