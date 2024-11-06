import React, { useState } from 'react';
import StartBlockDesign from './StartBlockDesign';


const StartBlock = ({onClick}) => {
  return (
    <div 
        onClick={onClick}
        style={{ display: 'flex', alignItems: 'flex-start' }}
        >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <StartBlockDesign/>
      </div>
    </div>
  );
};

export default StartBlock;
