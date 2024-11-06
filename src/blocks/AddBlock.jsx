import React, { useState } from 'react';
import AddBlockDesign from './AddBlockDesign';

const AddBlock = ({onClick}) => {
  return (
    <div
        onClick={onClick} 
        style={{ display: 'flex', alignItems: 'flex-start' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <AddBlockDesign/>
      </div>
    </div>
  );
};

export default AddBlock;