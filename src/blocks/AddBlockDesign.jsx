import '../assets/fonts.css';
import block from '../assets/variable.png';

function AddBlockDesign(){
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
                transform: 'translateY(-50%)', // Adjust position to be vertically centered
                fontSize: '100%',
                fontWeight: '600',
                letterSpacing:'0.1rem',
            }}>
                ADD ITEM
            </span>

            {/* FIRST INPUT TEXT */}
            <input
            type="text"
            placeholder=''
            style={{
                fontFamily: 'Montserrat, sans-serif',
                position: 'absolute',
                top: '15%',
                left: '53%',
                width: '18%',
                height: '65%',
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '20px',
                textAlign: 'center',
                fontSize: '10px'
            }}/>

            
            {/* = TEXT */}
            <span style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#343434',
                position: 'absolute',
                top: '50%',
                left: '72%',
                transform: 'translateY(-50%)', // Adjust position to be vertically centered
                fontSize: '100%',
                fontWeight: '600',
                letterSpacing:'0.1rem',
            }}>
                =
            </span>

            {/* SECOND INPUT TEXT */}
            <input
            type="text"
            placeholder=''
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
            }}/>
        </div>
        </>
    )
}

export default AddBlockDesign