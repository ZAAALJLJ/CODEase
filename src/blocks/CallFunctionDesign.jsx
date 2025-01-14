import '../assets/fonts.css';
import block from '../assets/functionBlock.png';
import { useState } from 'react';

function CallFunctionDesign({functionName, onInputChange}){
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
                letterSpacing:'0.08rem',
            }}>
                CALL FUNCTION
            </span>

            {/* FIRST INPUT TEXT */}
            <input
                type="text"
                value={functionName}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder='name'
                style={{
                    fontFamily: 'Montserrat, sans-serif',
                    position: 'absolute',
                    top: '15%',
                    left: '79%',
                    width: '18%',
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
    )
}

export default CallFunctionDesign