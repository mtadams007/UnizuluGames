import React from "react";

import XOGame from "../XOGame/XOGame";
import { stop, victory, win } from "../../Utils/Constants";

import "./OrderAndChaosGame.css";

class OrderAndChaosGame extends XOGame {
  state = {
    squares: {},
    isX: true,
    orderTurn: true,
    gameOver: false,
    isComputerPlayer: true,
    isComputerTurn: false
  };

  componentDidUpdate = () => {
    this.isWin();
    if (!this.state.gameOver) {
      if (Object.keys(this.state.squares).length < 36) {
        window.setTimeout(this.ai, 300);
      }
    }
  };

  switchMoves = (squares, isOrderTurn = this.state.orderTurn) => {
    this.setState({
      squares: squares,
      isX: !this.state.isX,
      orderTurn: isOrderTurn,
      isComputerTurn: false
    });
  };

  makeOBlockingMove = blockingMove => {
    return {
      ...this.state.squares,
      [blockingMove]: "O"
    };
  };

  makeXBlockingMove = blockingMove => {
    return {
      ...this.state.squares,
      [blockingMove]: "X"
    };
  };

  // Order and Chaos Checkers

  horizontalVerticalChecker = (directionNumber, numberOfRow, arrayToFilter) => {
    if (this.state.isComputerTurn) {
      // the valueArray is checking how many keys are in a row
      const valueArray = arrayToFilter.filter(
        key => key[directionNumber] === `${numberOfRow}`
      );
      let arrayLength = valueArray.length;
      // checking if the length is equal to 4, then we need to check if there are 4 of a kind in a row and need to block or think about blocking 3 in a row

      if (arrayLength === 5) {
        let blockingMove = "";
        let str = "";
        let i = 1;
        // checks if we're checking horizontal or not

        if (directionNumber === 0) {
          while (i < 7) {
            if (this.state.squares[`${numberOfRow}a${i}`]) {
              str += this.state.squares[`${numberOfRow}a${i}`];
            } else {
              blockingMove = `${numberOfRow}a${i}`;
            }
            i++;
          }
          // if there's five symbols in a row then we must block. we return STOP so that we don't make two moves
          if (str.includes("XXXXX")) {
            const squares = this.makeOBlockingMove(blockingMove);
            this.switchMoves(squares);
            return stop;
          } else if (str.includes("OOOOO")) {
            const squares = this.makeXBlockingMove(blockingMove);
            this.switchMoves(squares);
            return stop;
            // If there's four in a row and another one blocking we check whether its a potential victory and then we block
          } else if (str === "XXXXO") {
            if (blockingMove !== `${numberOfRow}a6`) {
              const squares = this.makeOBlockingMove(blockingMove);
              this.switchMoves(squares);
              return stop;
            }
          } else if (str === "OOOOX") {
            if (blockingMove !== `${numberOfRow}a6`) {
              const squares = this.makeXBlockingMove(blockingMove);
              this.switchMoves(squares);
              return stop;
            }
          } else if (str === "OXXXX") {
            if (blockingMove !== `${numberOfRow}a1`) {
              const squares = this.makeOBlockingMove(blockingMove);
              this.switchMoves(squares);
              return stop;
            }
          } else if (str === "XOOOO") {
            if (blockingMove !== `${numberOfRow}a1`) {
              const squares = this.makeXBlockingMove(blockingMove);
              this.switchMoves(squares);
              return stop;
            }
          }

          // vertical check same logic as vertical
        } else if (directionNumber === 2) {
          while (i < 7) {
            if (this.state.squares[`${i}a${numberOfRow}`]) {
              str += this.state.squares[`${i}a${numberOfRow}`];
            } else {
              blockingMove = `${i}a${numberOfRow}`;
            }
            i++;
          }
          if (str.includes("XXXXX")) {
            const squares = this.makeOBlockingMove(blockingMove);
            this.switchMoves(squares);
            return stop;
          } else if (str.includes("OOOOO")) {
            const squares = this.makeXBlockingMove(blockingMove);
            this.switchMoves(squares);
            return stop;
          } else if (str === "XXXXO") {
            if (blockingMove !== `6a${numberOfRow}`) {
              const squares = this.makeOBlockingMove(blockingMove);
              this.switchMoves(squares);
              return stop;
            }
          } else if (str === "OOOOX") {
            if (blockingMove !== `6a${numberOfRow}`) {
              const squares = this.makeXBlockingMove(blockingMove);
              this.switchMoves(squares);
              return stop;
            }
          } else if (str === "OXXXX") {
            if (blockingMove !== `1a${numberOfRow}`) {
              const squares = this.makeOBlockingMove(blockingMove);
              this.switchMoves(squares);
              return stop;
            }
          } else if (str === "XOOOO") {
            if (blockingMove !== `1a${numberOfRow}`) {
              const squares = this.makeXBlockingMove(blockingMove);
              this.switchMoves(squares);
              return stop;
            }
          }
        }
      } else if (arrayLength === 4) {
        let blockingMove = "";
        let str = "";
        let i = 1;
        // checking horizontal threats
        if (directionNumber === 0) {
          while (i < 7) {
            if (this.state.squares[`${numberOfRow}a${i}`]) {
              str += this.state.squares[`${numberOfRow}a${i}`];
            } else {
              blockingMove += `${numberOfRow}a${i}.`;
            }
            i++;
          }
          if (str === "XXXX") {
            const moves = blockingMove.split(".");
            // if the first empty space is at the beginning we have the possibility of not blocking it there, so we must block the next option
            if (moves[0] === `${numberOfRow}a1`) {
              const squares = this.makeOBlockingMove(moves[1]);
              this.switchMoves(squares);
              return stop;
            } else {
              const squares = this.makeOBlockingMove(moves[0]);
              this.switchMoves(squares);
              return stop;
            }
          } else if (str === "OOOO") {
            const moves = blockingMove.split(".");
            if (moves[0] === `${numberOfRow}a1`) {
              const squares = this.makeXBlockingMove(moves[1]);
              this.switchMoves(squares);
              return stop;
            } else {
              const squares = this.makeXBlockingMove(moves[0]);
              this.switchMoves(squares);
              return stop;
            }
          } else if (str === "XXXO") {
            const moves = blockingMove.split(".");
            if (moves[1] !== `${numberOfRow}a6`) {
              return `${moves[1]}.O`;
            }
          } else if (str === "OOOX") {
            const moves = blockingMove.split(".");
            if (moves[1] !== `${numberOfRow}a6`) {
              return `${moves[1]}.X`;
            }
          } else if (str === "OXXX") {
            const moves = blockingMove.split(".");
            if (moves[0] !== `${numberOfRow}a1`) {
              return `${moves[0]}.O`;
            }
          } else if (str === "XOOO") {
            const moves = blockingMove.split(".");
            if (moves[0] !== `${numberOfRow}a1`) {
              return `${moves[0]}.X`;
            }
          }
        }
        if (directionNumber === 2) {
          while (i < 7) {
            if (this.state.squares[`${i}a${numberOfRow}`]) {
              str += this.state.squares[`${i}a${numberOfRow}`];
            } else {
              blockingMove += `${i}a${numberOfRow}.`;
            }
            i++;
          }
          if (str === "XXXX") {
            const moves = blockingMove.split(".");
            // if the first empty space is at the beginning we have the possibility of not blocking it there, so we must block the next option
            if (moves[0] === `1a${numberOfRow}`) {
              const squares = this.makeOBlockingMove(moves[1]);
              this.switchMoves(squares);
              return stop;
            } else {
              const squares = this.makeOBlockingMove(moves[0]);
              this.switchMoves(squares);
              return stop;
            }
          } else if (str === "OOOO") {
            const moves = blockingMove.split(".");
            if (moves[0] === `1a${numberOfRow}`) {
              const squares = this.makeXBlockingMove(moves[1]);
              this.switchMoves(squares);
              return stop;
            } else {
              const squares = this.makeXBlockingMove(moves[0]);
              this.switchMoves(squares);
              return stop;
            }
          } else if (str === "XXXO") {
            const moves = blockingMove.split(".");
            if (moves[1] !== `6a${numberOfRow}`) {
              return `${moves[1]}.O`;
            }
          } else if (str === "OOOX") {
            const moves = blockingMove.split(".");
            if (moves[1] !== `6a${numberOfRow}`) {
              return `${moves[1]}.X`;
            }
          } else if (str === "OXXX") {
            const moves = blockingMove.split(".");
            if (moves[0] !== `1a${numberOfRow}`) {
              return `${moves[0]}.O`;
            }
          } else if (str === "XOOO") {
            const moves = blockingMove.split(".");
            if (moves[0] !== `1a${numberOfRow}`) {
              return `${moves[0]}.X`;
            }
          }
        }
      } else if (arrayLength === 3) {
        let blockingMove = "";
        let str = "";
        let i = 1;
        // checking horizontal threats
        if (directionNumber === 0) {
          while (i < 7) {
            if (this.state.squares[`${numberOfRow}a${i}`]) {
              str += this.state.squares[`${numberOfRow}a${i}`];
            } else {
              blockingMove += `${numberOfRow}a${i}.`;
            }
            i++;
          }
          if (str === "XXX") {
            let moves = blockingMove.split(".");
            return `${moves[1]}.O`;
          } else if (str === "OOO") {
            let moves = blockingMove.split(".");
            return `${moves[1]}.X`;
          }
        } else if (directionNumber === 2) {
          while (i < 7) {
            if (this.state.squares[`${i}a${numberOfRow}`]) {
              str += this.state.squares[`${i}a${numberOfRow}`];
            } else {
              blockingMove += `${i}a${numberOfRow}.`;
            }
            i++;
          }
          if (str === "XXX") {
            let moves = blockingMove.split(".");
            return `${moves[1]}.O`;
          } else if (str === "OOO") {
            let moves = blockingMove.split(".");
            return `${moves[1]}.X`;
          }
        }
      }
    }
  };

