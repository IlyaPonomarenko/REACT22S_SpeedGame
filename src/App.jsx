import Circle from "./Circle";
import GameOver from "./GameOver";
import "./App.css";
import { Component } from "react";
import sound from "./assets/sounds/mixkit-cool-interface-click-tone-2568.wav"
const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
let clickSound = new Audio(sound)
class App extends Component {
  state = {
    circles: [1, 2, 3, 4],
    current: "",
    score: 0,
    pace: 1000,
    gameover: false,
    rounds:0,
  };
  timer;
  clickPlay = () =>{
    if (clickSound.paused){
      clickSound.play()
    }else{
      clickSound.currentTime = 0;
    }
  };
  clickHandler = (i) => {
    if (this.state.current !== i) {
      this.endHandler();
      return;
    }
   this.clickPlay()
    this.setState({
      score: this.state.score + 1,
      rounds: this.state.rounds - 1,
    });
  };

  nextCircle = () => {
    if(this.state.rounds >= 3){
      this.endHandler();
      return;
    }
    let nextActive;
    do {
      nextActive = getRndInt(0, 3);
    } while (nextActive === this.state.current);
    this.setState({
      current: nextActive,
      pace: this.state.pace - 10,
      rounds: this.state.rounds + 1,
    });
    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  startHandler = () => {
    this.nextCircle();
  };
  endHandler = () => {
    clearTimeout(this.timer);
    this.setState({
      gameover: !this.state.gameover,
    });
  };
  closeHandler = () => {
    this.setState({
      gameover: !this.state.gameover,
    });
    window.location.reload(false);
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
              <Circle
                key={i}
                id={i + 1}
                click={() => this.clickHandler(i)}
                active={this.state.current === i}
              />
            ))}
          </div>

          <button onClick={this.startHandler} className="startBtn">
            Start game
          </button>
          <button onClick={this.endHandler} className="endBtn">
            End game
          </button>
          {this.state.gameover && (
            <GameOver finalscore={this.state.score} close={this.closeHandler} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
