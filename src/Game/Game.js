import React, { Component } from "react";
import { win } from "../Utils/Constants";

class Game extends Component {
  state = {
    squares: {},
    isX: true,
    gameOver: false,
    isComputerPlayer: false,
    isComputerTurn: false,
    orderTurn: true
  };

  resetGame = () => {
    // this removes the class win from tictactoe and orderChaos which makes the squares white again
    let elements = document.getElementsByClassName(win);
    let length = elements.length;
    let i = 0;
    while (i < length) {
      elements[0].classList.remove(win);
      i++;
    }
    this.setState({
      squares: "",
      isX: true,
      gameOver: false,
      orderTurn: true,
      isComputerTurn: false,
      isComputerPlayer: false
    });
    return true;
  };

  createGameButtons = () => {
    let gameControlButton;
    if (
      Object.keys(this.state.squares).length === 0 ||
      this.state.gameOver ||
      Object.keys(this.state.squares).length === 9
    ) {
      gameControlButton = (
        <div className="gameControlArray">
          <button className="gameControlButton" onClick={this.resetGame}>
            Play a Friend
          </button>
          <button className="gameControlButton" onClick={this.playComputer}>
            Play the Computer
          </button>
        </div>
      );
    } else if (this.state.isComputerPlayer) {
      gameControlButton = <h1>Playing against Computer</h1>;
    } else {
      gameControlButton = <h1>Playing against a Friend</h1>;
    }
    return gameControlButton;
  };

  render() {
    return;
  }
}

export default Game;
