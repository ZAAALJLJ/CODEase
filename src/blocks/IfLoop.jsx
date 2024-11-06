import '../assets/fonts.css';
import block from '../assets/ifBlock.png';
function IfLoop() {
    return (
        <>
        <div style={{position: 'relative', width: '200px', height: '30px'}}>
            <img src={block} alt='Block' style={{width: '100%', height: '100%'}}/>

            {/* IF TEXT */}
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

            {/* FIRST INPUT TEXT */}
            {/* Pwede gawing class para umigsi */}
            <input
            type="text"
            placeholder=''
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
            
            {/* SIGN COMPARISON DROPDOWN */}
            <select style={{
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
            }}>
                <option value="==">==</option>
                <option value=">">==</option>
                <option value="<">==</option>
            </select>

            {/* SECOND INPUT TEXT*/}
            {/* Pwede gawing class para umigsi */}
            <input
                type='text'
                placeholder=""
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
                    fontSize: '10px',  
                }}    
            />
        </div>
        </>
    );
}

export default IfLoop