import React, { Component } from "react";
import { win } from "../../Utils/Constants";

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

  // Resets game as well so computer isn't confused as to when to play

  playComputer = () => {
    const elements = document.getElementsByClassName(win);
    const length = elements.length;
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
      pebbles: "",
      isComputerPlayer: true,
      isComputerTurn: false
    });
  };

  createGameButtons = () => {
    let gameControlButton;
    if (
      Object.keys(this.state.squares).length === 0 ||
      this.state.gameOver ||
      Object.keys(this.state.squares).length === 9
    ) {
      return (
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
      return <h1>Playing against Computer</h1>;
    } else {
      return <h1>Playing against a Friend</h1>;
    }
  };

  renderDeclaration = (isTie, gameOver, symbol, winSymbol) => {
    let declaration = <h1>{symbol}'s Turn</h1>;
    if (isTie) {
      declaration = <h1>Tie game</h1>;
    }

    if (gameOver) {
      declaration = <h1>{winSymbol} Wins!</h1>;
    }
    return declaration;
  };

  render() {
    return;
  }
}

export default Game;
