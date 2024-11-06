import React, { useState } from 'react';
import ArithmeticBlockDesign from './ArithmeticBlockDesign';

const ArithmeticBlock = ({onClick}) => {
  return (
    <div 
        onClick={onClick}
        style={{ display: 'flex', alignItems: 'flex-start' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <ArithmeticBlockDesign/>
      </div>
    </div>
  );
};

export default ArithmeticBlock;
