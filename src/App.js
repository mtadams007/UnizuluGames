import React, { Component } from 'react';
import Square from './Square/Square'
import Board from './Board/Board'
import './App.css';

class App extends Component {
  state = {
    value: 'X'
  }

  makeMoveHandler = (event) => {
    console.log('clicked')
  }

  render() {
    return (
      <div className="App">
        <Board />

      </div>
    );
  }
}

export default App;
