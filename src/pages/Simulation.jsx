import { useState } from 'react';
import './Simulation.css';
import Functions from '../main_containers/Functions';
import Playground from '../main_containers/Playground';
import CodeProcess from '../main_containers/CodeProcess';
import Output from '../main_containers/Output';

export default function Simulation() {
  const [blocks, setBlocks] = useState([]);

  const handleBlockAdd = (block) => {
    // Log a message to the terminal when a block is clicked
    console.log('Block added to Playground:', block.type.name); // Logs the name of the block component
    setBlocks((prevBlocks) => [...prevBlocks, block]);
  };

  return (
    <div className="s-container">
      <div className="left">
        <Functions onBlockAdd={handleBlockAdd} />
      </div>
      <div className="center">
        <Playground blocks={blocks} />
      </div>
      <div className="right">
        <div className="top">
          <CodeProcess />
        </div>
        <div className="bottom">
          <Output />
        </div>
      </div>
    </div>
  );
}
