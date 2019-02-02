import React, { Component } from "react";

import Pebble from "./Games/GamePieces/Pebble/Pebble";
import TicTacToeGame from "./Games/TicTacToeGame/TicTacToeGame";
import OrderAndChaosGame from "./Games/OrderAndChaosGame/OrderAndChaosGame";
import "./App.css";
import {
  win,
  chooseTicTacToe,
  chooseOrderChaos,
  chooseNim,
  english,
  zulu
} from "./Utils/Constants";
import {
  ticTacToeEnglishRules,
  ticTacToeZuluRules,
  orderChaosEnglishRules,
  orderChaosZuluRules,
  nimEnglishRules,
  nimZuluRules
} from "./Utils/Descriptions";

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

  toggleLanguage = () => {
    if (this.state.language === english) {
      this.setState({ language: zulu });
    } else {
      this.setState({ language: english });
    }
  };

  // puts a mark down when you click for tic tac toe or order and chaos

  // Toggling symbols in order and chaos

  toggleSymbolX = () => {
    this.setState({ isX: true });
  };

  toggleSymbolO = () => {
    this.setState({ isX: false });
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
    let content = (
      <div className="chooseGame">
        <div>
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
      content = <TicTacToeGame />;
      if (!this.state.isComputerPlayer) {
        computer = (
          <button className="symbolButton" onClick={this.playComputer}>
            playComputer
          </button>
        );
      }

      rules = (
        <div>
          <h3>Tic Tac Toe:</h3>
          <p className="rulesParagraph">{ticTacToeEnglishRules}</p>
        </div>
      );
      if (this.state.language === zulu) {
        rules = (
          <div>
            <h3>Tic Tac Toe:</h3>
            <p className="rulesParagraph">{ticTacToeZuluRules}</p>
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
            <p className="rulesParagraph">{ticTacToeEnglishRules}</p>
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

      // Checks if we're playing order and chaos
    } else if (this.state.whichGame === chooseOrderChaos) {
      content = <OrderAndChaosGame />;

      if (this.state.language === english) {
        rules = (
          <div>
            <h3>Order and Chaos:</h3>
            <p className="rulesParagraph">{orderChaosEnglishRules}</p>
          </div>
        );
        languageButton = (
          <div>
            <button className="languageButton" onClick={this.toggleLanguage}>
              isiZulu
            </button>
          </div>
        );
      } else {
        rules = (
          <div>
            <h3>Order and Chaos:</h3>
            <p className="rulesParagraph">{orderChaosZuluRules}</p>
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
    } else if (this.state.whichGame === chooseNim) {
      if (!this.state.isComputerPlayer) {
        computer = (
          <button className="symbolButton" onClick={this.playComputer}>
            playComputer
          </button>
        );
      }

      nimArray = [3, 4, 5];
      let player;
      if (this.state.language === english) {
        rules = (
          <div>
            <h3>Nim:</h3>
            <p className="rulesParagraph">{nimEnglishRules}</p>
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
            <p className="rulesParagraph">{nimZuluRules}</p>
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
            {/* {declaration} */}
            {/* {this.buildNim(nimArray)}
            {this.renderSq(gameNumber)} */}
            {content}
          </div>
          {/* <div className="rules">{gameControlButton}</div> */}
        </div>
      </div>
    );
  }
}

export default App;
