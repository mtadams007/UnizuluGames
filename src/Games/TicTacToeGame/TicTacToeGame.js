import React from "react";
import Square from "../GamePieces/Square/Square";
import XOGame from "../XOGame/XOGame";
import {
  win,
  chooseTicTacToe,
  chooseOrderChaos,
  chooseNim,
  english,
  zulu
} from "../../Utils/Constants";

class TicTacToeGame extends XOGame {
  state = {
    squares: {},
    isX: true,
    gameOver: false,
    isComputerPlayer: false,
    isComputerTurn: false
  };

  componentDidUpdate = () => {
    this.isTttWin();
    if (!this.state.gameOver) {
      if (Object.keys(this.state.squares).length < 9) {
        window.setTimeout(this.ticTacToeAi, 300);
      }
    }
  };

  isTttWin = () => {
    let keys = Object.keys(this.state.squares);
    let key = keys.slice(-1)[0];
    let winningSymbol = this.state.squares[key];
    let test = String(key);
    let parsedArray = test.split("a");
    let xCoord = parseInt(parsedArray[0], 10);
    let yCoord = parseInt(parsedArray[1], 10);
    let answer = false;
    if (this.state.gameOver === false) {
      //Looking for horizontal victories
      if (
        keys.includes(`${xCoord}a${((yCoord + 1) % 3) + 1}`) &&
        keys.includes(`${xCoord}a${((yCoord + 2) % 3) + 1}`)
      ) {
        if (
          this.state.squares[`${xCoord}a${((yCoord + 1) % 3) + 1}`] ===
            this.state.squares[`${xCoord}a${((yCoord + 2) % 3) + 1}`] &&
          this.state.squares[`${xCoord}a${(yCoord % 3) + 1}`] === winningSymbol
        ) {
          let element1 = document.getElementById(
            `${xCoord}a${((yCoord + 1) % 3) + 1}`
          );
          let element2 = document.getElementById(
            `${xCoord}a${((yCoord + 2) % 3) + 1}`
          );
          let element3 = document.getElementById(
            `${xCoord}a${(yCoord % 3) + 1}`
          );
          element1.classList.add(win);
          element2.classList.add(win);
          element3.classList.add(win);
          this.setState({ gameOver: true });
          answer = true;
        }
      }
      // Checks vertical victories
      if (
        keys.includes(`${((xCoord + 1) % 3) + 1}a${yCoord}`) &&
        keys.includes(`${((xCoord + 2) % 3) + 1}a${yCoord}`)
      ) {
        if (
          this.state.squares[`${((xCoord + 1) % 3) + 1}a${yCoord}`] ===
            this.state.squares[`${((xCoord + 2) % 3) + 1}a${yCoord}`] &&
          this.state.squares[`${(xCoord % 3) + 1}a${yCoord}`] === winningSymbol
        ) {
          let element1 = document.getElementById(
            `${((xCoord + 1) % 3) + 1}a${yCoord}`
          );
          let element2 = document.getElementById(
            `${((xCoord + 2) % 3) + 1}a${yCoord}`
          );
          let element3 = document.getElementById(
            `${(xCoord % 3) + 1}a${yCoord}`
          );
          element1.classList.add(win);
          element2.classList.add(win);
          element3.classList.add(win);
          this.setState({ gameOver: true });
          answer = true;
        }
      }
      // Checks diagonal victories from top left to bottom right
      if (xCoord === yCoord) {
        if (
          this.state.squares[
            `${((xCoord + 1) % 3) + 1}a${((yCoord + 1) % 3) + 1}`
          ] === this.state.squares[`${(xCoord % 3) + 1}a${(yCoord % 3) + 1}`] &&
          this.state.squares[`${(xCoord % 3) + 1}a${(yCoord % 3) + 1}`] ===
            winningSymbol
        ) {
          let element1 = document.getElementById(
            `${((xCoord + 1) % 3) + 1}a${((yCoord + 1) % 3) + 1}`
          );
          let element2 = document.getElementById(
            `${(xCoord % 3) + 1}a${(yCoord % 3) + 1}`
          );
          let element3 = document.getElementById(`${xCoord}a${yCoord}`);
          element1.classList.add(win);
          element2.classList.add(win);
          element3.classList.add(win);
          this.setState({ gameOver: true });
          answer = true;
        }
      }
      // checks diagonal victories from bottom left to top right
      if (xCoord + yCoord === 4) {
        if (
          this.state.squares[
            `${(xCoord % 3) + 1}a${((yCoord + 1) % 3) + 1}`
          ] ===
            this.state.squares[
              `${((xCoord + 1) % 3) + 1}a${(yCoord % 3) + 1}`
            ] &&
          this.state.squares[
            `${((xCoord + 1) % 3) + 1}a${(yCoord % 3) + 1}`
          ] === winningSymbol
        ) {
          let element1 = document.getElementById(
            `${(xCoord % 3) + 1}a${((yCoord + 1) % 3) + 1}`
          );
          let element2 = document.getElementById(
            `${((xCoord + 1) % 3) + 1}a${(yCoord % 3) + 1}`
          );
          let element3 = document.getElementById(`${xCoord}a${yCoord}`);
          element1.classList.add(win);
          element2.classList.add(win);
          element3.classList.add(win);
          this.setState({ gameOver: true });
          answer = true;
        }
      }
    }
    // true means someone won
    if (answer === true) {
      return true;
    }
    return answer;
  };

