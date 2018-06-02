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
    whichGame: 'Nim',
    // whichGame: 'TicTacToe',
    orderTurn: true,
    language: 'eng',
  }

  // Basic navigation

  goHomeScreen = () => {
    this.setState({squares: '', isX: true, gameOver: false, whichGame: '', orderTurn: true, pebbles:{}})
  }

  resetGame = () => {
    this.setState({squares: '', isX: true, gameOver: false, orderTurn: true})
  }

  chooseTicTacToe = () => {
    console.log(this.state.whichGame)
    this.setState({whichGame: 'TicTacToe'})
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
          this.setState({gameOver: true})
        }
      }
      // Checks vertical victories
      if(keys.includes(`${(xCoord+1)%3+1}a${yCoord}`) && keys.includes(`${(xCoord+2)%3+1}a${yCoord}`)){
        if(this.state.squares[`${(xCoord+1)%3+1}a${yCoord}`]===this.state.squares[`${(xCoord+2)%3+1}a${yCoord}`] && this.state.squares[`${(xCoord%3)+1}a${yCoord}`] === winningSymbol){
          this.setState({gameOver: true})
        }
      }
      if (xCoord === yCoord) {
        if(this.state.squares[`${(xCoord%3)+1}a${(yCoord%3)+1}`]===this.state.squares[`${(xCoord%3)+2}a${(yCoord%3)+2}`] && this.state.squares[`${(xCoord%3)+2}a${(yCoord%3)+2}`]===winningSymbol){
          this.setState({gameOver: true})
        }
      }
      if (xCoord+yCoord === 4){
        if(this.state.squares[`${((xCoord)%3)+1}a${((yCoord+1)%3)+1}`] === this.state.squares[`${((xCoord+1)%3)+1}a${((yCoord)%3)+1}`] &&
           this.state.squares[`${((xCoord+1)%3)+1}a${((yCoord)%3)+1}`] === winningSymbol){
           this.setState({gameOver: true})
        }
      }
    }
    if (this.state.gameOver === true){
      return true;
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
    if(i === 6) {
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
    let rows = [];
    for (let j = 1; j < 4; j++) {
      let pebbles = [];
      for (let i = 1; i<=numArray[j-1]; i++) {
        let value = this.state.pebbles[j+'n'+i] || '' ;
        pebbles.push(
          <Pebble id={`${j}n${i}`} value={value} myClass={`r${j} ${value}`} click={(e) => this.removeNimStones(e, `${j}n${i}`, i, j, numArray[j-1])} />
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
      console.log(id)
      this.setState({pebbles: pebbles, orderTurn: !this.state.orderTurn})
    }
  }


  render() {
    let symbol = null;
    let winSymbol = null;
    let declaration = null;
    let rules = null;
    let languageButton = null;
    // dynamically changes size of board
    let gameNumber = 0;
    let buttonArray = <div className="buttonArray"><button className="symbolButton" onClick={this.chooseTicTacToe}>TicTacToe</button>
    <button className="symbolButton" onClick={this.chooseOrderChaos}>OrderChaos</button></div>;
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
            {this.buildNim([3,4,5])}
          {declaration}
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