  easyDiagonalAiChecker = arrayToFilter => {
    // are the x coordinate and y coordinate the same
    const valueArray = arrayToFilter.filter(key => key[0] === key[2]);
    let arrayLength = valueArray.length;
    // checking if the length is equal to 5, then we need to check if there are 4 of a kind in a row and need to block or think about blocking 3 in a row

    if (arrayLength === 5) {
      let blockingMove = "";
      let str = "";
      let i = 1;
      while (i < 7) {
        if (this.state.squares[`${i}a${i}`]) {
          str += this.state.squares[`${i}a${i}`];
        } else {
          blockingMove = `${i}a${i}`;
        }
        i++;
      }
      if (str.includes("XXXXX")) {
        const squares = this.makeOBlockingMove(blockingMove);
        this.switchMoves(squares);
        return stop;
      } else if (str.includes("OOOOO")) {
        const squares = this.makeXBlockingMove(blockingMove);
        this.switchMoves(squares);
        return stop;
      } else if (str === "XXXXO") {
        if (blockingMove !== `6a6`) {
          const squares = this.makeOBlockingMove(blockingMove);
          this.switchMoves(squares);
          return stop;
        }
      } else if (str === "OOOOX") {
        if (blockingMove !== `6a6`) {
          const squares = this.makeXBlockingMove(blockingMove);
          this.switchMoves(squares);
          return stop;
        }
      } else if (str === "OXXXX") {
        if (blockingMove !== `1a1`) {
          const squares = this.makeOBlockingMove(blockingMove);
          this.switchMoves(squares);
          return stop;
        }
      } else if (str === "XOOOO") {
        if (blockingMove !== `1a1`) {
          const squares = this.makeXBlockingMove(blockingMove);
          this.switchMoves(squares);
          return stop;
        }
      }
    } else if (arrayLength === 4) {
      let blockingMove = "";
      let str = "";
      let i = 1;
      while (i < 7) {
        if (this.state.squares[`${i}a${i}`]) {
          str += this.state.squares[`${i}a${i}`];
        } else {
          blockingMove += `${i}a${i}.`;
        }
        i++;
      }
      if (str === "XXXX") {
        const moves = blockingMove.split(".");
        // if the first empty space is at the beginning we have the possibility of not blocking it there, so we must block the next option
        if (moves[0] === `1a1`) {
          const squares = this.makeOBlockingMove(moves[1]);
          this.switchMoves(squares);
          return stop;
        } else {
          const squares = this.makeOBlockingMove(moves[0]);
          this.switchMoves(squares);
          return stop;
        }
      } else if (str === "OOOO") {
        const moves = blockingMove.split(".");
        if (moves[0] === `1a1`) {
          const squares = this.makeXBlockingMove(moves[1]);
          this.switchMoves(squares);
          return stop;
        } else {
          const squares = this.makeXBlockingMove(moves[0]);
          this.switchMoves(squares);
          return stop;
        }
      } else if (str === "XXXO") {
        const moves = blockingMove.split(".");
        if (moves[1] !== `6a6`) {
          return `${moves[1]}.O`;
        }
      } else if (str === "OOOX") {
        const moves = blockingMove.split(".");
        if (moves[1] !== `6a6`) {
          return `${moves[1]}.X`;
        }
      } else if (str === "OXXX") {
        const moves = blockingMove.split(".");
        if (moves[0] !== `1a1`) {
          return `${moves[0]}.O`;
        }
      } else if (str === "XOOO") {
        const moves = blockingMove.split(".");
        if (moves[0] !== `1a1`) {
          return `${moves[0]}.X`;
        }
      }
    } else if (arrayLength === 3) {
      let blockingMove = "";
      let str = "";
      let i = 1;
      // checking horizontal threats

      while (i < 7) {
        if (this.state.squares[`${i}a${i}`]) {
          str += this.state.squares[`${i}a${i}`];
        } else {
          blockingMove += `${i}a${i}.`;
        }
        i++;
      }
      if (str === "XXX") {
        let moves = blockingMove.split(".");
        return `${moves[1]}.O`;
      } else if (str === "OOO") {
        let moves = blockingMove.split(".");
        return `${moves[1]}.X`;
      }
    }
  };

