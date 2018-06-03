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
    this.setState({squares: '', isX: true, gameOver: false, orderTurn: true, pebbles: {}})
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
          this.setState({squares: squares, isX: false, orderTurn: !this.state.orderTurn})
        } else {
          const squares = {
            ...this.state.squares, [id]: 'O'
          }
          this.setState({squares: squares, isX: true, orderTurn: !this.state.orderTurn})
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
        }
      }
    }
    if (this.state.gameOver === true){
      return true;
    }
  }

  // Checks horizontal and vertical spots whether there are two similar pieces in a row

  ticTacToeFilterMe = (directionNumber, numberOfRow, arrayToFilter, gameNumber) => {
    const valueArray = arrayToFilter.filter(key => key[directionNumber] === `${numberOfRow}`)
    if (valueArray.length === gameNumber && this.state.squares[valueArray[0]]===this.state.squares[valueArray[1]]) {
      // Confusing use of ternary here, but if the two in a row are NOT the current player's turn, it gets pushed to the danger array, otherwise computer will win here.
      if (this.state.squares[valueArray[0]] === (this.state.isX ? "O" : "X")) {
        return valueArray;
        // if directionNumber is 0, then we make the horizontal victory
      } else if (directionNumber === 0) {
        let key1 = String(valueArray[0]);
        let key2 = String(valueArray[1]);
        let key1Parsed = key1.split('a');
        let key2Parsed = key2.split('a');
        let firstYCoord = parseInt(key1Parsed[1], 10);
        let secondYCoord = parseInt(key2Parsed[1], 10);
        let winningYCoord = 6-(firstYCoord+secondYCoord);
        const squares = {
          ...this.state.squares, [`${numberOfRow}a${winningYCoord}`]: `${this.state.isX ? "X" : "O"}`
        }
        this.setState({squares: squares})
    } else {
      let key1 = String(valueArray[0]);
      let key2 = String(valueArray[1]);
      let key1Parsed = key1.split('a');
      let key2Parsed = key2.split('a');
      let firstXCoord = parseInt(key1Parsed[0], 10);
      let secondXCoord = parseInt(key2Parsed[0], 10);
      let winningXCoord = 6-(firstXCoord+secondXCoord);

      const squares = {
        ...this.state.squares, [`${winningXCoord}a${numberOfRow}`]: `${this.state.isX ? "X" : "O"}`
      }
      this.setState({squares: squares})
    }

    }
  }

  ticTacToeHorizontalAndVerticalChecker = () => {
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
    return arrayToCheck;
  }

  // AI is purposefully not supposed to be unbeatable, but challenging. It trys to win first, then prevent the other player from winning, and finally goes randomly if neither of the first two

  ticTacToeAi = () => {
    const symbol = (this.state.isX ? "X" : "O")
    const dangerArray = this.ticTacToeHorizontalAndVerticalChecker();
    let length = dangerArray.length;
    // if (length === 1) {
    //   let checkMe = dangerArray[0];
    //   let firstCoord = String(checkMe[0]).split('a');
    //   let firstXCoord = parseInt(first)
    //   let secondCoord = String(checkMe[1]).split('a');
    //   let firstXCoord = first
    // }

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
    console.log(sum)
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

  render() {
    let symbol = null;
    let winSymbol = null;
    let declaration = null;
    let rules = null;
    let languageButton = null;
    let nimArray = [0];
    // dynamically changes size of board
    let gameNumber = 0;
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
      if(this.isTttWin()) {
        declaration= (<h1>{winSymbol} Wins!</h1>)
      } else if(Object.keys(this.state.squares).length === 9) {
        declaration = (<h1>Tie game</h1>)

      } else {
        declaration = (<h1>{symbol}'s Turn</h1>)
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
          <button className="symbolButton" onClick={this.ticTacToeAi}>Computer Test</button>
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
