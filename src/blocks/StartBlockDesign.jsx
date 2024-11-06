import '../assets/fonts.css';
import block from '../assets/startBlock.png';

function StartBlockDesign(){
    return(
        <>
        <div style={{position: 'relative', width: '200px', height: '65.5px'}}>
            <img src={block} alt='Block' style={{width: '100%', height: '100%'}}/>

            {/* START TEXT */}
            <span style={{
                fontFamily: 'Poppins, sans-serif',
                color: '#343434',
                position: 'absolute',
                top: '77%',
                left: '13%',
                transform: 'translateY(-50%)',
                fontSize: '100%',
                fontWeight: '600',
                letterSpacing:'0.3rem',
            }}>
                START
            </span>
        </div>
        </>
    )
}

export default StartBlockDesign