  mediumDiagonalAiChecker = (arrayToFilter, sum) => {
    // are the x coordinate and y coordinate the same
    const valueArray = arrayToFilter.filter(
      key => parseInt(key[0], 10) + parseInt(key[2], 10) === sum
    );
    let arrayLength = valueArray.length;
    if (sum === 6 && arrayLength === 4) {
      let str = "";
      let blockingMove = "";
      let i = 1;
      while (i < 6) {
        if (this.state.squares[`${6 - i}a${i}`]) {
          str += this.state.squares[`${6 - i}a${i}`];
        } else {
          blockingMove += `${6 - i}a${i}`;
        }
        i++;
      }
      if (str === "XXXX") {
        const squares = this.makeOBlockingMove(blockingMove);
        this.switchMoves(squares);
        return stop;
      } else if (str === "OOOO") {
        const squares = this.makeXBlockingMove(blockingMove);
        this.switchMoves(squares);
        return stop;
      }
    } else if (sum === 8 && arrayLength === 4) {
      let str = "";
      let blockingMove = "";
      let i = 1;
      while (i < 6) {
        if (this.state.squares[`${7 - i}a${i + 1}`]) {
          str += this.state.squares[`${7 - i}a${i + 1}`];
        } else {
          blockingMove += `${7 - i}a${i + 1}`;
        }
        i++;
      }
      if (str === "XXXX") {
        const squares = this.makeOBlockingMove(blockingMove);
        this.switchMoves(squares);
        return stop;
      } else if (str === "OOOO") {
        const squares = this.makeXBlockingMove(blockingMove);
        this.switchMoves(squares);
        return stop;
      }
    } else if (sum === 7) {
      if (arrayLength === 5) {
        let blockingMove = "";
        let str = "";
        let i = 1;
        while (i < 7) {
          if (this.state.squares[`${7 - i}a${i}`]) {
            str += this.state.squares[`${7 - i}a${i}`];
          } else {
            blockingMove = `${7 - i}a${i}`;
          }
          i++;
        }
        if (str.includes("XXXXX")) {
          const squares = this.makeOBlockingMove(blockingMove);
          this.switchMoves(squares);
          return stop;
        } else if (str.includes("OOOOO")) {
          const squares = this.makeXBlockingMove(blockingMove);
          this.switchMoves(squares);
          return stop;
        } else if (str === "XXXXO") {
          if (blockingMove !== `1a6`) {
            const squares = this.makeOBlockingMove(blockingMove);
            this.switchMoves(squares);
            return stop;
          }
        } else if (str === "OOOOX") {
          if (blockingMove !== `1a6`) {
            const squares = this.makeXBlockingMove(blockingMove);
            this.switchMoves(squares);
            return stop;
          }
        } else if (str === "OXXXX") {
          if (blockingMove !== `6a1`) {
            const squares = this.makeOBlockingMove(blockingMove);
            this.switchMoves(squares);
            return stop;
          }
        } else if (str === "XOOOO") {
          if (blockingMove !== `6a1`) {
            const squares = this.makeXBlockingMove(blockingMove);
            this.switchMoves(squares);
            return stop;
          }
        }
      } else if (arrayLength === 4) {
        let blockingMove = "";
        let str = "";
        let i = 1;
        while (i < 7) {
          if (this.state.squares[`${7 - i}a${i}`]) {
            str += this.state.squares[`${7 - i}a${i}`];
          } else {
            blockingMove += `${7 - i}a${i}.`;
          }
          i++;
        }
        if (str === "XXXX") {
          const moves = blockingMove.split(".");
          // if the first empty space is at the beginning we have the possibility of not blocking it there, so we must block the next option
          if (moves[0] === `6a1`) {
            const squares = this.makeOBlockingMove(moves[1]);
            this.switchMoves(squares);
            return stop;
          } else {
            const squares = this.makeOBlockingMove(moves[0]);
            this.switchMoves(squares);
            return stop;
          }
        } else if (str === "OOOO") {
          const moves = blockingMove.split(".");
          if (moves[0] === `6a1`) {
            const squares = this.makeXBlockingMove(moves[1]);
            this.switchMoves(squares);
            return stop;
          } else {
            const squares = this.makeXBlockingMove(moves[0]);
            this.switchMoves(squares);
            return stop;
          }
        } else if (str === "XXXO") {
          const moves = blockingMove.split(".");
          if (moves[1] !== `1a6`) {
            return `${moves[1]}.O`;
          }
        } else if (str === "OOOX") {
          const moves = blockingMove.split(".");
          if (moves[1] !== `1a6`) {
            return `${moves[1]}.X`;
          }
        } else if (str === "OXXX") {
          const moves = blockingMove.split(".");
          if (moves[0] !== `6a1`) {
            return `${moves[0]}.O`;
          }
        } else if (str === "XOOO") {
          const moves = blockingMove.split(".");
          if (moves[0] !== `6a1`) {
            return `${moves[0]}.X`;
          }
        }
      } else if (arrayLength === 3) {
        let blockingMove = "";
        let str = "";
        let i = 1;
        // checking horizontal threats

        while (i < 7) {
          if (this.state.squares[`${7 - i}a${i}`]) {
            str += this.state.squares[`${7 - i}a${i}`];
          } else {
            blockingMove += `${7 - i}a${i}.`;
          }
          i++;
        }
        if (str === "XXX") {
          let moves = blockingMove.split(".");
          return `${moves[1]}.O`;
        } else if (str === "OOO") {
          let moves = blockingMove.split(".");
          return `${moves[1]}.X`;
        }
      }
    }
  };

