import React from 'react';
import Square from './../Square/Square'
import './Board.css';

const board = (props) => {

  return (
    <div className="Board">
      <div className="board-row">
        <Square click={() => this.makeMoveHandler()} />
        <Square click={() => this.makeMoveHandler()}/>
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </div>
  )

}

export default board;

// populateRow = (num) => {
//   i = 0;
//   while(i<num){
//     <Square />
//     i++;
//   }
// }

      // {populateRow(this.props)}
