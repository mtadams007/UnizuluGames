import React, { Component } from 'react';
import Square from './Square/Square'
// import Board from './Board/Board'
import './App.css';

class App extends Component {
  state = {
    squares: {
    },
    isX: true,
    gameOver: false
  }

// puts a mark down when you click
  makeMoveHandler = (event, id) => {

    if (!this.state.gameOver) {
    // console.log(id)
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
    if(keys.includes(`${xCoord}a${(yCoord%3)+1}`) && keys.includes(`${xCoord}a${(yCoord%3)+2}`)){
      if(this.state.squares[`${xCoord}a${(yCoord%3)+1}`]===this.state.squares[`${xCoord}a${(yCoord%3)+2}`] && this.state.squares[`${xCoord}a${(yCoord%3)+1}`] === winningSymbol){
        console.log("victory!")
        this.state.gameOver = true;
      } else {
        console.log('no dice')
      }
    }
    // Checks vertical victories
    else if(keys.includes(`${(xCoord%3)+1}a${yCoord}`) && keys.includes(`${(xCoord%3)+2}a${yCoord}`)){
      if(this.state.squares[`${(xCoord%3)+1}a${yCoord}`]===this.state.squares[`${(xCoord%3)+2}a${yCoord}`] && this.state.squares[`${(xCoord%3)+1}a${yCoord}`] === winningSymbol){
        console.log("victory!")
        this.state.gameOver = true;
      } else {
        console.log('no dice')
      }
    }

    else if (xCoord === yCoord) {
      if(keys.includes(`${(xCoord%3)+1}a${(yCoord%3)+1}`) && keys.includes(`${(xCoord%3)+2}a${(yCoord%3)+2}`)) {
        if(this.state.squares[`${(xCoord%3)+1}a${(yCoord%3)+1}`]===this.state.squares[`${(xCoord%3)+2}a${(yCoord%3)+2}`] && this.state.squares[`${(xCoord%3)+2}a${(yCoord%3)+2}`]===winningSymbol){
          console.log("victory!")
          this.state.gameOver = true;
        } else {
          console.log('no dice')
        }
      } else {
      console.log('boo')
    }
    }

    // console.log(parsedArray)

    // console.log(this.state.squares[key])

  }

// creates a board. the num you input is a num x num board
  renderSq = (num) => {

      // creates an empty row array that will be put down
      let rows = [
      ];
    // for loop to create rows
    for(let j=1; j<=num; j++){
      let sqrs = [
      ];
      // for loop to create columns
      for(let i=1; i<=num;i++){
        let value = this.state.squares[j+'a'+i] || '' ;
        sqrs.push(
          // puts in our square with the id of its coordinates and a click handler that allows us to play
          <Square id={`${j}a${i}`} value={value} click={(e) => this.makeMoveHandler(e, `${j}a${i}`)}/>);
          this.isTttWin();
        }
        // We push the rows into the arraw and then display them
        rows.push(<div className="board-row">{sqrs}</div>)
      }
      return rows;
    }



  render() {
    return (
      <div className="App">
        {this.isTttWin()}
        {this.renderSq(3)}

      </div>
    );
  }
}

export default App;
