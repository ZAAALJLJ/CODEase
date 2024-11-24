import '../assets/fonts.css';
import block from '../assets/arithmeticBlock.png';

function ArithmeticBlockDesign(){
    return(
        <>
        <div style={{position: 'relative', width: '200px', height: '30px'}}>
            <img src={block} alt='Block' style={{width: '100%', height: '100%'}}/>

            {/* FIRST INPUT TEXT */}
            <input
            type="text"
            placeholder=''
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
                fontSize: '10px'
            }}/>

            {/* ARITHMETIC COMPARISON DROPDOWN */}
            <select style={{
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
                fontSize: '10px'
            }}>
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="x">X</option>
                <option value="/">&divide;</option>
                <option value="*">*</option>
            </select>

            {/* SECOND INPUT TEXT */}
            <input
            type="text"
            placeholder=''
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
                fontSize: '10px'
            }}/>
        </div>
        </>
    )
}

export default ArithmeticBlockDesign