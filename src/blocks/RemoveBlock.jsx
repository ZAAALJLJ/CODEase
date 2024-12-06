import React, { useState } from 'react';
import RemoveBlockDesign from './RemoveBlockDesign';

const RemoveBlock = ({id, onClick, onInputsChange}) => {
  return (
    <div
        onClick={onClick} 
        style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <RemoveBlockDesign onInputsChange={onInputsChange}/>
      </div>
    </div>
  );
};

export default RemoveBlock;