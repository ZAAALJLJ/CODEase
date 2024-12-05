import React from 'react';
import IfLoop from './IfLoop';

const IFBlockTop = ({ id, onClick, blockInputs, onInputsChange }) => {  
   return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <IfLoop 
                id={id}
                inputs={blockInputs?.[id] || {}}
                onInputsChange={onInputsChange}
            />
        </div>
    </div>
);
};
export default IFBlockTop;