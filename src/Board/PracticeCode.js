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


nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    // to make it a unique pointer
    const person = {
      ...this.state.persons[personIndex]
    };

    // old syntax:
    // const person = Object.assign({}, this.state.persons[personIndex])

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({persons: persons}
  )
}

// populateRow = (num) => {
//   i = 0;
//   while(i<num){
//     <Square />
//     i++;
//   }
// }

      // {populateRow(this.props)}
