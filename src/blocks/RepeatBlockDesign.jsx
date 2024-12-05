import '../assets/fonts.css';
import block from '../assets/forBlock.png';  // Reusing the forBlock image for now
import { useState } from 'react';

function RepeatBlockDesign({ id, onInputsChange, inputs = {} }) {
    const [iterations, setIterations] = useState(inputs.iterations || '');

    const handleInputChange = (value) => {
        setIterations(value);
        onInputsChange?.({
            iterations: value,
            type: 'RepeatBlockTop',
            id: id
        });
    };

    return (
        <>
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
                REPEAT
            </span>
            <input
                type="text"
                value={iterations}
                placeholder=''
                onChange={(e) => handleInputChange(e.target.value)}
                style={{
                    fontFamily: 'Montserrat, sans-serif',
                    position: 'absolute',
                    top: '15%',
                    left: '60%',
                    width: '30%',
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

export default RepeatBlockDesign; 