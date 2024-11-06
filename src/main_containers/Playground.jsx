import Draggable from 'react-draggable';
import './Playground.css';

export default function Playground({ blocks }) {
    return (
        <div className="play-container">
            <div className="scrollable-content">
                {blocks.map((BlockComponent, index) => (
                    <Draggable key={index}>
                        <div className="draggable-block">
                            {BlockComponent}
                        </div>
                    </Draggable>
                ))}
            </div>
        </div>
    );
}
