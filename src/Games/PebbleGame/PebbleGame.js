import React, { Component } from "react";

import Game from "../Game/Game";
import Pebble from "../GamePieces/Pebble/Pebble";

class PebbleGame extends Component {
  state = {
    squares: {},
    firstPlayerTurn: true,
    gameOver: false,
    isComputerPlayer: false,
    isComputerTurn: false
  };

  resetGame = () => {
    // this removes the class win from tictactoe and orderChaos which makes the squares white again
    this.setState({
      gameOver: false,
      firstPlayerTurn: true,
      pebbles: {},
      isComputerTurn: false,
      isComputerPlayer: false
    });
    return true;
  };

  playComputer = () => {
    this.resetGame();
    this.setState({
      isComputerPlayer: true
    });
  };

  removePebbles = (event, id, startIndex, row, endIndex) => {
    if (!this.state.gameOver) {
      // Checks whether the move has already been put in the state.squares hash
      // good so far
      const pebbles = {
        ...this.state.pebbles
      };
      for (let i = startIndex; i <= endIndex; i++) {
        pebbles[`${row}n${i}`] = "disappear";
      }
      if (this.state.isComputerPlayer) {
        this.setState({
          pebbles: pebbles,
          firstPlayerTurn: !this.state.firstPlayerTurn,
          isComputerTurn: true
        });
      } else {
        this.setState({
          pebbles: pebbles,
          firstPlayerTurn: !this.state.firstPlayerTurn
        });
      }
    }
  };
  // building Nim board

  buildNim = numArray => {
    const length = numArray.length;
    const sum = numArray.reduce((acc, val) => {
      return acc + val;
    });
    if (this.state.nimWinNumber !== sum) {
      this.setState({ nimWinNumber: sum });
    }

    let rows = [];
    for (let j = 1; j < length + 1; j++) {
      let pebbles = [<Pebble myClass={`keepSpacing pebble`} />];
      for (let i = 1; i <= numArray[j - 1]; i++) {
        let value = this.state.pebbles[j + "n" + i] || "";
        pebbles.push(
          <Pebble
            id={`${j}n${i}`}
            value={value}
            myClass={`r${j} ${value} pebble`}
            click={e =>
              this.removePebbles(e, `${j}n${i}`, i, j, numArray[j - 1])
            }
          />
        );
      }
      rows.push(<div className="board-row">{pebbles}</div>);
    }

    return rows;
  };

  render() {
    return;
  }
}

export default PebbleGame;
