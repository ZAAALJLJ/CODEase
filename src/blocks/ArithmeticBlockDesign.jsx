import React from 'react';
import '../assets/fonts.css';
import block from '../assets/arithmeticBlock.png';

const ArithmeticBlockDesign = ({ input1, setInput1, operation, setOperation, input2, setInput2 }) => {
    return (
        <div style={{ position: 'relative', width: '200px', height: '30px' }}>
            <img src={block} alt='Block' style={{ width: '100%', height: '100%' }}/>

            <input
                type="text"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                style={{
                    fontFamily: 'Montserrat, sans-serif',
                    position: 'absolute',
                    top: '15%',
                    left: '13%',
                    width: '20%',
                    height: '65%',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    textAlign: 'center',
                    fontSize: '10px',
                }}
            />

            <select
                value={operation}
                onChange={(e) => setOperation(e.target.value)}
                style={{
                    position: 'absolute',
                    top: '15%',
                    left: '40%',
                    width: '20%',
                    height: '65%',
                    fontFamily: 'Montserrat, sans-serif',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    textAlign: 'center',
                    fontSize: '10px',
                }}
            >
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="/">&divide;</option>
                <option value="*">*</option>
                <option value="+=">+=</option>
                <option value="-=">-=</option>
            </select>

            <input
                type="text"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                style={{
                    fontFamily: 'Montserrat, sans-serif',
                    position: 'absolute',
                    top: '15%',
                    left: '68%',
                    width: '20%',
                    height: '65%',
                    backgroundColor: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    textAlign: 'center',
                    fontSize: '10px',
                }}
            />
        </div>
    );
};

export default ArithmeticBlockDesign;