  hardDiagonalAiChecker = arrayToFilter => {
    // checking if its the first diagonal
    const valueArray = arrayToFilter.filter(
      key => parseInt(key[0], 10) - parseInt(key[2], 10) === 1
    );
    // checking which diagonal is bigger
    const valueArray2 = arrayToFilter.filter(
      key => parseInt(key[2], 10) - parseInt(key[0], 10) === 1
    );
    let arrayLength = valueArray.length;
    let arrayLength2 = valueArray2.length;
    if (arrayLength === 4) {
      let str = "";
      let blockingMove = "";
      let i = 1;
      while (i < 6) {
        if (this.state.squares[`${i + 1}a${i}`]) {
          str += this.state.squares[`${i + 1}a${i}`];
        } else {
          blockingMove += `${i + 1}a${i}`;
        }
        i++;
      }
      if (str === "XXXX") {
        const squares = this.makeOBlockingMove(blockingMove);
        this.switchMoves(squares);
        return stop;
      } else if (str === "OOOO") {
        const squares = this.makeXBlockingMove(blockingMove);
        this.switchMoves(squares);
        return stop;
      }
    } else if (arrayLength2 === 4) {
      let str = "";
      let blockingMove = "";
      let i = 1;
      while (i < 6) {
        if (this.state.squares[`${i}a${i + 1}`]) {
          str += this.state.squares[`${i}a${i + 1}`];
        } else {
          blockingMove += `${i}a${i + 1}`;
        }
        i++;
      }
      if (str === "XXXX") {
        const squares = this.makeOBlockingMove(blockingMove);
        this.switchMoves(squares);
        return stop;
      } else if (str === "OOOO") {
        const squares = this.makeXBlockingMove(blockingMove);
        this.switchMoves(squares);
        return stop;
      }
    }
  };

