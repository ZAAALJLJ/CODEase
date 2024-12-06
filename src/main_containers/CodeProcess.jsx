import './CodeProcess.css'

export default function CodeProcess({ processSteps }) {
    return (
        <>
        <div className="title-container">
            <p className='title'>PROCESS</p>
        </div>
        <div className='code-place'>
            {processSteps?.map((step, index) => (
                <div key={index} className="process-step">
                    {step}
                </div>
            ))}
        </div>
        </>
    );
}