import React from "react";
import Game from "../Game/Game";
import Square from "../GamePieces/Square/Square";

class XOGame extends Game {
  state = {
    squares: {},
    isX: true,
    gameOver: false,
    isComputerPlayer: false,
    isComputerTurn: false,
    orderTurn: true
  };

  renderSq = num => {
    // creates an empty row array that will be put down
    let rows = [];
    // for loop to create rows
    for (let j = 1; j <= num; j++) {
      let sqrs = [];
      // for loop to create columns
      for (let i = 1; i <= num; i++) {
        let value = this.state.squares[j + "a" + i] || ".";
        sqrs.push(
          // puts in our square with the id of its coordinates and a click handler that allows us to play
          <Square
            id={`${j}a${i}`}
            key={`${j}a${i}`}
            value={value}
            click={e => this.makeMoveHandler(e, `${j}a${i}`)}
          />
        );
      }
      // We push the rows into the arraw and then display them
      rows.push(<div>{sqrs}</div>);
    }
    return rows;
  };

  makeMoveHandler = (event, id) => {
    if (!this.state.isComputerTurn) {
      if (!this.state.gameOver) {
        // Checks whether the move has already been put in the state.squares hash
        if (this.state.squares[id]) {
        } else {
          // checks whether or not it is Xs turn
          if (this.state.isX === true) {
            // assigns a new object and manipulates it
            const squares = {
              ...this.state.squares,
              [id]: "X"
            };
            if (this.state.isComputerPlayer === true) {
              this.setState({
                squares: squares,
                isX: false,
                orderTurn: !this.state.orderTurn,
                isComputerTurn: true
              });
            } else {
              this.setState({
                squares: squares,
                isX: false,
                orderTurn: !this.state.orderTurn
              });
            }
          } else {
            if (this.state.isComputerPlayer === true) {
              const squares = {
                ...this.state.squares,
                [id]: "O"
              };
              this.setState({
                squares: squares,
                isX: true,
                orderTurn: !this.state.orderTurn,
                isComputerTurn: true
              });
            } else {
              const squares = {
                ...this.state.squares,
                [id]: "O"
              };
              this.setState({
                squares: squares,
                isX: true,
                orderTurn: !this.state.orderTurn
              });
            }
          }
        }
      }
    }
  };
  render() {
    return;
  }
}

export default XOGame;