  // Compiles all our order and chaos checks

  aiMoveChecker = () => {
    let keys = Object.keys(this.state.squares);
    let arrayToCheck = [];
    // let length = keys.length;
    let i = 1;
    while (i < 7) {
      const row = this.horizontalVerticalChecker(0, i, keys);
      window.setTimeout(200);
      const column = this.horizontalVerticalChecker(2, i, keys);
      if (row) {
        if (row === stop) {
          arrayToCheck.push(row);
          //As in tic tac toe, we must break when we find a victory
          return [stop];
        } else {
          arrayToCheck.push(row);
        }
      }
      if (column) {
        if (column === stop) {
          arrayToCheck.push(column);
          return [stop];
        } else {
          arrayToCheck.push(column);
        }
      }
      // column.push(arrayToCheck);
      i++;
    }
    let option;
    let option2;
    let option3;
    let option4;
    let option5;
    let stopCheck = arrayToCheck.filter(win => win === stop);
    if (stopCheck.length !== 0) {
      return [stop];
    } else {
      option = this.easyDiagonalAiChecker(keys);
      window.setTimeout(50);
      if (this.state.isComputerTurn) {
        option2 = this.mediumDiagonalAiChecker(keys, 6);
      }
      window.setTimeout(50);
      if (this.state.isComputerTurn) {
        option3 = this.mediumDiagonalAiChecker(keys, 7);
      }
      window.setTimeout(50);
      if (this.state.isComputerTurn) {
        option4 = this.mediumDiagonalAiChecker(keys, 8);
      }
      window.setTimeout(50);
      if (this.state.isComputerTurn) {
        option5 = this.hardDiagonalAiChecker(keys);
      }
    }
    if (option) {
      arrayToCheck.push(option);
    }
    if (option2) {
      arrayToCheck.push(option2);
    }
    if (option3) {
      arrayToCheck.push(option3);
    }
    if (option4) {
      arrayToCheck.push(option4);
    }
    if (option5) {
      arrayToCheck.push(option5);
    }
    return arrayToCheck;
  };

