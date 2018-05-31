import React from 'react';

import './Square.css';

const square = (props) => {
  return (
    <button id={props.id} className="square" onClick={props.click}>
      {props.value}
    </button>
  );
}

export default square;
