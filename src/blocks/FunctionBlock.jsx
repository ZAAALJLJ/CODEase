import React from 'react';
import FunctionBlockDesign from './FunctionBlockDesign';


const FunctionBlock = ({ id, onClick, onInputsChange }) => {
    return (
        <div onClick={onClick} style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <FunctionBlockDesign 
                    id={id}
                    onInputsChange={onInputsChange}
                />
            </div>
        </div>
    );
};

export default FunctionBlock;

