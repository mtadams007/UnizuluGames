import React from 'react';

import './Pebble.css';

const pebble = (props) => {
  return (
    <button id={props.id} className={props.myClass} onClick={props.click}>
    </button>
  );
}

export default pebble;