  ai = () => {
    let keys = Object.keys(this.state.squares);
    if (this.state.isComputerTurn && !this.state.gameOver) {
      let options = [];
      //returns danger array from places we might need to block
      const dangerArray = this.aiMoveChecker();
      // if we already moved, then don't worry about moving again
      let stopCheck = dangerArray.filter(win => win === stop);
      if (stopCheck.length !== 0) {
        return;
      }
      let dangerArrayLength = dangerArray.length;
      if (dangerArrayLength !== 0) {
        let randomMove =
          dangerArray[Math.floor(Math.random() * dangerArrayLength)];
        let blockHere = randomMove.split(".");
        const squares = {
          ...this.state.squares,
          [`${blockHere[0]}`]: `${blockHere[1]}`
        };
        this.switchMoves(squares, !this.state.orderTurn);
        return;
      } else {
        for (let j = 1; j < 7; j++) {
          for (let i = 1; i < 7; i++) {
            options.push(`${j}a${i}`);
          }
        }
        let length = keys.length;
        //k is the array number for options
        for (let k = 0; k < length; k++) {
          //m is the array number for keys length
          for (let m = 0; m < 36; m++) {
            if (keys[k] === options[m]) {
              options.splice(m, 1);
              break;
            }
          }
        }
        let randomSelector = 36 - length;
        let number = Math.floor(Math.random() * randomSelector);
        const squares = {
          ...this.state.squares,
          [`${options[number]}`]: `${this.state.isX ? "X" : "O"}`
        };
        this.switchMoves(squares, !this.state.orderTurn);
        return;
      }
    }
  };
  // Order and Chaos win checkers

  horizontalWinChecker = () => {
    const keys = Object.keys(this.state.squares);
    const key = keys.slice(-1)[0];
    let winningSymbol = "M";
    if (key) {
      winningSymbol = this.state.squares[key];
    }
    let test = String(key);
    let parsedArray = test.split("a");
    let xCoord = parseInt(parsedArray[0], 10);
    let i = 1;
    while (i < 6) {
      if (this.state.squares[`${xCoord}a${1}`] === winningSymbol) {
        if (this.state.squares[`${xCoord}a${i}`] !== winningSymbol) {
          break;
        }
      } else if (this.state.squares[`${xCoord}a${2}`] === winningSymbol) {
        if (this.state.squares[`${xCoord}a${i + 1}`] !== winningSymbol) {
          break;
        }
      } else {
        break;
      }
      i++;
    }

    if (i === 6) {
      // trying to highlight wins
      if (this.state.squares[`${xCoord}a${1}`] === winningSymbol) {
        let k = 1;
        while (k < 6) {
          let element = document.getElementById(`${xCoord}a${k}`);
          element.classList.add(win);
          k++;
        }
      } else {
        let k = 1;
        while (k < 6) {
          let element = document.getElementById(`${xCoord}a${k + 1}`);
          element.classList.add(win);
          k++;
        }
      }
      return true;
    }
  };