  ticTacToeFilterMe = (
    directionNumber,
    numberOfRow,
    arrayToFilter,
    gameNumber
  ) => {
    // filtering either the row or column, directionNumber is 0 for horizontal, so the key calls the xCoordinate, otherwise 2 for vertical
    const valueArray = arrayToFilter.filter(
      key => key[directionNumber] === `${numberOfRow}`
    );
    // gameNumber is how long a row we're checking for. In this case it is 2
    if (
      valueArray.length === gameNumber &&
      this.state.squares[valueArray[0]] === this.state.squares[valueArray[1]]
    ) {
      let key1 = String(valueArray[0]);
      let key2 = String(valueArray[1]);
      let key1Parsed = key1.split("a");
      let key2Parsed = key2.split("a");
      let firstYCoord = parseInt(key1Parsed[1], 10);
      let secondYCoord = parseInt(key2Parsed[1], 10);
      //the winning coordinate is the difference between double the list minus the last two added two together
      let winningYCoord = 6 - (firstYCoord + secondYCoord);
      let firstXCoord = parseInt(key1Parsed[0], 10);
      let secondXCoord = parseInt(key2Parsed[0], 10);
      let winningXCoord = 6 - (firstXCoord + secondXCoord);
      let move = "";
      // Confusing use of ternary here, but if the two in a row are NOT the current player's turn, it gets pushed to the danger array, otherwise computer will win here.
      // The reason for not blocking immediately is because we'd rather win if theres a chance
      if (this.state.squares[valueArray[0]] === (this.state.isX ? "O" : "X")) {
        if (directionNumber === 0) {
          move = `${numberOfRow}a${winningYCoord}`;
        } else {
          move = `${winningXCoord}a${numberOfRow}`;
        }
        return move;
        // if directionNumber is 0, then we make the horizontal victory
      } else if (directionNumber === 0) {
        let squares = {
          ...this.state.squares,
          [`${numberOfRow}a${winningYCoord}`]: `${this.state.isX ? "X" : "O"}`
        };
        // we return VICTORY so that when we check later we know not to put another mark down
        this.setState({
          squares: squares,
          isComputerTurn: false,
          isX: !this.state.isX
        });
        return "VICTORY";
      } else {
        let squares = {
          ...this.state.squares,
          [`${winningXCoord}a${numberOfRow}`]: `${this.state.isX ? "X" : "O"}`
        };
        this.setState({
          squares: squares,
          isComputerTurn: false,
          isX: !this.state.isX
        });
        return "VICTORY";
      }
    }
  };

  ticTacToeDiagonalCheckerOne = arrayToFilter => {
    const valueArray = arrayToFilter.filter(key => key[0] === key[2]);
    if (
      valueArray.length === 2 &&
      this.state.squares[valueArray[0]] === this.state.squares[valueArray[1]]
    ) {
      let key1 = String(valueArray[0]);
      let key2 = String(valueArray[1]);
      let key1Parsed = key1.split("a");
      let key2Parsed = key2.split("a");
      let firstCoord = parseInt(key1Parsed[0], 10);
      let secondCoord = parseInt(key2Parsed[1], 10);
      let winningCoord = 6 - (firstCoord + secondCoord);
      let move = "";
      if (this.state.squares[valueArray[0]] === (this.state.isX ? "O" : "X")) {
        move = `${winningCoord}a${winningCoord}`;
        return move;
      } else {
        let squares = {
          ...this.state.squares,
          [`${winningCoord}a${winningCoord}`]: `${this.state.isX ? "X" : "O"}`
        };
        this.setState({
          squares: squares,
          isComputerTurn: false,
          isX: !this.state.isX
        });
        return "VICTORY";
      }
    }
  };

  // Checks all the moves for the AI

  ticTacToeBlockChecker = () => {
    let keys = Object.keys(this.state.squares);
    let arrayToCheck = [];
    // let length = keys.length;
    let i = 1;
    while (i < 4) {
      // we push in all the squares that had a symbol and filter them by row and column. these we push into our filter check function
      const row = this.ticTacToeFilterMe(0, i, keys, 2);
      const column = this.ticTacToeFilterMe(2, i, keys, 2);
      if (row) {
        if (row === "VICTORY") {
          arrayToCheck.push(row);
          // we need to break here because otherwise if there is a later victory for the opposite symbol the computer plays both
          break;
        } else {
          arrayToCheck.push(row);
        }
      }
      if (column) {
        if (column === "VICTORY") {
          arrayToCheck.push(column);
          //same reason as above is why we're breaking here
          break;
        } else {
          arrayToCheck.push(column);
        }
      }
      // column.push(arrayToCheck);
      i++;
    }
    // checking diagonal moveslet victoryCheck = dangerArray.filter(win => win === "VICTORY")
    let option;
    let victoryCheck = arrayToCheck.filter(win => win === "VICTORY");
    if (victoryCheck.length !== 0) {
      return ["VICTORY"];
    } else {
      option = this.ticTacToeDiagonalCheckerOne(keys);
    }
    victoryCheck = arrayToCheck.filter(win => win === "VICTORY");
    let option2;
    if (victoryCheck.length !== 0) {
      return ["VICTORY"];
    } else {
      option2 = this.ticTacToeDiagonalCheckerTwo(keys);
    }
    if (option) {
      arrayToCheck.push(option);
    }
    if (option2) {
      arrayToCheck.push(option2);
    }
    return arrayToCheck;
  };

