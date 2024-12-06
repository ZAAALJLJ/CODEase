import React, { useEffect,useState } from 'react';
import CallFunctionDesign from './CallFunctionDesign';

const CallFunction = ({id, onClick, onInputsChange, blockInputs}) => {
    const [functionName, setFunctionName] = useState('');
     useEffect(() => {
        // initialize function from blockInputs  
        if (blockInputs?.[id]?.functionName) {
            setFunctionName(blockInputs[id].functionName);
        }
    }, [blockInputs, id]);
     const handleInputChange = (name, value) => {
        if (typeof onInputsChange !== 'function') return;
         let newFunctionName = functionName;
        
        if (name === 'functionName') {
            newFunctionName = value;
            setFunctionName(value);
        }
         console.log('CallFunction sending:', {
            id: id,
            functionName: newFunctionName
        });
        
        onInputsChange({
            functionName: newFunctionName,
            type: 'callFunction',
            id: id
        });
    };
     return (
        <div
            onClick={onClick} 
            style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <CallFunctionDesign 
                    functionName={functionName}
                    onInputChange={(value) => handleInputChange('functionName', value)}
                />
            </div>
        </div>
    );
};

export default CallFunction;