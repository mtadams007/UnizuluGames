import React from 'react';

import './Square.css';

const square = (props) => {
  return (
    <button id={props.id} squareClass={props.win} className='square' onClick={props.click}>
      <div className={props.value}>
        {props.value}
      </div>
    </button>
  );
}

export default square;