  verticalWinChecker = () => {
    let keys = Object.keys(this.state.squares);
    let key = keys.slice(-1)[0];
    let winningSymbol = "M";
    if (key) {
      winningSymbol = this.state.squares[key];
    }
    let test = String(key);
    let parsedArray = test.split("a");
    let yCoord = parseInt(parsedArray[1], 10);
    let i = 1;
    while (i < 6) {
      if (this.state.squares[`${1}a${yCoord}`] === winningSymbol) {
        if (this.state.squares[`${i}a${yCoord}`] !== winningSymbol) {
          break;
        }
      } else if (this.state.squares[`${2}a${yCoord}`] === winningSymbol) {
        if (this.state.squares[`${i + 1}a${yCoord}`] !== winningSymbol) {
          break;
        }
      } else {
        break;
      }
      i++;
    }
    if (i === 6) {
      // trying to highlight wins
      if (this.state.squares[`${1}a${yCoord}`] === winningSymbol) {
        let k = 1;
        while (k < 6) {
          let element = document.getElementById(`${k}a${yCoord}`);
          element.classList.add(win);
          k++;
        }
      } else {
        let k = 1;
        while (k < 6) {
          let element = document.getElementById(`${k + 1}a${yCoord}`);
          element.classList.add(win);
          k++;
        }
      }
      return true;
    }
  };

  easyDiagonalWinChecker = () => {
    let keys = Object.keys(this.state.squares);
    let key = keys.slice(-1)[0];
    let winningSymbol = this.state.squares[key];
    let test = String(key);
    let parsedArray = test.split("a");
    let xCoord = parseInt(parsedArray[0], 10);
    let yCoord = parseInt(parsedArray[1], 10);
    let i = 1;

    if (
      xCoord === yCoord &&
      this.state.squares[`${1}a${1}`] === winningSymbol
    ) {
      while (i < 6) {
        if (this.state.squares[`${i}a${i}`] === winningSymbol) {
          i++;
        } else {
          break;
        }
      } // end of while loop
    } else if (xCoord === yCoord) {
      //end of xcoord===ycoord statement
      while (i < 6) {
        if (this.state.squares[`${i + 1}a${i + 1}`] === winningSymbol) {
          i++;
        } else {
          break;
        }
      }
    }
    if (i === 6) {
      // trying to highlight wins
      if (this.state.squares[`${1}a${1}`] === winningSymbol) {
        let k = 1;
        while (k < 6) {
          let element = document.getElementById(`${k}a${k}`);
          element.classList.add(win);
          k++;
        }
      } else {
        let k = 1;
        while (k < 6) {
          let element = document.getElementById(`${k + 1}a${k + 1}`);
          element.classList.add(win);
          k++;
        }
      }
      return true;
    }
  };

  mediumDiagonalWinChecker = () => {
    let keys = Object.keys(this.state.squares);
    let key = keys.slice(-1)[0];
    let winningSymbol = this.state.squares[key];
    let test = String(key);
    let parsedArray = test.split("a");
    let xCoord = parseInt(parsedArray[0], 10);
    let yCoord = parseInt(parsedArray[1], 10);
    let i = 1;
    if (xCoord + yCoord === 6) {
      while (i < 6) {
        if (this.state.squares[`${i}a${6 - i}`] === winningSymbol) {
          i++;
        } else {
          break;
        }
      }
    } else if (xCoord + yCoord === 8) {
      while (i < 6) {
        if (this.state.squares[`${i + 1}a${7 - i}`] === winningSymbol) {
          i++;
        } else {
          break;
        }
      }
    } else if (xCoord + yCoord === 7) {
      if (this.state.squares[`${1}a${6}`] === winningSymbol) {
        while (i < 6) {
          if (this.state.squares[`${i}a${7 - i}`] === winningSymbol) {
            i++;
          } else {
            break;
          }
        }
      } else if (this.state.squares[`${6}a${1}`] === winningSymbol) {
        while (i < 6) {
          if (this.state.squares[`${7 - i}a${i}`] === winningSymbol) {
            i++;
          } else {
            break;
          }
        }
      }
    }
    if (i === 6) {
      // trying to highlight wins
      if (xCoord + yCoord === 7) {
        if (this.state.squares[`${1}a${6}`] === winningSymbol) {
          let k = 1;
          while (k < 6) {
            let element = document.getElementById(`${k}a${7 - k}`);
            element.classList.add(win);
            k++;
          }
        } else {
          let k = 1;
          while (k < 6) {
            let element = document.getElementById(`${7 - k}a${k}`);
            element.classList.add(win);
            k++;
          }
        }
      } else if (xCoord + yCoord === 6) {
        let k = 1;
        while (k < 6) {
          let element = document.getElementById(`${k}a${6 - k}`);
          element.classList.add(win);
          k++;
        }
      } else {
        let k = 1;
        while (k < 6) {
          let element = document.getElementById(`${k + 1}a${7 - k}`);
          element.classList.add(win);
          k++;
        }
      }
      return true;
    }
  };

