import React from 'react';
import Draggable from 'react-draggable';
import './Playground.css';

import AddBlock from '../blocks/AddBlock';
import ArithmeticBlock from '../blocks/ArithmeticBlock';
import CallFunction from '../blocks/CallFunction';
import RepeatBlockTop from '../blocks/RepeatBlockTop';
import RepeatBlockBottom from '../blocks/RepeatBlockBottom';
import IFBlockTop from '../blocks/IFBlockTop';
import IFBlockBottom from '../blocks/IFBlockBottom';
import FunctionBlock from '../blocks/FunctionBlock';
import RemoveBlock from '../blocks/RemoveBlock';
import StartBlock from '../blocks/StartBlock';
import VariableBlock from '../blocks/VariableBlock';

export default function Playground({ blocks, blockInputs, onInputsChange, onBlockMove }) {
    const handleDragStart = (e, block) => {
        if (block.blockTypeName === 'FunctionBlock') {
            return true;
        }
         const targetTag = e.target.tagName.toLowerCase();
        if (targetTag === 'input' || targetTag === 'select') {
            return false;
        }
        return true;
    };
     const renderBlock = (block) => {
        const commonProps = {
            id: block.id,
            blockInputs: blockInputs || {},
            onInputsChange: (inputs) => onInputsChange(block.id, inputs)
        };
         switch (block.blockTypeName) {
            case 'AddBlock':
                return <AddBlock {...commonProps} />;
            case 'ArithmeticBlock':
                return <ArithmeticBlock {...commonProps} />;
            case 'CallFunction':
                return <CallFunction {...commonProps} />;
            case 'IFBlockTop':
                return <IFBlockTop {...commonProps} />;
            case 'IFBlockBottom':
                return <IFBlockBottom 
                    parentId={block.parentId}
                    style={{ 
                        position: 'absolute',
                        width: '200px',
                        height: '30px'
                    }}
                />;
            case 'FunctionBlock':
                return <FunctionBlock {...commonProps} />;
            case 'RemoveBlock':
                return <RemoveBlock {...commonProps} />;
            case 'RepeatBlockTop':
                return <RepeatBlockTop {...commonProps} />;
            case 'RepeatBlockBottom':
                return <RepeatBlockBottom 
                    {...commonProps}
                    parentId={block.parentId}
                    style={{
                        position: 'absolute',
                        width: '200px',
                        height: '30px',
                    }}
                />;
            case 'StartBlock':
                return <StartBlock {...commonProps} />;
            case 'VariableBlock':
                return <VariableBlock {...commonProps} />;
            default:
                return null;
        }
    };
     // separates blocks into top-level and child blocks
    const topLevelBlocks = blocks.filter(block => !block.parentId);
    const childBlocks = blocks.filter(block => block.parentId);
     console.log('Rendering blocks:', {
        total: blocks.length,
        topLevel: topLevelBlocks.length,
        children: childBlocks.length,
        parentIds: childBlocks.map(b => b.parentId)
    });
     return (
        <div className="play-container">
            <div className="scrollable-content">
                {topLevelBlocks.map((block) => (
                    <Draggable
                        key={block.id}
                        defaultPosition={{ x: block.x, y: block.y }}
                        onStop={(e, data) => onBlockMove(block.id, data.x, data.y)}
                        onStart={(e) => handleDragStart(e, block)}
                        cancel="input, select, [contentEditable='true']"
                    >
                        <div className="draggable-block">
                            {renderBlock(block)}
                        </div>
                    </Draggable>
                ))}
                {/* renders child blocks separately */}
                {childBlocks.map((block) => {
                    const parentBlock = blocks.find(b => b.id === block.parentId);
                    if (!parentBlock) return null;
                     return (
                        <Draggable
                            key={block.id}
                            defaultPosition={{ 
                                x: block.x, 
                                y: block.y
                            }}
                            onStop={(e, data) => onBlockMove(block.id, data.x, data.y)}
                            onStart={(e) => handleDragStart(e, block)}
                            cancel="input, select, [contentEditable='true']"
                        >
                            <div 
                                className="draggable-block"
                                style={{
                                    position: 'absolute',
                                    zIndex: 1
                                }}
                            >
                                {renderBlock(block)}
                            </div>
                        </Draggable>
                    );
                })}
            </div>
        </div>
    );
}