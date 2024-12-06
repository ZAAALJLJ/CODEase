import React, { useState } from 'react';
import AddBlockDesign from './AddBlockDesign';

const AddBlock = ({ id, onClick, onInputsChange }) => { 
  return (
      <div
          onClick={onClick} 
          style={{ display: 'flex', alignItems: 'flex-start' }}
      >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <AddBlockDesign onInputsChange={onInputsChange} /> 
          </div>
      </div>
  );
};
export default AddBlock;