  hardDiagonalWinChecker = () => {
    let keys = Object.keys(this.state.squares);
    let key = keys.slice(-1)[0];
    let winningSymbol = this.state.squares[key];
    let test = String(key);
    let parsedArray = test.split("a");
    let xCoord = parseInt(parsedArray[0], 10);
    let yCoord = parseInt(parsedArray[1], 10);
    let i = 1;
    if (xCoord > yCoord && xCoord - yCoord === 1) {
      while (i < 6) {
        if (this.state.squares[`${i + 1}a${i}`] === winningSymbol) {
          i++;
        } else {
          break;
        }
      }
    } else if (yCoord > xCoord && yCoord - xCoord === 1) {
      while (i < 6) {
        if (this.state.squares[`${i}a${i + 1}`] === winningSymbol) {
          i++;
        } else {
          break;
        }
      }
    }
    if (i === 6) {
      // trying to highlight wins
      if (xCoord > yCoord) {
        let k = 1;
        while (k < 6) {
          let element = document.getElementById(`${k + 1}a${k}`);
          element.classList.add(win);
          k++;
        }
      } else {
        let k = 1;
        while (k < 6) {
          let element = document.getElementById(`${k}a${k + 1}`);
          element.classList.add(win);
          k++;
        }
      }
      return true;
    }
  };

  isChaosWin = () => {
    const keys = Object.keys(this.state.squares);
    return keys.length === 36;
  };

  isWin = () => {
    if (this.state.gameOver === false) {
      if (this.easyDiagonalWinChecker()) {
        this.setState({ gameOver: true });
      } else if (this.mediumDiagonalWinChecker()) {
        this.setState({ gameOver: true });
      } else if (this.hardDiagonalWinChecker()) {
        this.setState({ gameOver: true });
      } else if (this.horizontalWinChecker()) {
        this.setState({ gameOver: true });
      } else if (this.verticalWinChecker()) {
        this.setState({ gameOver: true });
      } else if (this.isChaosWin()) {
        this.setState({ gameOver: true });
      }
    }

    if (this.state.gameOver === true) {
      return true;
    }
  };

  // Toggling symbols in order and chaos

  toggleSymbolX = () => {
    this.setState({ isX: true });
  };

  toggleSymbolO = () => {
    this.setState({ isX: false });
  };

  render() {
    const player = this.state.orderTurn ? "Order" : "Chaos";
    let gameControlButton = null;
    let computer;
    let keys = Object.keys(this.state.squares);
    const elements = document.getElementsByClassName(win);
    const winningPlayer = keys.length !== 36 && elements ? "Order" : "Chaos";

    const declaration = this.renderDeclaration(
      false,
      this.state.gameOver,
      player,
      winningPlayer
    );
    if (!this.state.isComputerPlayer) {
      computer = (
        <button className="symbolButton" onClick={this.playComputer}>
          playComputer
        </button>
      );
    }
    const buttonArray = (
      <div className="buttonArray">
        <button className="symbolButton" onClick={this.toggleSymbolX}>
          X
        </button>
        <button className="symbolButton" onClick={this.toggleSymbolO}>
          O
        </button>
      </div>
    );

    return (
      <div className="gameGrid">
        <div>
          {declaration}
          {this.renderSq(6)}
          {buttonArray}
        </div>
        <div>{this.createGameButtons(36)}</div>
      </div>
    );
  }
}
export default OrderAndChaosGame;
