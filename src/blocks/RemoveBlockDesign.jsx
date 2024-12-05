import '../assets/fonts.css';
import block from '../assets/variable.png';
import { useState } from 'react';
function RemoveBlockDesign({onInputsChange}){
    const [arrayName, setArrayName] = useState('');

    const handleInputChange = (value) => {
        setArrayName(value);
        onInputsChange?.({ value1: value });  
        console.log('Remove block input:', value); 
    };

    return(
        <>
        <div style={{position: 'relative', width: '200px', height: '30px'}}>
            <img src={block} alt='Block' style={{width: '100%', height: '100%'}}/>

            {/* ADD TEXT */}
            <span style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#343434',
                position: 'absolute',
                top: '50%',
                left: '5%',
                transform: 'translateY(-50%)', 
                fontSize: '100%',
                fontWeight: '600',
                letterSpacing:'0.2rem',
            }}>
                REMOVE ITEM
            </span>

            {/* FIRST INPUT TEXT */}
            <input
            type="text"
            placeholder=''
            onChange={(e) => handleInputChange(e.target.value)} // send array name to simulatoin
            style={{
                fontFamily: 'Montserrat, sans-serif',
                position: 'absolute',
                top: '15%',
                left: '78%',
                width: '18%',
                height: '65%',
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '20px',
                textAlign: 'center',
                fontSize: '10px'
            }}/>
        </div>
        </>
    )
}

export default RemoveBlockDesign