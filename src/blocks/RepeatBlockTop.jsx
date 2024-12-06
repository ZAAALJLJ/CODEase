import React from 'react';
import RepeatBlockDesign from './RepeatBlockDesign';

const RepeatBlockTop = ({ id, onClick, onInputsChange }) => {
    return (
        <div onClick={onClick} style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <RepeatBlockDesign 
                    id={id}
                    onInputsChange={onInputsChange}
                />
            </div>
        </div>
    );
};

export default RepeatBlockTop;
