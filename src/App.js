import React, { Component } from 'react';
import Square from './Square/Square'
// import Board from './Board/Board'
import './App.css';

class App extends Component {
  state = {
    squares: {
      s1a2: 'X',
      s2a1: 'O'
    }
  }

  renderSq = (num) => {
    let rows = [

    ];

    for(let j=1; j<=num; j++){

      let sqrs = [

      ];
      for(let i=1; i<=num;i++){

        let value = this.state.squares['s'+j+'a'+i] || '' ;
        sqrs.push(
          <Square id={`s${j}a${i}`} value={value} click={this.makeMoveHandler()}/>);
        }
        rows.push(<div className="board-row">{sqrs}</div>)
      }
      return rows;
    }

  makeMoveHandler = (event, id) => {
    // console.log({this.state.squares});
  }

  render() {
    return (
      <div className="App">
        {this.renderSq(3)}
      </div>
    );
  }
}

export default App;
