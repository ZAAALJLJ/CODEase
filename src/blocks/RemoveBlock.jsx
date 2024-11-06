import React, { useState } from 'react';
import RemoveBlockDesign from './RemoveBlockDesign';

const RemoveBlock = ({onClick}) => {
  return (
    <div
        onClick={onClick} 
        style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <RemoveBlockDesign/>
      </div>
    </div>
  );
};

export default RemoveBlock;