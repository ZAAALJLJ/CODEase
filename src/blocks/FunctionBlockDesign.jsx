import '../assets/fonts.css';
import block from '../assets/functionBlock.png';
import { useState } from 'react';

function FunctionBlockDesign({ id, onInputsChange }){
    const [functionName, setFunctionName] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value.trim();
        setFunctionName(value);
        
        onInputsChange?.({
            functionName: value,
            type: 'function'
        });
    };

    return(
        <div style={{position: 'relative', width: '200px', height: '30px'}}>
            <img src={block} alt='Block' style={{width: '100%', height: '100%'}}/>
            <span style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#343434',
                position: 'absolute',
                top: '50%',
                left: '10%',
                transform: 'translateY(-50%)',
                fontSize: '100%',
                fontWeight: '600',
                letterSpacing:'0.3rem',
            }}>
                FUNCTION
            </span>

            <input
                type="text"
                value={functionName}
                onChange={handleInputChange}
                placeholder='name'
                style={{
                    fontFamily: 'Montserrat, sans-serif',
                    position: 'absolute',
                    top: '15%',
                    left: '75%',
                    width: '18%',
                    height: '65%',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    textAlign: 'center',
                    fontSize: '10px',
                    zIndex: 2
                }}
            />
        </div>
    );
}

export default FunctionBlockDesign;