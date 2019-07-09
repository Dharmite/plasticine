import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <div style={{backgroundColor:"#f4f6f9"}}>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block', backgroundColor:"#f4f6f9", color:"#f4f6f9" }}
        alt="Loading..."
      />
    </div>
  );
};
