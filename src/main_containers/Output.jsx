import { useEffect, useRef } from 'react';
import './Output.css';

export default function Output({ executionOutput }) {
    const outputRef = useRef(null);

    useEffect(() => {
        if (outputRef.current) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [executionOutput]);

    return (
        <div className="output-container" ref={outputRef}>
            <div className="output-title">OUTPUT</div>
            {executionOutput.map((output, index) => (
                <div key={index} className="output-line">
                    {output}
                </div>
            ))}
        </div>
    );
}