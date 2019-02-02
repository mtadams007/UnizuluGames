import React from "react";

import PebbleGame from "../PebbleGame/PebbleGame";
import { win } from "../../Utils/Constants";

// import "./NimGame.css";

class NimGame extends PebbleGame {
  state = {
    pebbles: {},
    nimWinNumber: 12,
    gameOver: false,
    isComputerPlayer: false,
    isComputerTurn: false,
    orderTurn: true
  };

  componentDidUpdate = () => {
    this.isWin();
    if (!this.state.gameOver) {
      window.setTimeout(this.ai, 300);
    }
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
        let i = 0;
        while (i < rowLength) {
          myKeys.push(`1n${i + 1}`);
          i++;
        }
      }
    } else if (rowNumber === 2) {
      if (rowLength === 0) {
        myKeys.push("2n1", "2n2", "2n3", "2n4");
      } else if (rowLength <= 4) {
        let i = 0;
        while (i < rowLength) {
          myKeys.push(`2n${i + 1}`);
          i++;
        }
      }
    } else if (rowNumber === 3) {
      if (rowLength === 0) {
        myKeys.push("3n1", "3n2", "3n3", "3n4", "3n5");
      } else if (rowLength <= 5) {
        let i = 0;
        while (i < rowLength) {
          myKeys.push(`3n${i + 1}`);
          i++;
        }
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

  isWin = () => {
    const length = Object.keys(this.state.pebbles).length;
    if (length === this.state.nimWinNumber && !this.state.gameOver) {
      this.setState({ gameOver: true });
      return true;
    }
  };

  ai = () => {
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
    let gameControlButton = null;
    let computer;
    let buttonArray;
    let declaration;
    if (!this.state.isComputerPlayer) {
      computer = (
        <button className="symbolButton" onClick={this.playComputer}>
          playComputer
        </button>
      );
    }
    const nimArray = [3, 4, 5];
    let player;

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
    if (this.isWin()) {
      declaration = <h1>wins!</h1>;
    } else {
      declaration = <h1>'s Turn</h1>;
    }

    return (
      <div className="gameGrid">
        <div>
          {declaration}
          {this.buildNim(nimArray)}
        </div>
        <div>{gameControlButton}</div>
      </div>
    );
  }
}

export default NimGame;
