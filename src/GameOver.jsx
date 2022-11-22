import "./GameOver.css"
const GameOver = (props) =>{
    return(
        <div className="overlay">
        <div className="modal">
          <h2>You lost!</h2>
          <p>Your final score: {props.finalscore}</p>
          <button className="btn close" onClick={props.close}>Close</button>
        </div>
      </div>
    )
}
export default GameOver