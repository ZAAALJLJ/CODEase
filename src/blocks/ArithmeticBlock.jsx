import React, { useState } from 'react';
import ArithmeticBlockDesign from './ArithmeticBlockDesign';

const ArithmeticBlock = ({ id, onClick, onInputsChange }) => {
    const [input1, setInput1] = useState('');
    const [operation, setOperation] = useState('+');
    const [input2, setInput2] = useState('');

    const handleInputChange = (name, value) => {
        if (typeof onInputsChange !== 'function') return;

        let newInput1 = input1;
        let newOperation = operation;
        let newInput2 = input2;

        switch(name) {
            case 'input1':
                newInput1 = value;
                setInput1(value);
                break;
            case 'operation':
                newOperation = value;
                setOperation(value);
                break;
            case 'input2':
                newInput2 = value;
                setInput2(value);
                break;
        }

        console.log('Sending values:', {
            value1: newInput1,
            value2: newInput2,
            operation: newOperation
        });

        onInputsChange({
            value1: newInput1,
            value2: newInput2,
            operation: newOperation
        });
    };
    return (
        <div 
            onClick={onClick}
            style={{ display: 'flex', alignItems: 'flex-start' }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <ArithmeticBlockDesign 
                    input1={input1} 
                    setInput1={(value) => handleInputChange('input1', value)}
                    operation={operation} 
                    setOperation={(value) => handleInputChange('operation', value)}
                    input2={input2} 
                    setInput2={(value) => handleInputChange('input2', value)}
                    operations={['+', '-', '*', '/', '+=', '-=']}
                />
            </div>
        </div>
    );
};

export default ArithmeticBlock;