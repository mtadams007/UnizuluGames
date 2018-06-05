import React, { Component } from 'react';
import Square from './Square/Square'
import Pebble from './Pebble/Pebble'
import './App.css';

class App extends Component {
  state = {
    squares: {
    },
    pebbles: {
    },
    isX: true,
    gameOver: false,
    whichGame: '',
    // whichGame: 'TicTacToe',
    orderTurn: true,
    language: 'eng',
    nimWinNumber: 12,
    isComputerPlayer: false,
    isComputerTurn: false,
  }

  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (!this.state.gameOver) {
      if (this.state.whichGame === 'TicTacToe' && Object.keys(this.state.squares).length < 9) {
      window.setTimeout(this.ticTacToeAi, 300)
      } else if (this.state.whichGame === 'OrderChaos' && Object.keys(this.state.squares).length !=36) {
      window.setTimeout(this.orderChaosAi, 300)
      }
    }
  }

  // Basic navigation

  goHomeScreen = () => {
    this.setState({squares: '', isX: true, gameOver: false, whichGame: '', orderTurn: true, pebbles:{}})
  }

  resetGame = () => {
    let elements = document.getElementsByClassName("win");
    let length = elements.length
    let i = 0;
    while (i<length){
      elements[0].classList.remove("win");
      i++;
    }
    this.setState({squares: '', isX: true, gameOver: false, orderTurn: true, pebbles: {}, isComputerTurn: false})
    return true;
  }

  chooseTicTacToe = () => {
    console.log(this.state.whichGame)
    this.setState({whichGame: 'TicTacToe'})
  }

  chooseNim = () => {
    this.setState({whichGame: 'Nim'})
  }

  chooseOrderChaos = () => {
    console.log(this.state.whichGame)
    this.setState({whichGame: 'OrderChaos'})
  }

  toggleLanguage = () => {
    if (this.state.language === 'eng') {
      this.setState({language: 'zulu'})
    } else {
      this.setState({language: 'eng'})
    }
  }

  // puts a mark down when you click for tic tac toe or order and chaos

  makeMoveHandler = (event, id) => {
    if (!this.state.isComputerTurn) {
      if (!this.state.gameOver) {
      // Checks whether the move has already been put in the state.squares hash
        if(this.state.squares[id]){
          console.log('filled');
        } else {
          // checks whether or not it is Xs turn
          if(this.state.isX === true){
          // assigns a new object and manipulates it
            const squares = {
              ...this.state.squares, [id]: 'X'
            }
            if (this.state.isComputerPlayer === true) {
              this.setState({squares: squares, isX: false, orderTurn: !this.state.orderTurn, isComputerTurn: true})
            } else {
              this.setState({squares: squares, isX: false, orderTurn: !this.state.orderTurn})
            }
          } else {
            if (this.state.isComputerPlayer === true) {
            const squares = {
              ...this.state.squares, [id]: 'O'
            }
            this.setState({squares: squares, isX: true, orderTurn: !this.state.orderTurn, isComputerTurn: true})
          } else {
          const squares = {
            ...this.state.squares, [id]: 'O'
          }
          this.setState({squares: squares, isX: true, orderTurn: !this.state.orderTurn})
        }
      }
    }
      }
    }
  }

  // Tic Tac Toe win checker

  isTttWin = () => {

    let keys = (Object.keys(this.state.squares));
    let key = keys.slice(-1)[0];
    let winningSymbol = (this.state.squares[key])
    let test = String(key)
    let parsedArray = test.split('a');
    let xCoord = parseInt(parsedArray[0], 10);
    let yCoord = parseInt(parsedArray[1], 10);
    let answer = false;
    if (this.state.gameOver === false){
      //Looking for horizontal victories
      if(keys.includes(`${xCoord}a${(yCoord+1)%3+1}`) && keys.includes(`${xCoord}a${(yCoord+2)%3+1}`)){
        if(this.state.squares[`${xCoord}a${(yCoord+1)%3+1}`]===this.state.squares[`${xCoord}a${(yCoord+2)%3+1}`] && this.state.squares[`${xCoord}a${(yCoord%3)+1}`] === winningSymbol){
          let element1 = document.getElementById(`${xCoord}a${(yCoord+1)%3+1}`);
          let element2 = document.getElementById(`${xCoord}a${(yCoord+2)%3+1}`);
          let element3 = document.getElementById(`${xCoord}a${yCoord%3+1}`);
          element1.classList.add("win");
          element2.classList.add("win");
          element3.classList.add("win");
          this.setState({gameOver: true})
          answer = true
        }
      }
      // Checks vertical victories
      if(keys.includes(`${(xCoord+1)%3+1}a${yCoord}`) && keys.includes(`${(xCoord+2)%3+1}a${yCoord}`)){
        if(this.state.squares[`${(xCoord+1)%3+1}a${yCoord}`]===this.state.squares[`${(xCoord+2)%3+1}a${yCoord}`] && this.state.squares[`${(xCoord%3)+1}a${yCoord}`] === winningSymbol){
          let element1 = document.getElementById(`${(xCoord+1)%3+1}a${yCoord}`);
          let element2 = document.getElementById(`${(xCoord+2)%3+1}a${yCoord}`);
          let element3 = document.getElementById(`${(xCoord%3)+1}a${yCoord}`);
          element1.classList.add("win");
          element2.classList.add("win");
          element3.classList.add("win");
          this.setState({gameOver: true})
          answer = true
        }
      }
      if (xCoord === yCoord) {
        if(this.state.squares[`${(xCoord%3)+1}a${(yCoord%3)+1}`]===this.state.squares[`${(xCoord%3)+2}a${(yCoord%3)+2}`] && this.state.squares[`${(xCoord%3)+2}a${(yCoord%3)+2}`]===winningSymbol){
          let element1 = document.getElementById(`${(xCoord%3)+1}a${(yCoord%3)+1}`);
          let element2 = document.getElementById(`${(xCoord%3)+2}a${(yCoord%3)+2}`);
          let element3 = document.getElementById(`${xCoord}a${yCoord}`);
          element1.classList.add("win");
          element2.classList.add("win");
          element3.classList.add("win");
          this.setState({gameOver: true})
          answer = true
        }
      }
      if (xCoord+yCoord === 4){
        if(this.state.squares[`${((xCoord)%3)+1}a${((yCoord+1)%3)+1}`] === this.state.squares[`${((xCoord+1)%3)+1}a${((yCoord)%3)+1}`] &&
           this.state.squares[`${((xCoord+1)%3)+1}a${((yCoord)%3)+1}`] === winningSymbol){
           let element1 = document.getElementById(`${((xCoord)%3)+1}a${((yCoord+1)%3)+1}`);
           let element2 = document.getElementById(`${((xCoord+1)%3)+1}a${((yCoord)%3)+1}`);
           let element3 = document.getElementById(`${xCoord}a${yCoord}`);
           element1.classList.add("win");
           element2.classList.add("win");
           element3.classList.add("win");
           this.setState({gameOver: true})
           answer = true
        }
      }
    }
    if (answer === true) {
      console.log(answer)
      return true;
    }
  }

  // Checks horizontal and vertical spots whether there are two similar pieces in a row

  ticTacToeFilterMe = (directionNumber, numberOfRow, arrayToFilter, gameNumber) => {
    // filtering either the row or column, directionNumber is 0 for horiontal, so the key calls the xCoordinate, otherwise 2 for vertical
    const valueArray = arrayToFilter.filter(key => key[directionNumber] === `${numberOfRow}`)
    // gameNumber is how long a row we're checking for. In this case it is 2
    if (valueArray.length === gameNumber && this.state.squares[valueArray[0]]===this.state.squares[valueArray[1]]) {
      let key1 = String(valueArray[0]);
      let key2 = String(valueArray[1]);
      let key1Parsed = key1.split('a');
      let key2Parsed = key2.split('a');
      let firstYCoord = parseInt(key1Parsed[1], 10);
      let secondYCoord = parseInt(key2Parsed[1], 10);
      //the winning coordinate is the difference between double the list minus the last two added two together
      let winningYCoord = 6-(firstYCoord+secondYCoord);
      let firstXCoord = parseInt(key1Parsed[0], 10);
      let secondXCoord = parseInt(key2Parsed[0], 10);
      let winningXCoord = 6-(firstXCoord+secondXCoord);
      let move = '';
      // Confusing use of ternary here, but if the two in a row are NOT the current player's turn, it gets pushed to the danger array, otherwise computer will win here.
      if (this.state.squares[valueArray[0]] === (this.state.isX ? "O" : "X")) {
      console.log('in danger array spot')

        if (directionNumber === 0) {
          move =`${numberOfRow}a${winningYCoord}`
        } else {
          move = `${winningXCoord}a${numberOfRow}`;
        }
        return move;
        // if directionNumber is 0, then we make the horizontal victory
      } else if (directionNumber === 0) {
      console.log('not in danger zone')
        let squares = {
          ...this.state.squares, [`${numberOfRow}a${winningYCoord}`]: `${this.state.isX ? "X" : "O"}`
        }
        this.setState({squares: squares, isComputerTurn: false})
        return ("VICTORY")
    } else {
      let squares = {
        ...this.state.squares, [`${winningXCoord}a${numberOfRow}`]: `${this.state.isX ? "X" : "O"}`
      }
      this.setState({squares: squares, isComputerTurn: false})
      return ("VICTORY")
    }

    }
  }

  ticTacToeDiagonalCheckerOne = (arrayToFilter) => {
    const valueArray = arrayToFilter.filter(key => key[0] === key[2])
    if (valueArray.length === 2 && this.state.squares[valueArray[0]]===this.state.squares[valueArray[1]]){
      let key1 = String(valueArray[0]);
      let key2 = String(valueArray[1]);
      let key1Parsed = key1.split('a');
      let key2Parsed = key2.split('a');
      let firstCoord = parseInt(key1Parsed[0], 10);
      let secondCoord = parseInt(key2Parsed[1], 10);
      let winningCoord = 6-(firstCoord+secondCoord);
      let move = '';
      if (this.state.squares[valueArray[0]] === (this.state.isX ? "O" : "X")){
        move = `${winningCoord}a${winningCoord}`
        return move;
      } else {
        let squares = {
          ...this.state.squares, [`${winningCoord}a${winningCoord}`]: `${this.state.isX ? "X" : "O"}`
        }
        this.setState({squares: squares, isComputerTurn: false})
        return ("VICTORY")
      }
    }
  }

  // Checks all the moves for the AI

  ticTacToeBlockChecker = () => {
    let keys = (Object.keys(this.state.squares));
    let arrayToCheck = [];
    // let length = keys.length;
    let i=1;
    while (i<4) {
      const row = this.ticTacToeFilterMe(0,i,keys,2);
      const column = this.ticTacToeFilterMe(2,i,keys,2);
      if (row) {
        arrayToCheck.push(row);
      }
      if (column) {
        arrayToCheck.push(column);
      }
      // column.push(arrayToCheck);
      i++;
    }
    let option = this.ticTacToeDiagonalCheckerOne(keys)
    let option2 = this.ticTacToeDiagonalCheckerTwo(keys)
    if (option) {
      arrayToCheck.push(option)
    }
    if (option2) {
      arrayToCheck.push(option2)
    }
    return arrayToCheck;
  }

  ticTacToeDiagonalCheckerTwo = (arrayToFilter) => {
    const valueArray = arrayToFilter.filter(key => parseInt(key[0], 10) + parseInt(key[2],10)===4)

    if (valueArray.length === 2 && this.state.squares[valueArray[0]]===this.state.squares[valueArray[1]]){
      let key1 = String(valueArray[0]);
      let key2 = String(valueArray[1]);
      let key1Parsed = key1.split('a');
      let key2Parsed = key2.split('a');
      let firstYCoord = parseInt(key1Parsed[1], 10);
      let secondYCoord = parseInt(key2Parsed[1], 10);
      let winningYCoord = 6-(firstYCoord+secondYCoord);
      let firstXCoord = parseInt(key1Parsed[0], 10);
      let secondXCoord = parseInt(key2Parsed[0], 10);
      let winningXCoord = 6-(firstXCoord+secondXCoord);
      let move = '';
      if (this.state.squares[valueArray[0]] === (this.state.isX ? "O" : "X")){
        move = `${winningXCoord}a${winningYCoord}`
        return move;
      } else {
        let squares = {
          ...this.state.squares, [`${winningXCoord}a${winningYCoord}`]: `${this.state.isX ? "X" : "O"}`
        }
        this.setState({squares: squares, isComputerTurn: false})
        return ("VICTORY")
      }
    }
  }

  // AI is purposefully not supposed to be unbeatable, but challenging. It trys to win first, then prevent the other player from winning, and finally goes randomly if neither of the first two

  ticTacToeAi = () => {
    if (this.state.isComputerTurn && !this.state.gameOver) {
      console.log('computer turn')
      const symbol = (this.state.isX ? "X" : "O")
      let options =[];
      console.log(options)
      let isX = this.state.isX;
      //returns danger array from places we might need to block
      const dangerArray = this.ticTacToeBlockChecker();
      // if we already won, then don't worry about moving again
      let victoryCheck = dangerArray.filter(win => win === "VICTORY")
      if (victoryCheck.length != 0) {
        return;
      }
      if (dangerArray.length != 0) {
        const squares = {
          ...this.state.squares, [`${dangerArray[0]}`]: `${this.state.isX ? "X" : "O"}`
        }
        this.setState({squares: squares, isX: !isX, isComputerTurn: false})
      } else {

        let keys = (Object.keys(this.state.squares));
        for(let j = 1; j<4; j++) {
          for (let i = 1; i<4; i++) {
            options.push(`${j}a${i}`);
          }
        }
        let length = keys.length;
        //k is the array number for options

        for (let k = 0; k<keys.length; k++) {
        //m is the array number for keys length
          for (let m=0; m<9; m++){
            if (keys[k] === options[m]){
              options.splice(m,1);
              break;
            }
          }
        }
        let randomSelector = 9 - length;

        console.log(options)
        let number = Math.floor((Math.random())*randomSelector);
        const squares = {
          ...this.state.squares, [`${options[number]}`]: `${this.state.isX ? "X" : "O"}`
        }
        this.setState({squares: squares, isX: !isX, isComputerTurn: false})
        // return;
      }
    }
  }

  // Order and Chaos Checkers

  orderChaosHorizontalVerticalChecker = (directionNumber, numberOfRow, arrayToFilter) => {
    // the valueArray is checking how many keys are in a row
    const valueArray = arrayToFilter.filter(key => key[directionNumber] === `${numberOfRow}`)
    let arrayLength = valueArray.length;
    // checking if the length is equal to 4, then we need to check if there are 4 of a kind in a row and need to block or think about blocking 3 in a row

    if (arrayLength === 5) {
      let blockingMove = ''
      let str = ''
      let i = 1;
        // checks if we're checking horizontal or not

        if (directionNumber === 0) {
        while (i<7) {
          if (this.state.squares[`${numberOfRow}a${i}`]) {
            str += (this.state.squares[`${numberOfRow}a${i}`])
          } else {
            blockingMove = `${numberOfRow}a${i}`
          }
          i++;
        }
        if (str.includes('XXXXX')) {
          const squares = {
            ...this.state.squares, [blockingMove]: 'O'
          }
          this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          return "STOP"
        } else if (str.includes('OOOOO')) {
          const squares = {
            ...this.state.squares, [blockingMove]: 'X'
          }
          this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          return "STOP"
        } else if (str === ('XXXXO')) {
          if (blockingMove != `${numberOfRow}a6`) {
            const squares = {
              ...this.state.squares, [blockingMove]: 'O'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        } else if (str === ('OOOOX')) {
          if (blockingMove != `${numberOfRow}a6`) {
            const squares = {
              ...this.state.squares, [blockingMove]: 'X'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        } else if (str === ('OXXXX')) {
          if (blockingMove != `${numberOfRow}a1`) {
            const squares = {
              ...this.state.squares, [blockingMove]: 'O'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        } else if (str === ('XOOOO')) {
          if (blockingMove != `${numberOfRow}a1`) {
            const squares = {
              ...this.state.squares, [blockingMove]: 'X'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        }

        // vertical check
      } else if (directionNumber === 2) {
        while (i<7) {
          if (this.state.squares[`${i}a${numberOfRow}`]) {
            str += (this.state.squares[`${i}a${numberOfRow}`])
          } else {
            blockingMove = `${i}a${numberOfRow}`
          }
          i++;
        }
        if (str.includes('XXXXX')) {
          const squares = {
            ...this.state.squares, [blockingMove]: 'O'
          }
          this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          return "STOP"
        } else if (str.includes('OOOOO')) {
          const squares = {
            ...this.state.squares, [blockingMove]: 'X'
          }
          this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          return "STOP"
        } else if (str === ('XXXXO')) {
          if (blockingMove != `6a${numberOfRow}`) {
            const squares = {
              ...this.state.squares, [blockingMove]: 'O'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        } else if (str === ('OOOOX')) {
          if (blockingMove != `6a${numberOfRow}`) {
            const squares = {
              ...this.state.squares, [blockingMove]: 'X'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        } else if (str === ('OXXXX')) {
          if (blockingMove != `1a${numberOfRow}`) {
            const squares = {
              ...this.state.squares, [blockingMove]: 'O'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        } else if (str === ('XOOOO')) {
          if (blockingMove != `1a${numberOfRow}`) {
            const squares = {
              ...this.state.squares, [blockingMove]: 'X'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        }
      }
    } else if (arrayLength === 4) {
      let blockingMove = ''
      let str = ''
      let i = 1;
      // checking horizontal threats
      if (directionNumber === 0) {
        while (i<7) {
          if (this.state.squares[`${numberOfRow}a${i}`]) {
            str += (this.state.squares[`${numberOfRow}a${i}`])
          } else {
            blockingMove += `${numberOfRow}a${i}.`
          }
          i++;
        }
        if (str === ('XXXX')) {

          const moves = blockingMove.split('.')
          console.log(moves)
          // if the first empty space is at the beginning we have the possibility of not blocking it there, so we must block the next option
          if (moves[0] === `${numberOfRow}a1`) {
            const squares = {
              ...this.state.squares, [moves[1]]: 'O'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          } else {
            const squares = {
              ...this.state.squares, [moves[0]]: 'O'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          }
        } else if (str === ('OOOO')) {
          const moves = blockingMove.split('.')
          if (moves[0] === `${numberOfRow}a1`) {
            const squares = {
              ...this.state.squares, [moves[1]]: 'X'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          } else {
            const squares = {
              ...this.state.squares, [moves[0]]: 'X'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        } else if (str === ('XXXO')) {
          const moves = blockingMove.split('.')
          if (moves[1] != `${numberOfRow}a6`) {
            return `${moves[1]}.O`
          }
        } else if (str === ('OOOX')) {
          const moves = blockingMove.split('.')
          if (moves[1] != `${numberOfRow}a6`) {
            return `${moves[1]}.X`
          }
        } else if (str === ('OXXX')) {
          const moves = blockingMove.split('.')
          if (moves[0] != `${numberOfRow}a1`) {
            return `${moves[0]}.O`
          }
        } else if (str === ('XOOO')) {
          const moves = blockingMove.split('.')
          if (moves[0] != `${numberOfRow}a1`) {
            return `${moves[0]}.X`
          }
        }
      } if (directionNumber === 2) {
        while (i<7) {
          if (this.state.squares[`${i}a${numberOfRow}`]) {
            str += (this.state.squares[`${i}a${numberOfRow}`])
          } else {
            blockingMove += `${i}a${numberOfRow}.`
          }
          i++;
        }
        if (str === ('XXXX')) {

          const moves = blockingMove.split('.')
          // if the first empty space is at the beginning we have the possibility of not blocking it there, so we must block the next option
          if (moves[0] === `1a${numberOfRow}`) {
            const squares = {
              ...this.state.squares, [moves[1]]: 'O'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          } else {
            const squares = {
              ...this.state.squares, [moves[0]]: 'O'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        } else if (str === ('OOOO')) {
          const moves = blockingMove.split('.')
          if (moves[0] === `1a${numberOfRow}`) {
            const squares = {
              ...this.state.squares, [moves[1]]: 'X'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          } else {
            const squares = {
              ...this.state.squares, [moves[0]]: 'X'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        } else if (str === ('XXXO')) {
          const moves = blockingMove.split('.')
          if (moves[1] != `6a${numberOfRow}`) {
            return `${moves[1]}.O`
          }
        } else if (str === ('OOOX')) {
          const moves = blockingMove.split('.')
          if (moves[1] != `6a${numberOfRow}`) {
            return `${moves[1]}.X`
          }
        } else if (str === ('OXXX')) {
          const moves = blockingMove.split('.')
          if (moves[0] != `1a${numberOfRow}`) {
            return `${moves[0]}.O`
          }
        } else if (str === ('XOOO')) {
          const moves = blockingMove.split('.')
          if (moves[0] != `1a${numberOfRow}`) {
            return `${moves[0]}.X`
          }
        }
      }

    } else if (arrayLength === 3) {
      let blockingMove = ''
      let str = ''
      let i = 1;
      // checking horizontal threats
      if (directionNumber === 0) {
        while (i<7) {
          if (this.state.squares[`${numberOfRow}a${i}`]) {
            str += (this.state.squares[`${numberOfRow}a${i}`])
          } else {
            blockingMove += `${numberOfRow}a${i}.`
          }
          i++;
        }
        if (str === 'XXX') {
          let moves = blockingMove.split('.')
          return `${moves[1]}.O`
        } else if (str === 'OOO') {
          let moves = blockingMove.split('.')
          return `${moves[1]}.X`
        }
      } else if (directionNumber === 2) {
        while (i<7) {
          if (this.state.squares[`${i}a${numberOfRow}`]) {
            str += (this.state.squares[`${i}a${numberOfRow}`])
          } else {
            blockingMove += `${i}a${numberOfRow}.`
          }
          i++;
        }
        if (str === 'XXX') {
          let moves = blockingMove.split('.')
          console.log(`${moves[1]}.O`)
          return `${moves[1]}.O`
        } else if (str === 'OOO') {
          let moves = blockingMove.split('.')
          return `${moves[1]}.X`
        }
      }
    }
  }

  orderChaosEasyDiagonalAiChecker = (arrayToFilter) => {
    // are the x coordinate and y coordinate the same
    const valueArray = arrayToFilter.filter(key => key[0] === key[2])
    let arrayLength = valueArray.length;
    // checking if the length is equal to 5, then we need to check if there are 4 of a kind in a row and need to block or think about blocking 3 in a row

    if (arrayLength === 5) {
      let blockingMove = ''
      let str = ''
      let i = 1;
      while (i<7) {
        if (this.state.squares[`${i}a${i}`]) {
          str += (this.state.squares[`${i}a${i}`])
        } else {
          blockingMove = `${i}a${i}`
        }
        i++;
      }
      if (str.includes('XXXXX')) {
        const squares = {
          ...this.state.squares, [blockingMove]: 'O'
        }
        this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
        return "STOP"
      } else if (str.includes('OOOOO')) {
        const squares = {
          ...this.state.squares, [blockingMove]: 'X'
        }
        this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
        return "STOP"
      } else if (str === ('XXXXO')) {
        if (blockingMove != `6a6`) {
          const squares = {
            ...this.state.squares, [blockingMove]: 'O'
          }
          this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          return "STOP"
        }
      } else if (str === ('OOOOX')) {
        if (blockingMove != `6a6`) {
          const squares = {
            ...this.state.squares, [blockingMove]: 'X'
          }
          this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          return "STOP"
        }
      } else if (str === ('OXXXX')) {
        if (blockingMove != `1a1`) {
          const squares = {
            ...this.state.squares, [blockingMove]: 'O'
          }
          this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          return "STOP"
        }
      } else if (str === ('XOOOO')) {
        if (blockingMove != `1a1`) {
          const squares = {
            ...this.state.squares, [blockingMove]: 'X'
          }
          this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          return "STOP"
        }
      }
      console.log(blockingMove)
      console.log(str)
    } else if (arrayLength === 4) {
      let blockingMove = ''
      let str = ''
      let i = 1;
      while (i<7) {
        if (this.state.squares[`${i}a${i}`]) {
          str += (this.state.squares[`${i}a${i}`])
        } else {
          blockingMove += `${i}a${i}.`
        }
        i++;
      }
      if (str === ('XXXX')) {

        const moves = blockingMove.split('.')
        console.log(moves)
        // if the first empty space is at the beginning we have the possibility of not blocking it there, so we must block the next option
        if (moves[0] === `1a1`) {
          const squares = {
            ...this.state.squares, [moves[1]]: 'O'
          }
          this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          return "STOP"
        } else {
          const squares = {
            ...this.state.squares, [moves[0]]: 'O'
          }
          this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          return "STOP"
        }
      } else if (str === ('OOOO')) {
        const moves = blockingMove.split('.')
        if (moves[0] === `1a1`) {
          const squares = {
            ...this.state.squares, [moves[1]]: 'X'
          }
          this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          return "STOP"
        } else {
          const squares = {
            ...this.state.squares, [moves[0]]: 'X'
          }
          this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          return "STOP"
        }
      } else if (str === ('XXXO')) {
        const moves = blockingMove.split('.')
        if (moves[1] != `6a6`) {
          console.log(`${moves[1]}.O`)
          return `${moves[1]}.O`
        }
      } else if (str === ('OOOX')) {
        const moves = blockingMove.split('.')
        if (moves[1] != `6a6`) {
          console.log(`${moves[1]}.X`)
          return `${moves[1]}.X`
        }
      } else if (str === ('OXXX')) {
        const moves = blockingMove.split('.')
        if (moves[0] != `1a1`) {
          console.log(`${moves[0]}.O`)
          return `${moves[0]}.O`
        }
      } else if (str === ('XOOO')) {
        const moves = blockingMove.split('.')
        if (moves[0] != `1a1`) {
          console.log(`${moves[0]}.X`)
          return `${moves[0]}.X`
        }
      }
    } else if (arrayLength === 3) {
      let blockingMove = ''
      let str = ''
      let i = 1;
      // checking horizontal threats

        while (i<7) {
          if (this.state.squares[`${i}a${i}`]) {
            str += (this.state.squares[`${i}a${i}`])
          } else {
            blockingMove += `${i}a${i}.`
          }
          i++;
        }
        if (str === 'XXX') {
          let moves = blockingMove.split('.')
          return `${moves[1]}.O`
        } else if (str === 'OOO') {
          let moves = blockingMove.split('.')
          return `${moves[1]}.X`
      }
    }
  }

  orderChaosMediumDiagonalAiChecker = (arrayToFilter, sum) => {
    // are the x coordinate and y coordinate the same
    const valueArray = arrayToFilter.filter(key => parseInt(key[0], 10) + parseInt(key[2],10)===sum)
    let arrayLength = valueArray.length;
    if (sum === 6 && arrayLength === 4) {
      let str = ''
      let blockingMove = ''
      let i = 1;
      while (i<6) {
        if (this.state.squares[`${6-i}a${i}`]) {
          str += (this.state.squares[`${6-i}a${i}`])
        } else {
          blockingMove += `${6-i}a${i}`
        }
        i++;
      }
      if (str === ('XXXX')) {
        const squares = {
          ...this.state.squares, [blockingMove]: 'O'
        }
        this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
        return "STOP"
    } else if (str === ('OOOO')) {
        const squares = {
          ...this.state.squares, [blockingMove]: 'X'
        }
        this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
        return "STOP"
      }
    } else if (sum === 8 && arrayLength === 4) {
      let str = ''
      let blockingMove = ''
      let i = 1;
      while (i<6) {
        if (this.state.squares[`${7-i}a${i+1}`]) {
          str += (this.state.squares[`${7-i}a${i+1}`])
        } else {
          blockingMove += `${7-i}a${i+1}`
        }
        i++;
      }
      if (str === ('XXXX')) {
        const squares = {
          ...this.state.squares, [blockingMove]: 'O'
        }
        this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
        return "STOP"
    } else if (str === ('OOOO')) {
        const squares = {
          ...this.state.squares, [blockingMove]: 'X'
        }
        this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
        return "STOP"
      }
    } else if (sum === 7) {

      if (arrayLength === 5) {
        let blockingMove = ''
        let str = ''
        let i = 1;
        while (i<7) {
          if (this.state.squares[`${7-i}a${i}`]) {
            str += (this.state.squares[`${7-i}a${i}`])
          } else {
            blockingMove = `${7-i}a${i}`
          }
          i++;
        }
        if (str.includes('XXXXX')) {
          const squares = {
            ...this.state.squares, [blockingMove]: 'O'
          }
          this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          return "STOP"
        } else if (str.includes('OOOOO')) {
          const squares = {
            ...this.state.squares, [blockingMove]: 'X'
          }
          this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
          return "STOP"
        } else if (str === ('XXXXO')) {
          if (blockingMove != `1a6`) {
            const squares = {
              ...this.state.squares, [blockingMove]: 'O'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        } else if (str === ('OOOOX')) {
          if (blockingMove != `1a6`) {
            const squares = {
              ...this.state.squares, [blockingMove]: 'X'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        } else if (str === ('OXXXX')) {
          if (blockingMove != `6a1`) {
            const squares = {
              ...this.state.squares, [blockingMove]: 'O'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        } else if (str === ('XOOOO')) {
          if (blockingMove != `6a1`) {
            const squares = {
              ...this.state.squares, [blockingMove]: 'X'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        }
        console.log(blockingMove)
        console.log(str)
      } else if (arrayLength === 4) {
        let blockingMove = ''
        let str = ''
        let i = 1;
        while (i<7) {
          if (this.state.squares[`${7-i}a${i}`]) {
            str += (this.state.squares[`${7-i}a${i}`])
          } else {
            blockingMove += `${7-i}a${i}.`
          }
          i++;
        }
        if (str === ('XXXX')) {

          const moves = blockingMove.split('.')
          console.log(moves)
          // if the first empty space is at the beginning we have the possibility of not blocking it there, so we must block the next option
          if (moves[0] === `6a1`) {
            const squares = {
              ...this.state.squares, [moves[1]]: 'O'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          } else {
            const squares = {
              ...this.state.squares, [moves[0]]: 'O'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        } else if (str === ('OOOO')) {
          const moves = blockingMove.split('.')
          if (moves[0] === `6a1`) {
            const squares = {
              ...this.state.squares, [moves[1]]: 'X'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          } else {
            const squares = {
              ...this.state.squares, [moves[0]]: 'X'
            }
            this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
            return "STOP"
          }
        } else if (str === ('XXXO')) {
          const moves = blockingMove.split('.')
          if (moves[1] != `1a6`) {
            console.log(`${moves[1]}.O`)
            return `${moves[1]}.O`
          }
        } else if (str === ('OOOX')) {
          const moves = blockingMove.split('.')
          if (moves[1] != `1a6`) {
            console.log(`${moves[1]}.X`)
            return `${moves[1]}.X`
          }
        } else if (str === ('OXXX')) {
          const moves = blockingMove.split('.')
          if (moves[0] != `6a1`) {
            console.log(`${moves[0]}.O`)
            return `${moves[0]}.O`
          }
        } else if (str === ('XOOO')) {
          const moves = blockingMove.split('.')
          if (moves[0] != `6a1`) {
            console.log(`${moves[0]}.X`)
            return `${moves[0]}.X`
          }
        }
      } else if (arrayLength === 3) {
        let blockingMove = ''
        let str = ''
        let i = 1;
        // checking horizontal threats

          while (i<7) {
            if (this.state.squares[`${7-i}a${i}`]) {
              str += (this.state.squares[`${7-i}a${i}`])
            } else {
              blockingMove += `${7-i}a${i}.`
            }
            i++;
          }
          if (str === 'XXX') {
            let moves = blockingMove.split('.')
            return `${moves[1]}.O`
          } else if (str === 'OOO') {
            let moves = blockingMove.split('.')
            return `${moves[1]}.X`
        }
      }

    }

  }

  orderChaosHardDiagonalAiChecker = (arrayToFilter) => {
    // checking if its the first diagonal
    const valueArray = arrayToFilter.filter(key => parseInt(key[0], 10) - parseInt(key[2],10)===1)
    // checking which diagonal is bigger
    const valueArray2 = arrayToFilter.filter(key => parseInt(key[2], 10) - parseInt(key[0],10)===1)
    let arrayLength = valueArray.length;
    let arrayLength2 = valueArray2.length;
    if (arrayLength === 4) {
      let str = ''
      let blockingMove = ''
      let i = 1;
      while (i<6) {
        if (this.state.squares[`${i+1}a${i}`]) {
          str += (this.state.squares[`${i+1}a${i}`])
        } else {
          blockingMove += `${i+1}a${i}`
        }
        i++;
      }
      if (str === ('XXXX')) {
        const squares = {
          ...this.state.squares, [blockingMove]: 'O'
        }
        this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
        return "STOP"
    } else if (str === ('OOOO')) {
        const squares = {
          ...this.state.squares, [blockingMove]: 'X'
        }
        this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
        return "STOP"
      }
    } else if (arrayLength2 === 4) {
      let str = ''
      let blockingMove = ''
      let i = 1;
      while (i<6) {
        if (this.state.squares[`${i}a${i+1}`]) {
          str += (this.state.squares[`${i}a${i+1}`])
        } else {
          blockingMove += `${i}a${i+1}`
        }
        i++;
      }
      if (str === ('XXXX')) {
        const squares = {
          ...this.state.squares, [blockingMove]: 'O'
        }
        this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
        return "STOP"
    } else if (str === ('OOOO')) {
        const squares = {
          ...this.state.squares, [blockingMove]: 'X'
        }
        this.setState({squares: squares, isX: !this.state.isX, orderTurn: !this.state.orderTurn, isComputerTurn: false})
        return "STOP"
      }
    }
  }

  // Compiles all our order and chaos checks

  orderChaosAiMoveChecker = () => {
    let keys = (Object.keys(this.state.squares));
    let arrayToCheck = [];
    // let length = keys.length;
    let i=1;
    while (i<7) {
      const row = this.orderChaosHorizontalVerticalChecker(0,i,keys);
      const column = this.orderChaosHorizontalVerticalChecker(2,i,keys);
      if (row) {
        arrayToCheck.push(row);
      }
      if (column) {
        arrayToCheck.push(column);
      }
      // column.push(arrayToCheck);
      i++;
    }
    let option = this.orderChaosEasyDiagonalAiChecker(keys)
    let option2 = this.orderChaosMediumDiagonalAiChecker(keys,6)
    let option3 = this.orderChaosMediumDiagonalAiChecker(keys,7)
    let option4 = this.orderChaosMediumDiagonalAiChecker(keys,8)
    let option5 = this.orderChaosHardDiagonalAiChecker(keys)
    if (option) {
      arrayToCheck.push(option)
    }
    if (option2) {
      arrayToCheck.push(option2)
    }
    if (option3) {
      arrayToCheck.push(option3)
    }
    if (option4) {
      arrayToCheck.push(option4)
    }
    if (option5) {
      arrayToCheck.push(option5)
    }
    return arrayToCheck;
  }

  orderChaosAi = () => {
    let keys = (Object.keys(this.state.squares));
    console.log(keys)
    if (this.state.isComputerTurn && !this.state.gameOver) {
      console.log('computer turn')
      let options =[];
      //returns danger array from places we might need to block
      const dangerArray = this.orderChaosAiMoveChecker();
      // if we already moved, then don't worry about moving again
      let stopCheck = dangerArray.filter(win => win === "STOP")
      if (stopCheck.length != 0) {
        return;
      }
      let dangerArrayLength = dangerArray.length
      if (dangerArrayLength != 0) {
        let randomMove = dangerArray[Math.floor(Math.random()*dangerArrayLength)]
        let blockHere = randomMove.split('.')
        console.log('setting a key')
        const squares = {
          ...this.state.squares, [`${blockHere[0]}`]: `${blockHere[1]}`
        }
        this.setState({squares: squares, isX: !this.state.isX, isComputerTurn: false})

      } else {


        for(let j = 1; j<7; j++) {
          for (let i = 1; i<7; i++) {
            options.push(`${j}a${i}`);
          }
        }
        let length = keys.length;

        //k is the array number for options

        for (let k = 0; k<length; k++) {
        //m is the array number for keys length
          for (let m=0; m<36; m++){
            if (keys[k] === options[m]){
              options.splice(m,1);
              break;
            }
          }
        }
        let randomSelector = 36 - length;

        console.log(options)
        let number = Math.floor((Math.random())*randomSelector);
        const squares = {
          ...this.state.squares, [`${options[number]}`]: `${this.state.isX ? "X" : "O"}`
        }
        this.setState({squares: squares, isX: !this.state.isX, isComputerTurn: false})
        return;
      }
    }
  }
  // Order and Chaos win checkers

  horizontalWinChecker = () => {
    let keys = (Object.keys(this.state.squares));
    let key = keys.slice(-1)[0];
    let winningSymbol;
    if (key != null) {
      winningSymbol = (this.state.squares[key])
    } else {
      winningSymbol = ('Empty spot, need something here so that there is no error')
    }
    let test = String(key)
    let parsedArray = test.split('a');
    let xCoord = parseInt(parsedArray[0], 10);
    let i = 1;
    while (i<6) {
      if(this.state.squares[`${xCoord}a${1}`] === winningSymbol){
        if(this.state.squares[`${xCoord}a${i}`] != winningSymbol) {
          break;
        }
      } else if (this.state.squares[`${xCoord}a${2}`] === winningSymbol) {
          if(this.state.squares[`${xCoord}a${i+1}`] != winningSymbol) {
            break;
          }
        } else {
            break;
        }
        i++;
      }

      if (i === 6) {
        // trying to highlight wins
        if(this.state.squares[`${xCoord}a${1}`] === winningSymbol){
          let k = 1;
          while (k<6) {
            let element = document.getElementById(`${xCoord}a${k}`);
            element.classList.add("win");
            k++;
          }
        } else {
          let k = 1;
          while (k<6) {
            let element = document.getElementById(`${xCoord}a${k+1}`);
            element.classList.add("win");
            k++;
          }
        }
        return true;
      }
    }

  verticalWinChecker = () => {
    let keys = (Object.keys(this.state.squares));
    let key = keys.slice(-1)[0];
    let winningSymbol;
    if (key != null) {
      winningSymbol = (this.state.squares[key])
    } else {
      winningSymbol = ('Empty spot, need something here so that there is no error')
    }
    let test = String(key)
    let parsedArray = test.split('a');
    let yCoord = parseInt(parsedArray[1], 10);
    let i = 1;
    while (i<6) {
      if(this.state.squares[`${1}a${yCoord}`] === winningSymbol){
        if(this.state.squares[`${i}a${yCoord}`] != winningSymbol) {
          break;
        }
      } else if (this.state.squares[`${2}a${yCoord}`] === winningSymbol) {
          if(this.state.squares[`${i+1}a${yCoord}`] != winningSymbol) {

              break;
          }
        } else {
            break;
        }
        i++;
      }
      if (i === 6) {
        // trying to highlight wins
        if(this.state.squares[`${1}a${yCoord}`] === winningSymbol){
          let k = 1;
          while (k<6) {
            let element = document.getElementById(`${k}a${yCoord}`);
            element.classList.add("win");
            k++;
          }
        } else {
          let k = 1;
          while (k<6) {
            let element = document.getElementById(`${k+1}a${yCoord}`);
            element.classList.add("win");
            k++;
          }
        }
        return true;
      }
    }

  easyDiagonalWinChecker = () => {
    let keys = (Object.keys(this.state.squares));
    let key = keys.slice(-1)[0];
    let winningSymbol = (this.state.squares[key])
    let test = String(key)
    let parsedArray = test.split('a');
    let xCoord = parseInt(parsedArray[0], 10);
    let yCoord = parseInt(parsedArray[1], 10);
    let i = 1;

    if (xCoord === yCoord && this.state.squares[`${1}a${1}`] === winningSymbol) {
      while (i<6) {
        if (this.state.squares[`${i}a${i}`] === winningSymbol) {
          i++;
        } else {
          break;
        }
      } // end of while loop

    }  else if (xCoord === yCoord){ //end of xcoord===ycoord statement
        while (i<6) {
          if (this.state.squares[`${i+1}a${i+1}`] === winningSymbol) {
        i++;
          } else {
        break;
          }
        }
      }
      if (i === 6) {
        // trying to highlight wins
        if(this.state.squares[`${1}a${1}`] === winningSymbol){
          let k = 1;
          while (k<6) {
            let element = document.getElementById(`${k}a${k}`);
            element.classList.add("win");
            k++;
          }
        } else {
          let k = 1;
          while (k<6) {
            let element = document.getElementById(`${k+1}a${k+1}`);
            element.classList.add("win");
            k++;
          }
        }
        return true;
      }
  }

  mediumDiagonalWinChecker = () => {
    let keys = (Object.keys(this.state.squares));
    let key = keys.slice(-1)[0];
    let winningSymbol = (this.state.squares[key])
    let test = String(key)
    let parsedArray = test.split('a');
    let xCoord = parseInt(parsedArray[0], 10);
    let yCoord = parseInt(parsedArray[1], 10);
    let i = 1;
    if (xCoord + yCoord === 6) {
      while (i<6) {
        if(this.state.squares[`${i}a${6-i}`] === winningSymbol) {
          i++;
        } else {
          break;
        }
      }
    }  else if (xCoord + yCoord === 8) {
      while (i<6) {
        if(this.state.squares[`${i+1}a${7-i}`] === winningSymbol) {
          i++;
        } else {
          break;
        }
      }
    } else if (xCoord + yCoord === 7) {
        if(this.state.squares[`${1}a${6}`] === winningSymbol) {
          while (i<6) {
            if(this.state.squares[`${i}a${7-i}`] === winningSymbol){
              i++;
            } else {
              break;
            }
          }
        } else if (this.state.squares[`${6}a${1}`] === winningSymbol) {
          while (i<6) {
            if(this.state.squares[`${7-i}a${i}`] === winningSymbol){
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
        if(this.state.squares[`${1}a${6}`] === winningSymbol){
          let k = 1;
          while (k<6) {
            let element = document.getElementById(`${k}a${7-k}`);
            element.classList.add("win");
            k++;
          }
        } else {
          let k = 1;
          while (k<6) {
            let element = document.getElementById(`${7-k}a${k}`);
            element.classList.add("win");
            k++;
          }
        }
      } else if (xCoord + yCoord === 6) {
        let k = 1;
        while (k<6) {
          let element = document.getElementById(`${k}a${6-k}`);
          element.classList.add("win");
          k++;
        }
      } else {
        let k = 1;
        while (k<6) {
          let element = document.getElementById(`${k+1}a${7-k}`);
          element.classList.add("win");
          k++;
        }
      }
      return true;
    }
  }

  hardDiagonalWinChecker = () => {
    let keys = (Object.keys(this.state.squares));
    let key = keys.slice(-1)[0];
    let winningSymbol = (this.state.squares[key])
    let test = String(key)
    let parsedArray = test.split('a');
    let xCoord = parseInt(parsedArray[0], 10);
    let yCoord = parseInt(parsedArray[1], 10);
    let i = 1;
    if (xCoord > yCoord && xCoord - yCoord === 1) {
      while (i<6) {
        if (this.state.squares[`${i+1}a${i}`] === winningSymbol) {
          i++;
        } else {
          break;
        }
      }
    } else if (yCoord > xCoord && yCoord - xCoord === 1) {
      while (i<6) {
        if (this.state.squares[`${i}a${i+1}`] === winningSymbol) {
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
        while (k<6) {
          let element = document.getElementById(`${k+1}a${k}`);
          element.classList.add("win");
          k++;
        }
      } else {
        let k = 1;
        while (k<6) {
          let element = document.getElementById(`${k}a${k+1}`);
          element.classList.add("win");
          k++;
        }
      }
      return true;
    }
  }

  isOrderChaosWin = () => {
    if (this.state.gameOver === false) {
      if (this.easyDiagonalWinChecker()) {
        this.setState({gameOver: true})
      } else if (this.mediumDiagonalWinChecker()){
        this.setState({gameOver: true})
      } else if (this.hardDiagonalWinChecker()){
        this.setState({gameOver: true})
      } else if (this.horizontalWinChecker()){
        this.setState({gameOver: true})
      } else if (this.verticalWinChecker()){
        this.setState({gameOver: true})
      }
    }

    if (this.state.gameOver === true) {
      return true;
    }
  }

  // Toggling symbols in order and chaos

  toggleSymbolX = () => {
    this.setState({isX: true})
  }

  toggleSymbolO = () => {
    this.setState({isX: false})
  }

// creates a board. the num you input is a num x num board

  renderSq = (num) => {
      // creates an empty row array that will be put down
    let rows = [];
    // for loop to create rows
    for(let j=1; j<=num; j++){
      let sqrs = [];
      // for loop to create columns
      for(let i=1; i<=num;i++){
        let value = this.state.squares[j+'a'+i] || '.' ;
        sqrs.push(
          // puts in our square with the id of its coordinates and a click handler that allows us to play
          <Square id={`${j}a${i}`} value={value} click={(e) => this.makeMoveHandler(e, `${j}a${i}`)}/>);
      }
        // We push the rows into the arraw and then display them
        rows.push(<div>{sqrs}</div>)
    }
      return rows;
  }

  // building Nim board

  buildNim = (numArray) => {
    const length = numArray.length
    const sum = numArray.reduce((acc, val) => {
      return acc + val;
    });
    if (this.state.nimWinNumber != sum){
      this.setState({nimWinNumber: sum})
    }

    let rows = [];
    for (let j = 1; j < length+1; j++) {
      let pebbles = [<Pebble myClass={`keepSpacing pebble`} />];
      for (let i = 1; i<=numArray[j-1]; i++) {
        let value = this.state.pebbles[j+'n'+i] || '' ;
        pebbles.push(
          <Pebble id={`${j}n${i}`} value={value} myClass={`r${j} ${value} pebble`} click={(e) => this.removeNimStones(e, `${j}n${i}`, i, j, numArray[j-1])} />
        );
      }
      rows.push(<div className="board-row">{pebbles}</div>)
    }

    return rows;
  }

  removeNimStones = (event, id, startIndex, row, endIndex) => {
    if (!this.state.gameOver) {

    // Checks whether the move has already been put in the state.squares hash
      // good so far
      const pebbles = {
        ...this.state.pebbles
      }
      for (let i = startIndex; i <= endIndex; i++) {
        pebbles[`${row}n${i}`] = 'disappear';
      }

      this.setState({pebbles: pebbles, orderTurn: !this.state.orderTurn})
    }
  }

  isNimWin = () => {
    const length = (Object.keys(this.state.pebbles)).length;
    if (length === this.state.nimWinNumber) {
      return true;
    }
  }

  nimAi = () => {
    const numberOfRows = 3
    // Converting all lengths to binary
    const keys = Object.keys(this.state.pebbles)
    const key1 = keys.filter(key => key[0] === `1`)
    const key2 = keys.filter(key => key[0] === `2`)
    const key3 = keys.filter(key => key[0] === `3`)
    let binary1 = (3 - key1.length).toString(2);
    let binary2 = (4 - key2.length).toString(2);
    let binary3 = (5 - key3.length).toString(2);

    const length1 = binary1.length
    const length2 = binary2.length
    const length3 = binary3.length
    // changing row is the row that we must take from
    let changingRow = ":(";
    if (length1 === 1) {
      binary1 = "00" + binary1
    } else if (length1 === 2) {
      binary1 = "0" + binary1
    }
    if (length2 === 1) {
      binary2 = "00" + binary2
    } else if (length2 === 2) {
      binary2 = "0" + binary2
    }
    if (binary3.length === 1) {
      binary3 = "00" + binary3
    } else if (length3 === 2) {
      binary3 = "0" + binary3
    }
    console.log(binary1)
    console.log(binary2)
    console.log(binary3)
    let i = 0
    while (i<numberOfRows) {
      // finding which one to change
      if (((binary1[i] === '1') && (binary2[i] === '0' && binary3[i] === '0'))) {
        changingRow = i.toString() + '1' + binary1;
        break;
      } else if ((binary2[i] === '1') && (binary1[i] === '0' && binary3[i] === '0')){
        changingRow = i.toString() + '2' + binary2
        break;
      } else if (((binary3[i] === '1') && (binary1[i] === '0' && binary2[i] === '0'))){
        changingRow = i.toString() + '3' + binary3
        break;
      }
      i++
    }
    console.log(changingRow);
    if (changingRow === ":(") {
      console.log('random move')
    } else if (changingRow[0] === '2'){
      console.log(`remove one from row${changingRow[1]}`)
    } else if (changingRow[0] === '1') {
      console.log('working on it')
    }
  }


  render() {
    let symbol = null;
    let winSymbol = null;
    let declaration = null;
    let rules = null;
    let languageButton = null;
    let nimArray = [0];
    // dynamically changes size of board
    let gameNumber = 0;
    let keys = Object.keys(this.state.squares)
    let buttonArray = <div className="buttonArray"><button className="symbolButton" onClick={this.chooseTicTacToe}>TicTacToe</button>
    <button className="symbolButton" onClick={this.chooseOrderChaos}>OrderChaos</button><button className="symbolButton" onClick={this.chooseNim}>Nim</button></div>;
    // Decides if X or O is moving
    if (this.state.isX) {
      symbol = 'X'
      winSymbol = 'O'
    } else {
      symbol = 'O'
      winSymbol = 'X'
    }


    // Checks whether we're playing Tic Tac Toe
    if (this.state.whichGame==="TicTacToe"){
      buttonArray = null;
      gameNumber = 3;
      if (this.state.language === 'eng') {
        rules = <div><h3>Tic Tac Toe:</h3><p className="rulesParagraph"> The players take turns putting either an "X" or "O" where they like.  The winner is the first to get three of their symbol in a row either horizontally, vertically or diagonally. </p></div>
        languageButton = <div><button className="symbolButton" onClick={this.toggleLanguage}>isiZulu</button><button className="symbolButton" onClick={this.resetGame}>Start Over</button></div>
      } else {
        rules = <div><h3>Tic Tac Toe:</h3><p className="rulesParagraph"> Umdlalo uTic Tac Toe udlalwa ebhodini njengoba kuveziwe esthombeni ngezansi. Abadlali bathatha amathuba ngokulandelana, babhala u X noma u O noma ikephi ebhodini elingezansi. Umdlali owinayo  okwaze ukubhala o X noma o O abathathu abalandelanayo ebhodini ngezansi, kungaba ukuthi balandelana kusukela phansi kuyaphezulu (okuqondile), kusukela esandleni sokunxele kuya kwesokudla (okuqondile) noma kucezeke. </p></div>
        languageButton = <div><button className="symbolButton" onClick={this.toggleLanguage}>English</button><button className="symbolButton" onClick={this.resetGame}>Start Over</button></div>
      }
      if(!this.isTttWin()) {
        declaration = (<h1>{symbol}'s Turn</h1>)
      } else if (keys.length === 9) {
        console.log('hello')
        this.setState({gameOver: true})
      }
      if (this.state.gameOver) {
        console.log('heyr')
        if(this.isTttWin) {
          console.log('hey im alive')
          declaration= (<h1>{winSymbol} Wins!</h1>)
        } else {
          console.log('im here')
          declaration = (<h1>Tie game</h1>)
        }
      }

      // Checks if we're playing order and chaos
    } else if (this.state.whichGame==="OrderChaos"){
        buttonArray = <div className="buttonArray"><button className="symbolButton" onClick={this.toggleSymbolX}>X</button>
        <button className="symbolButton" onClick={this.toggleSymbolO}>O</button></div>
        gameNumber = 6;
        if (this.state.language === 'eng') {
          rules = <div><h3>Order and Chaos:</h3><p className="rulesParagraph"> One player plays as Order and the other plays as Chaos.  Order wins if they get five "X"s or "O"s in a row, and Chaos wins if they prevent Order from getting five in a row.  Each player can put either an "X" or an "O" on their respective turns.  They can switch between the two whenever they like. </p></div>
          languageButton = <div><button className="symbolButton" onClick={this.toggleLanguage}>IsiZulu</button><button className="symbolButton" onClick={this.resetGame}>Start Over</button></div>
        } else {
          rules = <div><h3>Order and Chaos:</h3><p className="rulesParagraph">Umdlalo u order and Chaos  udlalwa ebhodini eliphindaphindeke ngokwesithupha ngokwesithupha njengoba kuveziwe esithombeni ngezansi. Umdlali wokuqala udlala engu Order umdlali wesibili udlala engu Chaos. U Order uwina uma ekwaze ukulandelanisa o X noma o O abayisihlanu ebhodini besekuthi u Chaos uwina uma ekwaze ukuvimba u Order ukuthi alandelanise o X noma o O abayisihlanu. Umdlali emunye angadlala ngo X noma ngo O. bangashintsha shintsha phakathi kokubili ngokuthanda kwabo. </p></div>
          languageButton = <div><button className="symbolButton" onClick={this.toggleLanguage}>English</button><button className="symbolButton" onClick={this.resetGame}>Start Over</button></div>
        }
        let player;
        if (this.state.orderTurn) {
          player = "Order"
        } else {
          player = 'Chaos'
        }
        let keys = (Object.keys(this.state.squares))
        if (this.isOrderChaosWin()) {
          declaration = <h1> Order Wins! </h1>
        } else if (keys.length === 36) {
          declaration = <h1> Chaos Wins! </h1>
        } else {
          declaration = <h1>{player}'s Turn. Symbol: {symbol}</h1>
      }

    } else if (this.state.whichGame === 'Nim') {
      buttonArray = null;
      nimArray = [3,4,5];
      let player;
      if (this.state.language === 'eng') {
        rules = <div><h3>Nim:</h3><p className="rulesParagraph"> Nim is played with a set of 12 counters.  You place them in three groups as pictured:   Each player takes turns removing as many counters as they like from one group.  They can take as many as they like provided they all come from the same group.  The player who takes the last counter loses.  The game can be adjusted by adding more or less counters to each pile or adding more piles. </p></div>
        languageButton = <div><button className="symbolButton" onClick={this.toggleLanguage}>isiZulu</button><button className="symbolButton" onClick={this.resetGame}>Start Over</button></div>
      } else {
        rules = <div><h3>Nim:</h3><p className="rulesParagraph"> UNim udlalwa ngezinkomo ezingu12. Zibekwa zibe ngamaqoqo amathathu, njengasesithombeni. Umdlali, ngethuba lakhe, angathatha nom izinkomo ezingaki, kodwa eqoqweni elilodwa. Umdlali othatha inkomo yokugcina uyena ohlulwayo. Lomdlalo ungashintshwa ngokwenza amaqoqo abe maningi, noma ngokwenza izinkomo zibe ningi noma ncane ngeqoqo ngalinye. </p></div>
        languageButton = <div><button className="symbolButton" onClick={this.toggleLanguage}>English</button><button className="symbolButton" onClick={this.resetGame}>Start Over</button></div>
      }
      if (this.state.orderTurn) {
        player = "Player 1"
      } else {
        player = 'Player 2'
      }
      if (this.isNimWin()) {
        declaration = <h1>{player} wins!</h1>
      } else {
      declaration = <h1>{player}'s Turn</h1>
      }
    };
    return (

      <div className="App">
        <div className="grid">
        <div className="header">
            <img src="UnizuluLogo.png" className='logo' alt='Unizulu Logo'></img>
            <button className="homeButton" onClick={this.goHomeScreen}>Go home</button>
        </div>
          <div></div>
          <div className="content">
          {declaration}
          <button className="symbolButton" onClick={this.nimAi}>Computer Test</button>

          {this.buildNim(nimArray)}
          {this.renderSq(gameNumber)}

          {buttonArray}
        </div>
          <div className="rules">
            {rules}
            {languageButton}
          </div>
        </div>

        </div>
    );
  }
}

export default App;