  ticTacToeDiagonalCheckerTwo = arrayToFilter => {
    const valueArray = arrayToFilter.filter(
      key => parseInt(key[0], 10) + parseInt(key[2], 10) === 4
    );

    if (
      valueArray.length === 2 &&
      this.state.squares[valueArray[0]] === this.state.squares[valueArray[1]]
    ) {
      let key1 = String(valueArray[0]);
      let key2 = String(valueArray[1]);
      let key1Parsed = key1.split("a");
      let key2Parsed = key2.split("a");
      let firstYCoord = parseInt(key1Parsed[1], 10);
      let secondYCoord = parseInt(key2Parsed[1], 10);
      let winningYCoord = 6 - (firstYCoord + secondYCoord);
      let firstXCoord = parseInt(key1Parsed[0], 10);
      let secondXCoord = parseInt(key2Parsed[0], 10);
      let winningXCoord = 6 - (firstXCoord + secondXCoord);
      let move = "";
      // as before we make the confusing ternary operation so that we know whether to try to block
      if (this.state.squares[valueArray[0]] === (this.state.isX ? "O" : "X")) {
        move = `${winningXCoord}a${winningYCoord}`;
        return move;
      } else {
        let squares = {
          ...this.state.squares,
          [`${winningXCoord}a${winningYCoord}`]: `${this.state.isX ? "X" : "O"}`
        };
        this.setState({
          squares: squares,
          isComputerTurn: false,
          isX: !this.state.isX
        });
        return "VICTORY";
      }
    }
  };

  // AI is purposefully not supposed to be unbeatable, but challenging. It trys to win first, then prevent the other player from winning, and finally goes randomly if neither of the first two

  ticTacToeAi = () => {
    // First we make sure that it is the computers turn and that the game is not over
    if (this.state.isComputerTurn && !this.state.gameOver) {
      // we make sure the computer knows what his symbol is so he doesn't put the wrong one down. currently he's always O but I'd like to change that in the future
      const symbol = this.state.isX ? "X" : "O";
      // options are its possible moves
      let options = [];
      let isX = this.state.isX;
      //returns danger array from places we might need to block
      const dangerArray = this.ticTacToeBlockChecker();
      // if we already won, then don't worry about moving again
      let victoryCheck = dangerArray.filter(win => win === "VICTORY");
      if (victoryCheck.length !== 0) {
        return;
      }
      // if theres a possibility of loss and we haven't won, the computer blocks the first win it can see.
      if (dangerArray.length !== 0) {
        const squares = {
          ...this.state.squares,
          [`${dangerArray[0]}`]: `${this.state.isX ? "X" : "O"}`
        };
        this.setState({ squares: squares, isX: !isX, isComputerTurn: false });
      } else {
        // if there is no danger of losing and no way of winning we make a random move. First we need to create the options of where we could go
        let keys = Object.keys(this.state.squares);
        for (let j = 1; j < 4; j++) {
          for (let i = 1; i < 4; i++) {
            options.push(`${j}a${i}`);
          }
        }
        let length = keys.length;
        //k is the array number for options
        // in this loop we eliminate all the moves that were already made
        for (let k = 0; k < keys.length; k++) {
          //m is the array number for keys length
          for (let m = 0; m < 9; m++) {
            if (keys[k] === options[m]) {
              options.splice(m, 1);
              break;
            }
          }
        }
        //We make a random move here

        let randomSelector = 9 - length;

        let number = Math.floor(Math.random() * randomSelector);
        const squares = {
          ...this.state.squares,
          [`${options[number]}`]: `${this.state.isX ? "X" : "O"}`
        };
        this.setState({ squares: squares, isX: !isX, isComputerTurn: false });
        // return;
      }
    }
  };

  render() {
    const symbol = this.state.isX ? "X" : "O";
    const winSymbol = this.state.isX ? "O" : "X";
    let gameControlButton = null;
    let computer;
    let keys = Object.keys(this.state.squares);
    let buttonArray;
    const declaration = this.renderDeclaration(
      keys.length === 9,
      this.state.gameOver,
      symbol,
      winSymbol
    );
    if (!this.state.isComputerPlayer) {
      computer = (
        <button className="symbolButton" onClick={this.playComputer}>
          playComputer
        </button>
      );
    }
    buttonArray = null;

    return (
      <div>
        {declaration}
        {this.renderSq(3)}
        {this.createGameButtons(9)}
      </div>
    );
  }
}

export default TicTacToeGame;
