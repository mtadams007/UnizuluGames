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
        let yCoord = parseInt(parsedArray[1], 10);
        let i = 1;
        let firstCoord;
        let secondCoord;

        while (i<6) {
          if(upOrAcross === 'horizontal'){
            firstCoord = xCoord;
            secondCoord = i;
          } else {
            firstCoord = i;
            secondCoord = yCoord;
          }
          if(this.state.squares[`${firstCoord}a${1}`] === winningSymbol || this.state.squares[`${1}a${secondCoord}`] === winningSymbol){
            if(this.state.squares[`${firstCoord}a${secondCoord}`] === winningSymbol) {
            // i++;
              console.log('horizontal' +i)
            } else {
            console.log('vertical' + i)
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
            console.log('winner w');
            // this.state.gameOver = true;
            return true;
          }
          console.log('boooo')
        }
