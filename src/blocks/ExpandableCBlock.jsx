import React, { useState } from 'react';

import BottomPart from '../assets/forBlock.png';
import ForLoop from './forLoop';

const ExpandableCBlock = ({onClick}) => {
  const [height, setHeight] = useState(20); // Initial height ng middle part of BLOCKS
  const handleHeightChange = (event) => { // Eto gamitin for changing ng height ng middle part
    const newHeight = Math.max(10, event.target.value); // Minimum height limit
    setHeight(newHeight);
  };

  return (
    <div 
      onClick={onClick}
      style={{ display: 'flex', alignItems: 'flex-start' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        {<ForLoop/>}        
        <div style={{ 
          backgroundColor: '#c3e6b5', 
          width: '10px',
          height: `${height}px`, 
          transition: 'height 0.3s',
          marginTop: '-1px',
          marginLeft: '10px',
        }} />
        
        <img src={BottomPart} alt="Bottom Part" style={{ width: '200px', height: '30px' }} />
      </div>

    </div>
  );
};

export default ExpandableCBlock;
