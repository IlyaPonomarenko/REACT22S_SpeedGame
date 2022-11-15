import Circle from "./Circle";
import "./App.css";
import { Component } from "react";

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends Component {
  state = {
    circles: [1, 2, 3, 4],
    current: 0,
    score: 0,
    pace: 1000,
  };
  timer;
  clickHandler = (i) => {
    this.setState({
      score: this.state.score + 1,
    });
  };

  nextCircle = () => {
    let nextActive;
    do {
      nextActive = getRndInt(0, 3);
    } while (nextActive === this.state.current);
    this.setState({
      current: nextActive,
      pace: this.state.pace*0.95
    });
    console.log(this.state.current);
    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  startHandler = () => {
    this.nextCircle();
  };
  endHandler = () => {
    clearTimeout(this.timer);
  };
  render() {
    return (
      <div className="cover">
        <div className="container">
          <h1>Gather Lembas Bread!</h1>
          <h4>
            You have gathered: <span className="score">{this.state.score}</span>
          </h4>
          <div className="balls">
            {this.state.circles.map((circle, i) => (
              <Circle key={i} id={i + 1} click={() => this.clickHandler(i)} />
            ))}
          </div>
          <button onClick={this.startHandler} className="startBtn">
            Start game
          </button>
          <button onClick={this.endHandler} className="endBtn">
            End game
          </button>
        </div>
      </div>
    );
  }
}

export default App;
