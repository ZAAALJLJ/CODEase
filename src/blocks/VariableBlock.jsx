import React, { useState } from 'react';
import VariableBlockDesign from './VariableBlockDesign';

const VariableBlock = ({ id, onClick, onInputsChange }) => {
    const [variableName, setVariableName] = useState('');
    const [variableValue, setVariableValue] = useState('');

    const handleInputChange = (name, value) => {
        const newValue = value || '';

        if (name === 'name') {
            setVariableName(newValue);
            onInputsChange({
                variableName: newValue,
                variableValue: variableValue
            });
        } else if (name === 'value') {
            setVariableValue(newValue);
            onInputsChange({
                variableName: variableName,
                variableValue: newValue
            });
        }

        console.log('Variable block sending:', {
            variableName: name === 'name' ? newValue : variableName,
            variableValue: name === 'value' ? newValue : variableValue
        });
    };


    return (
        <div 
            onClick={onClick}
            style={{ display: 'flex', alignItems: 'flex-start' }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <VariableBlockDesign 
                    variableName={variableName || ''} 
                    setVariableName={(value) => handleInputChange('name', value)}
                    variableValue={variableValue || ''} 
                    setVariableValue={(value) => handleInputChange('value', value)}
                />
            </div>
        </div>
    );
};

export default VariableBlock;