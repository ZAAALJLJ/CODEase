import React, { useState } from 'react';
import FunctionBlockDesign from './functionBlockDesign';
const FunctionBlock = ({onClick}) => {
  return (
    <div
        onClick={onClick} 
        style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <FunctionBlockDesign/>
      </div>
    </div>
  );
};

export default FunctionBlock;