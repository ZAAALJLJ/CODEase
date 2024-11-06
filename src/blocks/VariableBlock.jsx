import React, { useState } from 'react';
import VariableBlockDesign from './VariableBlockDesign';

const VariableBlock = ({onClick}) => {
  return (
    <div 
        onClick={onClick}
        style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <VariableBlockDesign/>
      </div>
    </div>
  );
};

export default VariableBlock;
