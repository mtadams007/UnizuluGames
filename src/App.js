import React, { Component } from "react";
import Square from "./Square/Square";
import Pebble from "./Pebble/Pebble";
import TicTacToeGame from "./TicTacToeGame/TicTacToeGame";
import "./App.css";
import {
  win,
  chooseTicTacToe,
  chooseOrderChaos,
  chooseNim,
  english,
  zulu
} from "./Utils/Constants";

class App extends Component {
  state = {
    squares: {},
    pebbles: {},
    isX: true,
    gameOver: false,
    whichGame: "",
    orderTurn: true,
    language: english,
    nimWinNumber: 12,
    isComputerPlayer: false,
    isComputerTurn: false
  };

  // allows computer to move after asynchronous call

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (!this.state.gameOver) {
      if (
        this.state.whichGame === chooseTicTacToe &&
        Object.keys(this.state.squares).length < 9
      ) {
        window.setTimeout(this.ticTacToeAi, 300);
      } else if (
        this.state.whichGame === chooseOrderChaos &&
        Object.keys(this.state.squares).length !== 36
      ) {
        window.setTimeout(this.orderChaosAi, 300);
      } else if (
        this.state.whichGame === chooseNim &&
        Object.keys(this.state.pebbles).length !== 12
      ) {
        window.setTimeout(this.nimAi, 300);
      }
    }
  };

  // Basic navigation

  goHomeScreen = () => {
    this.setState({
      squares: "",
      isX: true,
      gameOver: false,
      whichGame: "",
      orderTurn: true,
      pebbles: "",
      isComputerTurn: false,
      isComputerPlayer: false
    });
  };

  // reset game sets everything back to normal

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
      pebbles: {},
      isComputerTurn: false,
      isComputerPlayer: false
    });
    return true;
  };

  chooseTicTacToe = () => {
    this.setState({ whichGame: chooseTicTacToe });
  };

  chooseNim = () => {
    this.setState({ whichGame: chooseNim });
  };

  chooseOrderChaos = () => {
    this.setState({ whichGame: chooseOrderChaos });
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

  toggleLanguage = () => {
    if (this.state.language === english) {
      this.setState({ language: zulu });
    } else {
      this.setState({ language: english });
    }
  };

  // puts a mark down when you click for tic tac toe or order and chaos

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

  // Order and Chaos Checkers

  orderChaosHorizontalVerticalChecker = (
    directionNumber,
    numberOfRow,
    arrayToFilter
  ) => {
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
            const squares = {
              ...this.state.squares,
              [blockingMove]: "O"
            };
            this.setState({
              squares: squares,
              isX: !this.state.isX,
              orderTurn: this.state.orderTurn,
              isComputerTurn: false
            });
            return "STOP";
          } else if (str.includes("OOOOO")) {
            const squares = {
              ...this.state.squares,
              [blockingMove]: "X"
            };
            this.setState({
              squares: squares,
              isX: !this.state.isX,
              orderTurn: this.state.orderTurn,
              isComputerTurn: false
            });
            return "STOP";
            // If there's four in a row and another one blocking we check whether its a potential victory and then we block
          } else if (str === "XXXXO") {
            if (blockingMove !== `${numberOfRow}a6`) {
              const squares = {
                ...this.state.squares,
                [blockingMove]: "O"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
            }
          } else if (str === "OOOOX") {
            if (blockingMove !== `${numberOfRow}a6`) {
              const squares = {
                ...this.state.squares,
                [blockingMove]: "X"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
            }
          } else if (str === "OXXXX") {
            if (blockingMove !== `${numberOfRow}a1`) {
              const squares = {
                ...this.state.squares,
                [blockingMove]: "O"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
            }
          } else if (str === "XOOOO") {
            if (blockingMove !== `${numberOfRow}a1`) {
              const squares = {
                ...this.state.squares,
                [blockingMove]: "X"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
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
            const squares = {
              ...this.state.squares,
              [blockingMove]: "O"
            };
            this.setState({
              squares: squares,
              isX: !this.state.isX,
              orderTurn: this.state.orderTurn,
              isComputerTurn: false
            });
            return "STOP";
          } else if (str.includes("OOOOO")) {
            const squares = {
              ...this.state.squares,
              [blockingMove]: "X"
            };
            this.setState({
              squares: squares,
              isX: !this.state.isX,
              orderTurn: this.state.orderTurn,
              isComputerTurn: false
            });
            return "STOP";
          } else if (str === "XXXXO") {
            if (blockingMove !== `6a${numberOfRow}`) {
              const squares = {
                ...this.state.squares,
                [blockingMove]: "O"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
            }
          } else if (str === "OOOOX") {
            if (blockingMove !== `6a${numberOfRow}`) {
              const squares = {
                ...this.state.squares,
                [blockingMove]: "X"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
            }
          } else if (str === "OXXXX") {
            if (blockingMove !== `1a${numberOfRow}`) {
              const squares = {
                ...this.state.squares,
                [blockingMove]: "O"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
            }
          } else if (str === "XOOOO") {
            if (blockingMove !== `1a${numberOfRow}`) {
              const squares = {
                ...this.state.squares,
                [blockingMove]: "X"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
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
              const squares = {
                ...this.state.squares,
                [moves[1]]: "O"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
            } else {
              const squares = {
                ...this.state.squares,
                [moves[0]]: "O"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
            }
          } else if (str === "OOOO") {
            const moves = blockingMove.split(".");
            if (moves[0] === `${numberOfRow}a1`) {
              const squares = {
                ...this.state.squares,
                [moves[1]]: "X"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
            } else {
              const squares = {
                ...this.state.squares,
                [moves[0]]: "X"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
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
              const squares = {
                ...this.state.squares,
                [moves[1]]: "O"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
            } else {
              const squares = {
                ...this.state.squares,
                [moves[0]]: "O"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
            }
          } else if (str === "OOOO") {
            const moves = blockingMove.split(".");
            if (moves[0] === `1a${numberOfRow}`) {
              const squares = {
                ...this.state.squares,
                [moves[1]]: "X"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
            } else {
              const squares = {
                ...this.state.squares,
                [moves[0]]: "X"
              };
              this.setState({
                squares: squares,
                isX: !this.state.isX,
                orderTurn: this.state.orderTurn,
                isComputerTurn: false
              });
              return "STOP";
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

  orderChaosEasyDiagonalAiChecker = arrayToFilter => {
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
        const squares = {
          ...this.state.squares,
          [blockingMove]: "O"
        };
        this.setState({
          squares: squares,
          isX: !this.state.isX,
          orderTurn: this.state.orderTurn,
          isComputerTurn: false
        });
        return "STOP";
      } else if (str.includes("OOOOO")) {
        const squares = {
          ...this.state.squares,
          [blockingMove]: "X"
        };
        this.setState({
          squares: squares,
          isX: !this.state.isX,
          orderTurn: this.state.orderTurn,
          isComputerTurn: false
        });
        return "STOP";
      } else if (str === "XXXXO") {
        if (blockingMove !== `6a6`) {
          const squares = {
            ...this.state.squares,
            [blockingMove]: "O"
          };
          this.setState({
            squares: squares,
            isX: !this.state.isX,
            orderTurn: this.state.orderTurn,
            isComputerTurn: false
          });
          return "STOP";
        }
      } else if (str === "OOOOX") {
        if (blockingMove !== `6a6`) {
          const squares = {
            ...this.state.squares,
            [blockingMove]: "X"
          };
          this.setState({
            squares: squares,
            isX: !this.state.isX,
            orderTurn: this.state.orderTurn,
            isComputerTurn: false
          });
          return "STOP";
        }
      } else if (str === "OXXXX") {
        if (blockingMove !== `1a1`) {
          const squares = {
            ...this.state.squares,
            [blockingMove]: "O"
          };
          this.setState({
            squares: squares,
            isX: !this.state.isX,
            orderTurn: this.state.orderTurn,
            isComputerTurn: false
          });
          return "STOP";
        }
      } else if (str === "XOOOO") {
        if (blockingMove !== `1a1`) {
          const squares = {
            ...this.state.squares,
            [blockingMove]: "X"
          };
          this.setState({
            squares: squares,
            isX: !this.state.isX,
            orderTurn: this.state.orderTurn,
            isComputerTurn: false
          });
          return "STOP";
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
          const squares = {
            ...this.state.squares,
            [moves[1]]: "O"
          };
          this.setState({
            squares: squares,
            isX: !this.state.isX,
            orderTurn: this.state.orderTurn,
            isComputerTurn: false
          });
          return "STOP";
        } else {
          const squares = {
            ...this.state.squares,
            [moves[0]]: "O"
          };
          this.setState({
            squares: squares,
            isX: !this.state.isX,
            orderTurn: this.state.orderTurn,
            isComputerTurn: false
          });
          return "STOP";
        }
      } else if (str === "OOOO") {
        const moves = blockingMove.split(".");
        if (moves[0] === `1a1`) {
          const squares = {
            ...this.state.squares,
            [moves[1]]: "X"
          };
          this.setState({
            squares: squares,
            isX: !this.state.isX,
            orderTurn: this.state.orderTurn,
            isComputerTurn: false
          });
          return "STOP";
        } else {
          const squares = {
            ...this.state.squares,
            [moves[0]]: "X"
          };
          this.setState({
            squares: squares,
            isX: !this.state.isX,
            orderTurn: this.state.orderTurn,
            isComputerTurn: false
          });
          return "STOP";
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

  orderChaosMediumDiagonalAiChecker = (arrayToFilter, sum) => {
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
        const squares = {
          ...this.state.squares,
          [blockingMove]: "O"
        };
        this.setState({
          squares: squares,
          isX: !this.state.isX,
          orderTurn: this.state.orderTurn,
          isComputerTurn: false
        });
        return "STOP";
      } else if (str === "OOOO") {
        const squares = {
          ...this.state.squares,
          [blockingMove]: "X"
        };
        this.setState({
          squares: squares,
          isX: !this.state.isX,
          orderTurn: this.state.orderTurn,
          isComputerTurn: false
        });
        return "STOP";
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
        const squares = {
          ...this.state.squares,
          [blockingMove]: "O"
        };
        this.setState({
          squares: squares,
          isX: !this.state.isX,
          orderTurn: this.state.orderTurn,
          isComputerTurn: false
        });
        return "STOP";
      } else if (str === "OOOO") {
        const squares = {
          ...this.state.squares,
          [blockingMove]: "X"
        };
        this.setState({
          squares: squares,
          isX: !this.state.isX,
          orderTurn: this.state.orderTurn,
          isComputerTurn: false
        });
        return "STOP";
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
          const squares = {
            ...this.state.squares,
            [blockingMove]: "O"
          };
          this.setState({
            squares: squares,
            isX: !this.state.isX,
            orderTurn: this.state.orderTurn,
            isComputerTurn: false
          });
          return "STOP";
        } else if (str.includes("OOOOO")) {
          const squares = {
            ...this.state.squares,
            [blockingMove]: "X"
          };
          this.setState({
            squares: squares,
            isX: !this.state.isX,
            orderTurn: this.state.orderTurn,
            isComputerTurn: false
          });
          return "STOP";
        } else if (str === "XXXXO") {
          if (blockingMove !== `1a6`) {
            const squares = {
              ...this.state.squares,
              [blockingMove]: "O"
            };
            this.setState({
              squares: squares,
              isX: !this.state.isX,
              orderTurn: this.state.orderTurn,
              isComputerTurn: false
            });
            return "STOP";
          }
        } else if (str === "OOOOX") {
          if (blockingMove !== `1a6`) {
            const squares = {
              ...this.state.squares,
              [blockingMove]: "X"
            };
            this.setState({
              squares: squares,
              isX: !this.state.isX,
              orderTurn: this.state.orderTurn,
              isComputerTurn: false
            });
            return "STOP";
          }
        } else if (str === "OXXXX") {
          if (blockingMove !== `6a1`) {
            const squares = {
              ...this.state.squares,
              [blockingMove]: "O"
            };
            this.setState({
              squares: squares,
              isX: !this.state.isX,
              orderTurn: this.state.orderTurn,
              isComputerTurn: false
            });
            return "STOP";
          }
        } else if (str === "XOOOO") {
          if (blockingMove !== `6a1`) {
            const squares = {
              ...this.state.squares,
              [blockingMove]: "X"
            };
            this.setState({
              squares: squares,
              isX: !this.state.isX,
              orderTurn: this.state.orderTurn,
              isComputerTurn: false
            });
            return "STOP";
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
            const squares = {
              ...this.state.squares,
              [moves[1]]: "O"
            };
            this.setState({
              squares: squares,
              isX: !this.state.isX,
              orderTurn: this.state.orderTurn,
              isComputerTurn: false
            });
            return "STOP";
          } else {
            const squares = {
              ...this.state.squares,
              [moves[0]]: "O"
            };
            this.setState({
              squares: squares,
              isX: !this.state.isX,
              orderTurn: this.state.orderTurn,
              isComputerTurn: false
            });
            return "STOP";
          }
        } else if (str === "OOOO") {
          const moves = blockingMove.split(".");
          if (moves[0] === `6a1`) {
            const squares = {
              ...this.state.squares,
              [moves[1]]: "X"
            };
            this.setState({
              squares: squares,
              isX: !this.state.isX,
              orderTurn: this.state.orderTurn,
              isComputerTurn: false
            });
            return "STOP";
          } else {
            const squares = {
              ...this.state.squares,
              [moves[0]]: "X"
            };
            this.setState({
              squares: squares,
              isX: !this.state.isX,
              orderTurn: this.state.orderTurn,
              isComputerTurn: false
            });
            return "STOP";
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

  orderChaosHardDiagonalAiChecker = arrayToFilter => {
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
        const squares = {
          ...this.state.squares,
          [blockingMove]: "O"
        };
        this.setState({
          squares: squares,
          isX: !this.state.isX,
          orderTurn: this.state.orderTurn,
          isComputerTurn: false
        });
        return "STOP";
      } else if (str === "OOOO") {
        const squares = {
          ...this.state.squares,
          [blockingMove]: "X"
        };
        this.setState({
          squares: squares,
          isX: !this.state.isX,
          orderTurn: this.state.orderTurn,
          isComputerTurn: false
        });
        return "STOP";
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
        const squares = {
          ...this.state.squares,
          [blockingMove]: "O"
        };
        this.setState({
          squares: squares,
          isX: !this.state.isX,
          orderTurn: this.state.orderTurn,
          isComputerTurn: false
        });
        return "STOP";
      } else if (str === "OOOO") {
        const squares = {
          ...this.state.squares,
          [blockingMove]: "X"
        };
        this.setState({
          squares: squares,
          isX: !this.state.isX,
          orderTurn: this.state.orderTurn,
          isComputerTurn: false
        });
        return "STOP";
      }
    }
  };

  // Compiles all our order and chaos checks

  orderChaosAiMoveChecker = () => {
    let keys = Object.keys(this.state.squares);
    let arrayToCheck = [];
    // let length = keys.length;
    let i = 1;
    while (i < 7) {
      const row = this.orderChaosHorizontalVerticalChecker(0, i, keys);
      window.setTimeout(200);
      const column = this.orderChaosHorizontalVerticalChecker(2, i, keys);
      if (row) {
        if (row === "STOP") {
          arrayToCheck.push(row);
          //As in tic tac toe, we must break when we find a victory
          return ["STOP"];
        } else {
          arrayToCheck.push(row);
        }
      }
      if (column) {
        if (column === "STOP") {
          arrayToCheck.push(column);
          return ["STOP"];
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
    let stopCheck = arrayToCheck.filter(win => win === "STOP");
    if (stopCheck.length !== 0) {
      return ["STOP"];
    } else {
      option = this.orderChaosEasyDiagonalAiChecker(keys);
      window.setTimeout(50);
      if (this.state.isComputerTurn) {
        option2 = this.orderChaosMediumDiagonalAiChecker(keys, 6);
      }
      window.setTimeout(50);
      if (this.state.isComputerTurn) {
        option3 = this.orderChaosMediumDiagonalAiChecker(keys, 7);
      }
      window.setTimeout(50);
      if (this.state.isComputerTurn) {
        option4 = this.orderChaosMediumDiagonalAiChecker(keys, 8);
      }
      window.setTimeout(50);
      if (this.state.isComputerTurn) {
        option5 = this.orderChaosHardDiagonalAiChecker(keys);
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

  orderChaosAi = () => {
    let keys = Object.keys(this.state.squares);
    if (this.state.isComputerTurn && !this.state.gameOver) {
      let options = [];
      //returns danger array from places we might need to block
      const dangerArray = this.orderChaosAiMoveChecker();
      // if we already moved, then don't worry about moving again
      let stopCheck = dangerArray.filter(win => win === "STOP");
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
        this.setState({
          squares: squares,
          isX: !this.state.isX,
          isComputerTurn: false,
          orderTurn: !this.state.orderTurn
        });
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
        this.setState({
          squares: squares,
          isX: !this.state.isX,
          isComputerTurn: false,
          orderTurn: !this.state.orderTurn
        });
        return;
      }
    }
  };
  // Order and Chaos win checkers

  horizontalWinChecker = () => {
    let keys = Object.keys(this.state.squares);
    let key = keys.slice(-1)[0];
    let winningSymbol;
    if (key !== null) {
      winningSymbol = this.state.squares[key];
    } else {
      winningSymbol =
        "Empty spot, need something here so that there is no error";
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
    let winningSymbol;
    if (key !== null) {
      winningSymbol = this.state.squares[key];
    } else {
      winningSymbol =
        "Empty spot, need something here so that there is no error";
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

  isOrderChaosWin = () => {
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

  // creates a board. the num you input is a num x num board

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
              this.removeNimStones(e, `${j}n${i}`, i, j, numArray[j - 1])
            }
          />
        );
      }
      rows.push(<div className="board-row">{pebbles}</div>);
    }

    return rows;
  };

  computerRandomMove = (key1, key2, key3) => {
    const pebbles = {
      ...this.state.pebbles
    };
    let key1Length = key1.length;
    let key2Length = key2.length;
    let key3Length = key3.length;
    let myKeys = [];
    if (key1Length === 0) {
      myKeys.push(["1n1", "1n2", "1n3"]);
    } else if (key1Length < 3) {
      let key = [];
      let i = 0;
      while (i < 3 - key1Length) {
        key.push(`1n${i + 1}`);
        i++;
      }
      myKeys.push(key);
    }
    if (key2Length === 0) {
      myKeys.push(["2n1", "2n2", "2n3", "2n4"]);
    } else if (key2Length < 4) {
      let key = [];
      let i = 0;
      while (i < 4 - key2Length) {
        key.push(`2n${i + 1}`);
        i++;
      }
      myKeys.push(key);
    }
    if (key3Length === 0) {
      myKeys.push(["3n1", "3n2", "3n3", "3n4", "3n5"]);
    } else if (key3Length < 5) {
      let key = [];
      let i = 0;
      while (i < 5 - key3Length) {
        key.push(`3n${i + 1}`);
        i++;
      }
      myKeys.push(key);
    }
    let random = Math.floor(Math.random() * myKeys.length);
    let row = myKeys[random];
    row.sort().reverse();
    let numToRemove = Math.floor(Math.random() * row.length) + 1;
    let start = row[0].charAt(2);
    let rowNumber = row[0].charAt(0);
    let i = 1;
    while (i <= numToRemove) {
      pebbles[`${rowNumber}n${start - i + 1}`] = "disappear";
      i++;
    }
    this.setState({
      pebbles: pebbles,
      orderTurn: this.state.orderTurn,
      isComputerTurn: false
    });
  };

  computerRemoveNimStones = (numToRemove, rowNumber, rowLength) => {
    let myKeys = [];
    if (rowNumber === 1) {
      if (rowLength === 0) {
        myKeys.push("1n1", "1n2", "1n3");
      } else if (rowLength <= 3) {
        // let key = [];
        let i = 0;
        while (i < rowLength) {
          myKeys.push(`1n${i + 1}`);
          i++;
        }
        // myKeys.push(key)
      }
    } else if (rowNumber === 2) {
      if (rowLength === 0) {
        myKeys.push("2n1", "2n2", "2n3", "2n4");
      } else if (rowLength <= 4) {
        // let key = [];
        let i = 0;
        while (i < rowLength) {
          myKeys.push(`2n${i + 1}`);
          i++;
        }
        // myKeys.push(key)
      }
    } else if (rowNumber === 3) {
      if (rowLength === 0) {
        myKeys.push("3n1", "3n2", "3n3", "3n4", "3n5");
      } else if (rowLength <= 5) {
        // let key = [];
        let i = 0;
        while (i < rowLength) {
          myKeys.push(`3n${i + 1}`);
          i++;
        }
        // myKeys.push(key)
      }
    }
    const pebbles = {
      ...this.state.pebbles
    };
    myKeys.sort().reverse();
    let start = myKeys[0].charAt(2);
    let i = 1;
    while (i <= numToRemove) {
      pebbles[`${rowNumber}n${start - i + 1}`] = "disappear";
      i++;
    }
    this.setState({
      pebbles: pebbles,
      orderTurn: this.state.orderTurn,
      isComputerTurn: false
    });
  };

  removeNimStones = (event, id, startIndex, row, endIndex) => {
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
          orderTurn: !this.state.orderTurn,
          isComputerTurn: true
        });
      } else {
        this.setState({ pebbles: pebbles, orderTurn: !this.state.orderTurn });
      }
    }
  };

  isNimWin = () => {
    const length = Object.keys(this.state.pebbles).length;
    if (length === this.state.nimWinNumber) {
      // this.setState({gameOver: true})
      return true;
    }
  };

  nimAi = () => {
    if (this.state.isComputerTurn && !this.state.gameOver) {
      const numberOfRows = 3;
      // Converting all lengths to binary
      const keys = Object.keys(this.state.pebbles);
      const key1 = keys.filter(key => key[0] === `1`);
      const key2 = keys.filter(key => key[0] === `2`);
      const key3 = keys.filter(key => key[0] === `3`);

      const key1Length = 3 - key1.length;
      const key2Length = 4 - key2.length;
      const key3Length = 5 - key3.length;
      let binary1 = key1Length.toString(2);
      let binary2 = key2Length.toString(2);
      let binary3 = key3Length.toString(2);

      const length1 = binary1.length;
      const length2 = binary2.length;
      const length3 = binary3.length;
      let changingRow = ":(";

      if (
        key1Length !== 0 &&
        key2Length + key3Length === 0 &&
        key1Length !== 1
      ) {
        this.computerRemoveNimStones(key1Length - 1, 1, key1Length);
      } else if (
        key2Length !== 0 &&
        key1Length + key3Length === 0 &&
        key2Length !== 1
      ) {
        this.computerRemoveNimStones(key2Length - 1, 2, key2Length);
      } else if (
        key3Length !== 0 &&
        key2Length + key1Length === 0 &&
        key3Length !== 1
      ) {
        this.computerRemoveNimStones(key3Length - 1, 3, key3Length);
        //  STILL NEED TO ACCOUNT FOR A BUNCH IN ONE ROW AND ONLY 1 IN ANOTHER
      } else if (
        key1Length !== 0 &&
        key2Length + key3Length === 1 &&
        key1Length !== 1
      ) {
        this.computerRemoveNimStones(key1Length, 1, key1Length);
      } else if (
        key2Length !== 0 &&
        key1Length + key3Length === 1 &&
        key2Length !== 1
      ) {
        this.computerRemoveNimStones(key2Length, 2, key2Length);
      } else if (
        key3Length !== 0 &&
        key2Length + key1Length === 1 &&
        key3Length !== 1
      ) {
        this.computerRemoveNimStones(key3Length, 3, key3Length);
      } else {
        // changing row is the row that we must take from
        window.setTimeout(3000);
        if (keys.length === 11) {
          this.computerRandomMove(key1, key2, key3);
        } else if (keys.length >= 6) {
          if (length1 === 1) {
            binary1 = "00" + binary1;
          } else if (length1 === 2) {
            binary1 = "0" + binary1;
          }
          if (length2 === 1) {
            binary2 = "00" + binary2;
          } else if (length2 === 2) {
            binary2 = "0" + binary2;
          }
          if (binary3.length === 1) {
            binary3 = "00" + binary3;
          } else if (length3 === 2) {
            binary3 = "0" + binary3;
          }
          let rowLength;
          let rowNumber;
          let i = 0;
          while (i < numberOfRows) {
            // finding which one to change
            if (
              binary1[i] === "1" &&
              (binary2[i] === "0" && binary3[i] === "0")
            ) {
              changingRow = i.toString() + "1" + binary1;
              rowLength = key1Length;
              rowNumber = 1;
              break;
            } else if (
              binary2[i] === "1" &&
              (binary1[i] === "0" && binary3[i] === "0")
            ) {
              changingRow = i.toString() + "2" + binary2;
              rowLength = key2Length;
              rowNumber = 2;
              break;
            } else if (
              binary3[i] === "1" &&
              (binary1[i] === "0" && binary2[i] === "0")
            ) {
              changingRow = i.toString() + "3" + binary3;
              rowLength = key3Length;
              rowNumber = 3;
              break;
            }
            i++;
          }
          // the first if statement means that the computer is at a disadvantage so has to go randomly
          if (changingRow === ":(") {
            this.computerRandomMove(key1, key2, key3);
          } else if (changingRow[0] === "2") {
            this.computerRemoveNimStones(1, rowNumber, rowLength);
          } else if (changingRow[0] === "1") {
            // this has the most edge cases.
            // The AI will find out if it is the last row, and if so take all but one.

            this.computerRandomMove(key1, key2, key3);
          } else if (changingRow[0] === "0") {
            if (changingRow[1] === "3" || changingRow[1] === "2") {
              if (key1Length === 1) {
                this.computerRemoveNimStones(3, rowNumber, rowLength);
              } else {
                this.computerRemoveNimStones(2, rowNumber, rowLength);
              }
            } else if (changingRow[1] === "3" || changingRow[1] === "1") {
              if (key2Length === 1) {
                this.computerRemoveNimStones(3, rowNumber, rowLength);
              } else {
                this.computerRemoveNimStones(2, rowNumber, rowLength);
              }
            } else if (changingRow[1] === "2" || changingRow[1] === "1") {
              if (key3Length === 1) {
                this.computerRemoveNimStones(3, rowNumber, rowLength);
              } else {
                this.computerRemoveNimStones(2, rowNumber, rowLength);
              }
            }
          }
        } else {
          this.computerRandomMove(key1, key2, key3);
        }
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
  };

  render() {
    let symbol = null;
    let winSymbol = null;
    let declaration = null;
    let rules = null;
    let languageButton = null;
    let nimArray = [0];
    let gameControlButton = null;

    // dynamically changes size of board
    let gameNumber = 0;
    let keys = Object.keys(this.state.squares);
    let buttonArray = (
      <div className="buttonArray">
        <span className="gameChoice">
          <img
            className="gameImage"
            src={require("./images/tictactoe.png")}
            alt="Tic Tac Toe"
          />
          <button className="symbolButton" onClick={this.chooseTicTacToe}>
            Tic Tac Toe
          </button>
        </span>
        <span className="gameChoice">
          <img
            className="gameImage"
            src={require("./images/OrderChaos.png")}
            alt="Order and Chaos"
          />
          <button className="symbolButton" onClick={this.chooseOrderChaos}>
            OrderChaos
          </button>
        </span>
        <span className="gameChoice">
          <img
            className="gameImage"
            src={require("./images/nim.png")}
            alt="Nim"
          />
          <button className="symbolButton" onClick={this.chooseNim}>
            Nim
          </button>
        </span>
      </div>
    );
    let computer;
    // Decides if X or O is moving
    if (this.state.isX) {
      symbol = "X";
      winSymbol = "O";
    } else {
      symbol = "O";
      winSymbol = "X";
    }

    // Checks whether we're playing Tic Tac Toe
    if (this.state.whichGame === chooseTicTacToe) {
      if (!this.state.isComputerPlayer) {
        computer = (
          <button className="symbolButton" onClick={this.playComputer}>
            playComputer
          </button>
        );
      }
      buttonArray = null;
      gameNumber = 3;

      rules = (
        <div>
          <h3>Tic Tac Toe:</h3>
          <p className="rulesParagraph">
            {" "}
            The players take turns putting either an "X" or "O" where they like.
            The winner is the first to get three of their symbol in a row either
            horizontally, vertically or diagonally.{" "}
          </p>
        </div>
      );
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
      if (this.state.language === zulu) {
        rules = (
          <div>
            <h3>Tic Tac Toe:</h3>
            <p className="rulesParagraph">
              {" "}
              Umdlalo uTic Tac Toe udlalwa ebhodini njengoba kuveziwe esthombeni
              ngezansi. Abadlali bathatha amathuba ngokulandelana, babhala u X
              noma u O noma ikephi ebhodini elingezansi. Umdlali owinayo okwaze
              ukubhala o X noma o O abathathu abalandelanayo ebhodini ngezansi,
              kungaba ukuthi balandelana kusukela phansi kuyaphezulu
              (okuqondile), kusukela esandleni sokunxele kuya kwesokudla
              (okuqondile) noma kucezeke.{" "}
            </p>
          </div>
        );
        languageButton = (
          <div>
            <button className="languageButton" onClick={this.toggleLanguage}>
              English
            </button>
          </div>
        );
      } else {
        rules = (
          <div>
            <h3>Tic Tac Toe:</h3>
            <p className="rulesParagraph">
              {" "}
              The players take turns putting either an "X" or "O" where they
              like. The winner is the first to get three of their symbol in a
              row either horizontally, vertically or diagonally.{" "}
            </p>
          </div>
        );
        languageButton = (
          <div>
            <button className="languageButton" onClick={this.toggleLanguage}>
              IsiZulu
            </button>
          </div>
        );
      }
      if (!this.isTttWin()) {
        declaration = <h1>{symbol}'s Turn</h1>;
        if (keys.length === 9) {
          declaration = <h1>Tie game</h1>;
        }
      }
      if (this.state.gameOver) {
        if (this.isTttWin) {
          declaration = <h1>{winSymbol} Wins!</h1>;
        }
      }

      // Checks if we're playing order and chaos
    } else if (this.state.whichGame === chooseOrderChaos) {
      if (!this.state.isComputerPlayer) {
        computer = (
          <button className="symbolButton" onClick={this.playComputer}>
            playComputer
          </button>
        );
      }
      buttonArray = (
        <div className="buttonArray">
          <button className="symbolButton" onClick={this.toggleSymbolX}>
            X
          </button>
          <button className="symbolButton" onClick={this.toggleSymbolO}>
            O
          </button>
        </div>
      );
      gameNumber = 6;

      if (
        Object.keys(this.state.squares).length === 0 ||
        this.state.gameOver ||
        Object.keys(this.state.squares).length === 36
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
      if (this.state.language === english) {
        rules = (
          <div>
            <h3>Order and Chaos:</h3>
            <p className="rulesParagraph">
              {" "}
              One player plays as Order and the other plays as Chaos. Order wins
              if they get five "X"s or "O"s in a row, and Chaos wins if they
              prevent Order from getting five in a row. Each player can put
              either an "X" or an "O" on their respective turns. They can switch
              between the two whenever they like.{" "}
            </p>
          </div>
        );
        languageButton = (
          <div>
            <button className="languageButton" onClick={this.toggleLanguage}>
              Zulu
            </button>
          </div>
        );
      } else {
        rules = (
          <div>
            <h3>Order and Chaos:</h3>
            <p className="rulesParagraph">
              Umdlalo u order and Chaos udlalwa ebhodini eliphindaphindeke
              ngokwesithupha ngokwesithupha njengoba kuveziwe esithombeni
              ngezansi. Umdlali wokuqala udlala engu Order umdlali wesibili
              udlala engu Chaos. U Order uwina uma ekwaze ukulandelanisa o X
              noma o O abayisihlanu ebhodini besekuthi u Chaos uwina uma ekwaze
              ukuvimba u Order ukuthi alandelanise o X noma o O abayisihlanu.
              Umdlali emunye angadlala ngo X noma ngo O. bangashintsha shintsha
              phakathi kokubili ngokuthanda kwabo.{" "}
            </p>
          </div>
        );
        languageButton = (
          <div>
            <button className="languageButton" onClick={this.toggleLanguage}>
              English
            </button>
          </div>
        );
      }
      let player;
      if (this.state.orderTurn) {
        player = "Order";
      } else {
        player = "Chaos";
      }
      let keys = Object.keys(this.state.squares);
      if (this.isOrderChaosWin()) {
        declaration = <h1> Order Wins! </h1>;
      } else if (keys.length === 36) {
        declaration = <h1> Chaos Wins! </h1>;
      } else {
        declaration = (
          <h1>
            {player}'s Turn. Symbol: {symbol}
          </h1>
        );
      }
    } else if (this.state.whichGame === chooseNim) {
      if (!this.state.isComputerPlayer) {
        computer = (
          <button className="symbolButton" onClick={this.playComputer}>
            playComputer
          </button>
        );
      }
      buttonArray = null;
      nimArray = [3, 4, 5];
      let player;
      if (this.state.language === english) {
        rules = (
          <div>
            <h3>Nim:</h3>
            <p className="rulesParagraph">
              {" "}
              Nim is played with a set of 12 counters. You place them in three
              groups as pictured: Each player takes turns removing as many
              counters as they like from one group. They can take as many as
              they like provided they all come from the same group. The player
              who takes the last counter loses. The game can be adjusted by
              adding more or less counters to each pile or adding more piles.{" "}
            </p>
          </div>
        );
        languageButton = (
          <div>
            <button className="languageButton" onClick={this.toggleLanguage}>
              IsiZulu
            </button>
          </div>
        );
      } else {
        rules = (
          <div>
            <h3>Nim:</h3>
            <p className="rulesParagraph">
              {" "}
              UNim udlalwa ngezinkomo ezingu12. Zibekwa zibe ngamaqoqo
              amathathu, njengasesithombeni. Umdlali, ngethuba lakhe, angathatha
              nom izinkomo ezingaki, kodwa eqoqweni elilodwa. Umdlali othatha
              inkomo yokugcina uyena ohlulwayo. Lomdlalo ungashintshwa ngokwenza
              amaqoqo abe maningi, noma ngokwenza izinkomo zibe ningi noma ncane
              ngeqoqo ngalinye.{" "}
            </p>
          </div>
        );
        languageButton = (
          <div>
            <button className="languageButton" onClick={this.toggleLanguage}>
              English
            </button>
          </div>
        );
      }

      if (
        Object.keys(this.state.pebbles).length === 0 ||
        Object.keys(this.state.pebbles).length === 12
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

      if (this.state.orderTurn) {
        player = "Player 1";
      } else {
        player = "Player 2";
      }
      if (this.isNimWin()) {
        declaration = <h1>{player} wins!</h1>;
      } else {
        declaration = <h1>{player}'s Turn</h1>;
      }
    }
    return (
      <div className="App">
        <div className="grid">
          <div className="header">
            <img
              src={require("./images/UnizuluLogo.png")}
              className="logo"
              alt="Unizulu Logo"
            />
            <button className="homeButton" onClick={this.goHomeScreen}>
              Go home
            </button>
          </div>
          <div className="rules">
            {languageButton}
            {rules}
          </div>
          <div className="content">
            {declaration}
            {/* {this.buildNim(nimArray)}
            {this.renderSq(gameNumber)} */}
            <TicTacToeGame />
            {buttonArray}
          </div>
          {/* <div className="rules">{gameControlButton}</div> */}
        </div>
      </div>
    );
  }
}

export default App;
