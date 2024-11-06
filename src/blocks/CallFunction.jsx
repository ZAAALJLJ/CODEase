import React, { useState } from 'react';
import CallFunctionDesign from './CallFunctionDesign';

const CallFunction = ({onClick}) => {
  return (
    <div
        onClick={onClick} 
        style={{ display: 'flex', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <CallFunctionDesign/>
      </div>
    </div>
  );
};

export default CallFunction;