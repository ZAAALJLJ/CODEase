import React, { useState } from 'react';

import BottomPart from '../assets/ifBlock.png'; 
import IfLoop from './IfLoop';

const ExpandableIFBlock = ({onClick}) => {
  const [height, setHeight] = useState(20); // Initial height ng middle part

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
        {<IfLoop/>}        
        <div style={{ 
          backgroundColor: '#e8d07a', 
          width: '10px',
          height: `${height}px`, 
          transition: 'height 0.3s',
          marginTop: '-1px',
          marginLeft: '10px',
        }} />
        
        <img src={BottomPart} alt="Bottom Part" style={{ width: '200px', height: '30px' }} />
      </div>

      {/* Example use case ng pagchachange height ng middle */}
      
      {/*<input 
        type="range" 
        min="10" 
        max="300" 
        value={height} 
        onChange={handleHeightChange}
      />*/}
    </div>
  );
};

export default ExpandableIFBlock;
