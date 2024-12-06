import '../assets/fonts.css';
import block from '../assets/ifBlock.png';
import { useEffect,useState } from 'react';

function IfLoop({ id, onInputsChange, inputs = {}}) {  
    const [value1, setValue1] = useState(inputs?.value1 || '');
    const [operation, setOperation] = useState(inputs?.operation || '==');
    const [value2, setValue2] = useState(inputs?.value2 || '');

    useEffect(() => {
        if (inputs) {
            setValue1(inputs.value1 || '');
            setOperation(inputs.operation || '==');
            setValue2(inputs.value2 || '');
        }
    }, [inputs]);

    const handleInputChange = (field, value) => {
        let newInputs = {
            value1,
            operation: operation,
            value2,
            type: 'IFBlockTop'
        };

        switch(field) {
            case 'value1':
                setValue1(value);
                newInputs.value1 = value;
                break;
            case 'operation':
                setOperation(value);
                newInputs.operation = value;
                break;
            case 'value2':
                setValue2(value);
                newInputs.value2 = value;
                break;
        }

        console.log('IfLoop sending inputs:', newInputs);
        onInputsChange?.(newInputs);
    };

    return (
        <>
        <div style={{position: 'relative', width: '200px', height: '30px'}}>
            <img src={block} alt='Block' style={{width: '100%', height: '100%'}}/>

            <span style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#343434',
                position: 'absolute',
                top: '48%',
                left: '5%',
                transform: 'translateY(-50%)', 
                fontSize: '100%',
                fontWeight: '600',
                letterSpacing:'0.3rem',
            }}>
                IF
            </span>

            <input
                name="value1"
                type="text"
                value={value1}
                placeholder=''
                onChange={(e) => handleInputChange('value1', e.target.value)}
                style={{
                    fontFamily: 'Montserrat, sans-serif',
                    position: 'absolute',
                    top: '15%',
                    left: '20%',
                    width: '20%',
                    height: '65%',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    textAlign: 'center',
                    fontSize: '10px'
                }}
            />
            
            <select 
                value={operation}
                onChange={(e) => handleInputChange('operation', e.target.value)}
                style={{
                    position: 'absolute',
                    top: '15%',
                    left: '45%',
                    width: '20%',
                    height: '65%',
                    fontFamily: 'Montserrat, sans-serif',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    textAlign: 'center',
                    fontSize: '10px'
                }}
            >
                <option value="==">=</option>
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
                <option value=">=">&gt;=</option>
                <option value="<=">&lt;=</option>
            </select>

            <input
                name="value2"
                type="text"
                value={value2}
                placeholder=""
                onChange={(e) => handleInputChange('value2', e.target.value)}
                style={{
                    fontFamily: 'Montserrat, sans-serif',
                    position: 'absolute',
                    top: '15%',
                    left: '70%',
                    width: '20%',
                    height: '65%',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    textAlign: 'center',
                    fontSize: '10px'
                }}
            />
        </div>
        </>
    );
}

export default IfLoop;