import React, { Component } from 'react';
import Square from './Square/Square'
// import Board from './Board/Board'
import './App.css';

class App extends Component {
  state = {
    squares: {
    },
    isX: true,
    gameOver: false,
    whichGame: 'OrderChaos'
  }

// puts a mark down when you click
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
        this.setState({squares: squares, isX: false})
      } else {
      const squares = {
        ...this.state.squares, [id]: 'O'
      }

    this.setState({squares: squares, isX: true})
      }
    }
  }

    // console.log({this.state.squares});
  }

  // function to check victories

  winChecker = (upOrAcross) => {
    let keys = (Object.keys(this.state.squares));
    let key = keys.slice(-1)[0];
    let winningSymbol = (this.state.squares[key])
    let test = String(key)
    let parsedArray = test.split('a');
    let xCoord = parseInt(parsedArray[0]);
    let yCoord = parseInt(parsedArray[1]);
    let i = 1;
    let firstCoord;
    let secondCoord;

    while (i<6) {
      if(upOrAcross === 'across'){
        firstCoord = xCoord;
        secondCoord = i;
      } else {
        firstCoord = i;
        secondCoord = yCoord;
      }
      if(this.state.squares[`${firstCoord}a${1}`] === winningSymbol || this.state.squares[`${1}a${secondCoord}`] === winningSymbol){
        if(this.state.squares[`${firstCoord}a${secondCoord}`] === winningSymbol) {
        // i++;
          console.log(i)
        } else {
        console.log(i)
        break;
        }
      } else {
          if(this.state.squares[`${firstCoord}a${secondCoord+1}`] === winningSymbol || this.state.squares[`${firstCoord+1}a${secondCoord}`] === winningSymbol) {

            console.log(i)
          } else {
            break;
          }
        }
        i++;
      }

      if (i === 6) {
        console.log('winner winner');
        return true;
      }
      console.log('boooo')
    }

  easyDiagonalWinChecker = () => {
    let keys = (Object.keys(this.state.squares));
    let key = keys.slice(-1)[0];
    let winningSymbol = (this.state.squares[key])
    let test = String(key)
    let parsedArray = test.split('a');
    let xCoord = parseInt(parsedArray[0]);
    let yCoord = parseInt(parsedArray[1]);
    let i = 1;

    if (xCoord === yCoord && this.state.squares[`${1}a${1}`] === winningSymbol) {
      while (i<6) {
        if (this.state.squares[`${i}a${i}`] === winningSymbol) {
          i++;
        } else {
          console.log('out')
          break;
        }
      } // end of while loop

    }  else if (xCoord === yCoord){ //end of xcoord===ycoord statement
        while (i<6) {
          if (this.state.squares[`${i+1}a${i+1}`] === winningSymbol) {
        i++;
          } else {
        console.log('out')
        break;
          }
        } // end of while loop
      }
    if(i === 6) {
      console.log('WIN')
    }//
  } // end of easyDiagonalWinChecker function

  mediumDiagonalWinChecker = () => {
    let keys = (Object.keys(this.state.squares));
    let key = keys.slice(-1)[0];
    let winningSymbol = (this.state.squares[key])
    let test = String(key)
    let parsedArray = test.split('a');
    let xCoord = parseInt(parsedArray[0]);
    let yCoord = parseInt(parsedArray[1]);
    let i = 1;
    let firstCoord;
    let secondCoord;
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
      console.log('WINNING');
    }

  }//end of mediumDiagonalWinChecker

  isTttWin = () => {
    // console.log(coordinate);
    let keys = (Object.keys(this.state.squares));
    let key = keys.slice(-1)[0];
    let winningSymbol = (this.state.squares[key])
    let test = String(key)
    let parsedArray = test.split('a');
    let xCoord = parseInt(parsedArray[0]);
    let yCoord = parseInt(parsedArray[1]);
    //Looking for horizontal victories
    if(keys.includes(`${xCoord}a${(yCoord+1)%3+1}`) && keys.includes(`${xCoord}a${(yCoord+2)%3+1}`)){
      if(this.state.squares[`${xCoord}a${(yCoord+1)%3+1}`]===this.state.squares[`${xCoord}a${(yCoord+2)%3+1}`] && this.state.squares[`${xCoord}a${(yCoord%3)+1}`] === winningSymbol){
        console.log("victory!")
        this.state.gameOver = true;
        return true
      } else {
        console.log('no dice')
      }
    }
    // Checks vertical victories
    if(keys.includes(`${(xCoord+1)%3+1}a${yCoord}`) && keys.includes(`${(xCoord+2)%3+1}a${yCoord}`)){
      if(this.state.squares[`${(xCoord+1)%3+1}a${yCoord}`]===this.state.squares[`${(xCoord+2)%3+1}a${yCoord}`] && this.state.squares[`${(xCoord%3)+1}a${yCoord}`] === winningSymbol){
        console.log("victory!")
        this.state.gameOver = true;
        return true
      } else {
        console.log('no dice')
      }
    }
    if (xCoord === yCoord) {
        if(this.state.squares[`${(xCoord%3)+1}a${(yCoord%3)+1}`]===this.state.squares[`${(xCoord%3)+2}a${(yCoord%3)+2}`] && this.state.squares[`${(xCoord%3)+2}a${(yCoord%3)+2}`]===winningSymbol){
          console.log("victory!")
          this.state.gameOver = true;
          return true;
        } else {
          console.log('no dice')
        }
    }
    if (xCoord+yCoord === 4){
      if(this.state.squares[`${((xCoord)%3)+1}a${((yCoord+1)%3)+1}`] === this.state.squares[`${((xCoord+1)%3)+1}a${((yCoord)%3)+1}`] &&
         this.state.squares[`${((xCoord+1)%3)+1}a${((yCoord)%3)+1}`] === winningSymbol){
         console.log("victory!");
         this.state.gameOver = true;
         return true;
      }
    } else {
      console.log('boo')
    }

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
        rows.push(<div className="board-row">{sqrs}</div>)
    }
      return rows;
  }





  render() {
    let symbol = null;
    let winSymbol = null;
    let declaration = null;
    if (this.state.isX) {
      symbol = 'X'
      winSymbol = 'O'
    } else {
      symbol = 'O'
      winSymbol = 'X'
    }
    if (this.state.whichGame==="TicTacToe"){
      if(this.isTttWin()) {
        declaration= (<h1>{winSymbol} Wins!</h1>)
      } else {
        declaration = (<h1>{symbol}'s Turn</h1>)
      }
    } else if (this.state.whichGame==="OrderChaos"){
        declaration = <h1>Working on Order and Chaos</h1>
      };
    return (
      <div className="App">
        <div className="logo">
          <img src="UnizuluLogo.jpg" className='logo'></img>
        </div>
        <div className="content">
          {declaration}
          {this.mediumDiagonalWinChecker()}
          {this.renderSq(6)}
        </div>
      </div>
    );
  }
}

export default App;
