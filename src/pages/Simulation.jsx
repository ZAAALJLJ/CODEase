import { useState } from 'react';
import './Simulation.css';
import Functions from '../main_containers/Functions';
import Playground from '../main_containers/Playground';
import CodeProcess from '../main_containers/CodeProcess';
import Output from '../main_containers/Output';

const rot13Cipher = (str) => {
    if (typeof str !== 'string') return str; // cipher only strings
    return str.replace(/[a-zA-Z]/g, function(char) {
        return String.fromCharCode(
            (char <= 'Z' ? 90 : 122) >= (char = char.charCodeAt(0) + 13) 
            ? char 
            : char - 26
        );
    });
};

const rot13Decipher = rot13Cipher; 

export default function Simulation() {
    const [blocks, setBlocks] = useState([]);
    const [blockInputs, setBlockInputs] = useState({});
    const [variables, setVariables] = useState({});
    const [processSteps, setProcessSteps] = useState([]);
    const [connections, setConnections] = useState([]);
    const [functions, setFunctions] = useState({});
    const [localFunctions, setLocalFunctions] = useState({});
    const [functionDefinitions, setFunctionDefinitions] = useState({});
    const [outputSteps, setOutputSteps] = useState([]);

    const evaluateCondition = (inputs, variables) => {
        if (!inputs.value1 || !inputs.value2 || !inputs.operation) {
            console.log('Condition validation failed:', {
                inputs,
                variables,
                missingInputs: {
                    value1: !inputs.value1,
                    value2: !inputs.value2,
                    operation: !inputs.operation
                }
            });
            return false;
        }
    
        let value1 = inputs.value1.trim();
        let value2 = inputs.value2.trim();
    
        console.log('Evaluating condition with:', {
            originalValue1: value1,
            originalValue2: value2,
            availableVariables: variables
        });
    
        // checks if values are variables and get their values
        if (value1 in variables) {
            value1 = variables[value1];
            // decipher if string
            if (typeof value1 === 'string') {
                value1 = rot13Decipher(value1);
            }
            console.log(`Found variable ${inputs.value1}:`, value1);
        }
        if (value2 in variables) {
            value2 = variables[value2];
            if (typeof value2 === 'string') {
                value2 = rot13Decipher(value2);
            }
            console.log(`Found variable ${inputs.value2}:`, value2);
        }
    
        // converts to numbers if possible
        if (!isNaN(value1)) value1 = parseFloat(value1);
        if (!isNaN(value2)) value2 = parseFloat(value2);
    
        console.log('Final values for comparison:', {
            value1,
            value2,
            operation: inputs.operation
        });
    
        switch (inputs.operation) {
            case '==': return value1 == value2;
            case '!=': return value1 != value2;
            case '>': return value1 > value2;
            case '<': return value1 < value2;
            case '>=': return value1 >= value2;
            case '<=': return value1 <= value2;
            default: return false;
        }
    };

    const handleInputsChange = (id, inputs) => {
        console.log('handleInputsChange received:', {
            id,
            inputs,
            currentBlockInputs: blockInputs,
            currentFunctions: functionDefinitions
        });
        
        setBlockInputs(prev => ({
            ...prev,
            [id]: inputs
        }));

        if (inputs.type === 'function') { // handles function definitions
            const functionName = inputs.functionName?.trim();
            if (functionName) {
                const functionBlock = blocks.find(b => b.id === id);
                if (functionBlock) { // finds all blocks below this function block until the next function block
                    const nextFunctionBlock = blocks.find(block => 
                        block.blockTypeName === 'FunctionBlock' && 
                        block.y > functionBlock.y && 
                        Math.abs(block.x - functionBlock.x) < 50
                    );
                     const associatedBlocks = blocks.filter(block => 
                        block.y > functionBlock.y && 
                        (!nextFunctionBlock || block.y < nextFunctionBlock.y) &&
                        Math.abs(block.x - functionBlock.x) < 50 &&
                        block.id !== id &&
                        block.blockTypeName !== 'FunctionBlock'
                    );
                     console.log('Function definition update:', {
                        functionName,
                        associatedBlocks: associatedBlocks.map(b => ({
                            id: b.id,
                            type: b.blockTypeName,
                            y: b.y
                        })),
                        nextFunctionBlock: nextFunctionBlock?.id
                    });
                     setFunctionDefinitions(prev => ({
                        ...prev,
                        [functionName]: {
                            blocks: associatedBlocks,
                            inputs: blockInputs,
                            functionBlockId: id
                        }
                    }));
                }
            }
        }
    };

    const handleClearBlocks = async () => {
        setBlocks([]);
        setBlockInputs({});
        setVariables({});
        setProcessSteps([]);
        setOutputSteps([]);
        setConnections([]);
        setFunctions({});
        setLocalFunctions({});
        setFunctionDefinitions({});
    };
    

    const handleBlockAdd = async (block) => {
        console.log('Block added to Playground:', block.type.name);
    
        // only one startBlock
        if (block.type.name === 'StartBlock' && blocks.some(b => b.blockTypeName === 'StartBlock')) {
            alert('Only one StartBlock is allowed.');
            return;
        }
    
        // find the last added IF/Repeat block that doesnt w/ no bottom
        const lastTopBlock = [...blocks].reverse().find(b => 
            (b.blockTypeName === 'IFBlockTop' || b.blockTypeName === 'RepeatBlockTop') &&
            !blocks.some(bottom => 
                (bottom.blockTypeName === 'IFBlockBottom' || bottom.blockTypeName === 'RepeatBlockBottom') &&
                bottom.parentId === b.id
            )
        );
    
        // find the last IF/Repeat block bottom
        const lastBottomBlock = [...blocks].reverse().find(b => 
            (b.blockTypeName === 'IFBlockBottom' || b.blockTypeName === 'RepeatBlockBottom') &&
            !b.isInsideIf && !b.isInsideRepeat  //  bottom blocks that na di nasa loob ng if/repeat
        );
    
        let newYPosition;
        if (lastTopBlock) {
            // ff there's a top block without a bottom, tuloy hanap blocks sa area
            const blocksInSameArea = blocks.filter(b => 
                b.parentId === lastTopBlock.id && 
                (b.isInsideIf || b.isInsideRepeat)
            );
            
            // check for first block inside the IF/Repeat area
            const isFirstBlockInArea = blocksInSameArea.length === 0;
            
            newYPosition = blocksInSameArea.length > 0 
                ? Math.max(...blocksInSameArea.map(b => b.y)) + 35 
                : lastTopBlock.y + (isFirstBlockInArea ? 5 : 35);
        } else {
            // blocks in the main flow/startblock thats not inside if/repeat
            const mainFlowBlocks = blocks.filter(b => 
                !b.isInsideIf && 
                !b.isInsideRepeat && 
                !['IFBlockTop', 'RepeatBlockTop', 'IFBlockBottom', 'RepeatBlockBottom'].includes(b.blockTypeName)
            );

            if (lastBottomBlock) { 
                // all blocks after the bottom block, bottom block = ifbottom/repeatbottom
                const blocksAfterBottom = blocks.filter(b => 
                    b.y > lastBottomBlock.y && 
                    !b.isInsideIf && 
                    !b.isInsideRepeat &&
                    !['IFBlockBottom', 'RepeatBlockBottom'].includes(b.blockTypeName)
                );

                // 35px for the next block na maaadd after if/repeatbottom for visual purpose
                newYPosition = lastBottomBlock.y + 35;

                // make sure the added blocks after bottom are below
                if (blocksAfterBottom.length > 0) {
                    newYPosition = Math.max(
                        newYPosition,
                        Math.max(...blocksAfterBottom.map(b => b.y)) + 5
                    );
                }
            } else {
                // If no bottom block, use regular spacing
                newYPosition = blocks.length > 0 
                    ? Math.max(...mainFlowBlocks.map(b => b.y)) + 5
                    : 0;
            }
        }
    
        if (block.type.name === 'IFBlockTop') {
            const topBlockId = block.id || `IFTop-${Date.now()}`;
            const topBlockData = {
                blockTypeName: 'IFBlockTop',
                id: topBlockId,
                x: block.x || 0,
                y: newYPosition,
                nextBlockId: null,
                previousBlockId: null,
                parentId: null
            };
    
            setBlocks(prevBlocks => [...prevBlocks, topBlockData]);
    
            try {
                await fetch('http://localhost:8000/addBlock', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(topBlockData)
                });
            } catch (error) {
                console.error('Error adding IFBlockTop:', error);
            }
        }
        else if (block.type.name === 'RepeatBlockTop') {
            const topBlockId = block.id || `RepeatTop-${Date.now()}`;
            const topBlockData = {
                blockTypeName: 'RepeatBlockTop',
                id: topBlockId,
                x: block.x || 0,
                y: newYPosition,
                nextBlockId: null,
                previousBlockId: null,
                parentId: null
            };
    
            setBlocks(prevBlocks => [...prevBlocks, topBlockData]);
    
            try {
                await fetch('http://localhost:8000/addBlock', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(topBlockData)
                });
            } catch (error) {
                console.error('Error adding RepeatBlockTop:', error);
            }
        }
        else if (block.type.name === 'IFBlockBottom') {
            const correspondingIFBlockTop = blocks.find(b => b.blockTypeName === 'IFBlockTop');
            if (!correspondingIFBlockTop) {
                alert('Please add an IFBlockTop first before adding an IFBlockBottom.');
                return;
            }

            // last block inside if area
            const blocksInIFArea = blocks.filter(b => 
                b.parentId === correspondingIFBlockTop.id && 
                b.isInsideIf
            );

            // handles position of bottom block
            const bottomYPosition = blocksInIFArea.length > 0
                ? Math.max(...blocksInIFArea.map(b => b.y)) + 35 // 35px gap instead of 5 for visual purposes
                : correspondingIFBlockTop.y + 40;

            const blockData = {
                blockTypeName: 'IFBlockBottom',
                id: block.id || `IFBottom-${Date.now()}`,
                x: correspondingIFBlockTop.x || 0,
                y: bottomYPosition,
                parentId: correspondingIFBlockTop.id,
                nextBlockId: null,
                previousBlockId: null,
                isInsideIf: false,
                isFixed: true,  // added this but didn't work
                bottomPosition: true  
            };

            setBlocks(prevBlocks => [...prevBlocks, blockData]);

            try {
                await fetch('http://localhost:8000/addBlock', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(blockData)
                });
            } catch (error) {
                console.error('Error adding IFBlockBottom:', error);
            }
        }
        else if (block.type.name === 'RepeatBlockBottom') {
            const correspondingRepeatBlockTop = blocks.find(b => b.blockTypeName === 'RepeatBlockTop');
            if (!correspondingRepeatBlockTop) {
                alert('Please add a RepeatBlockTop first before adding a RepeatBlockBottom.');
                return;
            }
    
            const blockData = {
                blockTypeName: 'RepeatBlockBottom',
                id: block.id || `RepeatBottom-${Date.now()}`,
                x: correspondingRepeatBlockTop.x || 0,
                y: correspondingRepeatBlockTop.y + 35,
                parentId: correspondingRepeatBlockTop.id,
                nextBlockId: null,
                previousBlockId: null
            };
    
            setBlocks(prevBlocks => [...prevBlocks, blockData]);
    
            try {
                await fetch('http://localhost:8000/addBlock', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(blockData)
                });
            } catch (error) {
                console.error('Error adding RepeatBlockBottom:', error);
            }
        }
        else {
            const blockData = {
                blockTypeName: block.type.name,
                id: block.id || `${block.type.name}-${Date.now()}`,
                x: block.x || 0,
                y: newYPosition,
                nextBlockId: null,
                previousBlockId: null,
                parentId: null,
                isInsideIf: false,
                isInsideRepeat: false,
                isBeingProcessed: false, 
                shouldSkip: false
            };

            // set parent id IF mag aadd inside if/repeat area
            if (lastTopBlock && !lastBottomBlock) {
                blockData.x = lastTopBlock.x;
                blockData.parentId = lastTopBlock.id;
                
                // check if lastTopBlock is inside an IF block
                const parentIfBlock = blocks.find(b => 
                    b.blockTypeName === 'IFBlockTop' && 
                    lastTopBlock.parentId === b.id
                );
                
                if (parentIfBlock) {
                    blockData.parentId = parentIfBlock.id;
                    blockData.isInsideIf = true;
                } else {
                    blockData.isInsideIf = lastTopBlock.blockTypeName === 'IFBlockTop';
                    blockData.isInsideRepeat = lastTopBlock.blockTypeName === 'RepeatBlockTop';
                }
            } else if (lastBottomBlock) {
                const startBlock = blocks.find(b => b.blockTypeName === 'StartBlock');
                if (startBlock) {
                    blockData.x = startBlock.x;
                }
            }

            setBlocks(prevBlocks => [...prevBlocks, blockData]);
    
            try {
                await fetch('http://localhost:8000/addBlock', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(blockData)
                });
            } catch (error) {
                console.error('Error adding block:', error);
            }
        }
    };
    
    const handleBlockMove = (id, x, y) => {
        if (!id || x === undefined || y === undefined) {
            console.error('Invalid block move parameters:', { id, x, y });
            return;
        }

        console.log('Block move started:', { id, x, y });

        setBlocks((prevBlocks) => {
            const movedBlock = prevBlocks.find((b) => b.id === id);
            const ifBlocks = prevBlocks.filter((b) => b.blockTypeName === 'IFBlockTop');
            const repeatBlocks = prevBlocks.filter((b) => b.blockTypeName === 'RepeatBlockTop');

            let parentIfBlock = null;
            let parentRepeatBlock = null;
            let isInsideIf = false;
            let isInsideRepeat = false;

            // handle if block movement
            if (movedBlock?.blockTypeName === 'IFBlockTop') {
                const updatedBlocks = prevBlocks.map((block) => {
                    if (block.id === id) {
                        return { ...block, x, y };
                    }
                    // align bottom block with top block
                    if (block.blockTypeName === 'IFBlockBottom' && block.parentId === id) {
                        return { ...block, x };
                    }
                    // move all blocks inside IF area with the top block
                    if (block.parentId === id && block.isInsideIf) {
                        return { ...block, x };
                    }
                    return block;
                });
                return updatedBlocks;
            }

            // checks if block is inside if area
            if (movedBlock?.blockTypeName !== 'IFBlockTop' && movedBlock?.blockTypeName !== 'IFBlockBottom') {
                for (const ifBlock of ifBlocks) {
                    const correspondingBottom = prevBlocks.find(
                        (b) => b.blockTypeName === 'IFBlockBottom' && b.parentId === ifBlock.id
                    );

                    if (!correspondingBottom) continue;

                    const ifAreaTop = ifBlock.y + 40;
                    const ifAreaBottom = correspondingBottom.y;
                    const ifAreaLeft = ifBlock.x - 80;
                    const ifAreaRight = ifBlock.x + 80;

                    // check if block was inside IF block
                    const wasInsideThisIf = movedBlock.parentId === ifBlock.id;
                    const distanceFromIf = Math.abs(x - ifBlock.x);
                    const isFarFromParent = distanceFromIf > 150;

                    const isInsideIfBlock =
                        y > ifAreaTop && y < ifAreaBottom && x >= ifAreaLeft && x <= ifAreaRight;

                    if (isInsideIfBlock || (wasInsideThisIf && !isFarFromParent)) {
                        parentIfBlock = ifBlock;
                        isInsideIf = true;
                        break;
                    }
                }
            }

            // check if block is inside repeat area
            if (movedBlock?.blockTypeName !== 'RepeatBlockTop' && movedBlock?.blockTypeName !== 'RepeatBlockBottom') {
                for (const repeatBlock of repeatBlocks) {
                    const correspondingBottom = prevBlocks.find(
                        (b) => b.blockTypeName === 'RepeatBlockBottom' && b.parentId === repeatBlock.id
                    );

                    if (!correspondingBottom) continue;

                    const repeatAreaTop = repeatBlock.y + 40;
                    const repeatAreaBottom = correspondingBottom.y;
                    const repeatAreaLeft = repeatBlock.x - 80;
                    const repeatAreaRight = repeatBlock.x + 80;

                    const wasInsideThisRepeat = movedBlock.parentId === repeatBlock.id;
                    const distanceFromRepeat = Math.abs(x - repeatBlock.x);
                    const isFarFromParent = distanceFromRepeat > 150;

                    const isInsideRepeatBlock =
                        y > repeatAreaTop && y < repeatAreaBottom && x >= repeatAreaLeft && x <= repeatAreaRight;

                    if (isInsideRepeatBlock || (wasInsideThisRepeat && !isFarFromParent)) {
                        parentRepeatBlock = repeatBlock;
                        isInsideRepeat = true;
                        break;
                    }
                }
            }

            // update block position at connections
            const updatedBlocks = prevBlocks.map((block) => {
                if (block.id === id) {
                    // keep parentid unless lumagpas 100px gap
                    const currentParent = prevBlocks.find(b => b.id === block.parentId);
                    const keepParent = currentParent && Math.abs(x - currentParent.x) < 100;

                    return {
                        ...block,
                        x,
                        y,
                        parentId: keepParent ? block.parentId : 
                             (parentIfBlock ? parentIfBlock.id : 
                              parentRepeatBlock ? parentRepeatBlock.id : null),
                        isInsideIf: keepParent ? block.isInsideIf : isInsideIf,
                        isInsideRepeat: keepParent ? block.isInsideRepeat : isInsideRepeat,
                        nextBlockId: isInsideIf || isInsideRepeat ? null : block.nextBlockId,
                        previousBlockId: isInsideIf || isInsideRepeat ? null : block.previousBlockId,
                        inputs: block.inputs,
                    };
                }
                return block;
            });

            fetch('http://localhost:8000/updatePosition', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    x,
                    y,
                    parentId: movedBlock.parentId,
                    isInsideIf: movedBlock.isInsideIf,
                    isInsideRepeat: movedBlock.isInsideRepeat,
                    inputs: movedBlock.inputs,
                }),
            }).catch((error) => console.error('Error updating position:', error));

            return updatedBlocks;
        });
    };
    
    const handleRunBlocks = (blockList = blocks, currentVariables = {}) => {
        let programVariables = { ...currentVariables };
        let process = [];
        let outputs = [];
    
        console.log('Starting block execution:', {
            allBlocks: blockList,
            functionDefs: functionDefinitions,
            variables: programVariables
        });
        
        const isFunctionExecution = blockList.length === 1 && 
            blockList[0].blockTypeName !== 'StartBlock' &&
            blockList[0].blockTypeName !== 'FunctionBlock';
    
        let blocksToProcess = [];
    
        if (isFunctionExecution || blockList.length !== blocks.length) {
            blocksToProcess = blockList.sort((a, b) => a.y - b.y);
        } else {
            const startBlock = blockList.find(b => b.blockTypeName === 'StartBlock');
            if (!startBlock) {
                process.push('Error: No start block found');
                return { process, outputs, variables: programVariables };
            }
    
            blocksToProcess = blockList
                .filter(block => {
                    // skip blocks too far from previous block
                    if (block.blockTypeName !== 'StartBlock') {
                        const prevBlocks = blockList.filter(b => 
                            !b.isInsideIf && 
                            !b.isInsideRepeat && 
                            b.y < block.y && 
                            Math.abs(b.x - startBlock.x) < 20
                        );
                        
                        if (prevBlocks.length > 0) {
                            const closestBlock = prevBlocks.reduce((prev, curr) => 
                                prev.y > curr.y ? prev : curr
                            );
                            if (block.y - closestBlock.y > 100) {
                                return false;
                            }
                        } else if (block.y - startBlock.y > 100) {
                            return false;
                        }
                    }

                    if (block.parentId) {
                        const parentBlock = blockList.find(b => b.id === block.parentId);
                        if (parentBlock?.blockTypeName === 'IFBlockTop') {
                            const ifInputs = blockInputs[parentBlock.id];
                            const ifCondition = evaluateCondition(ifInputs, programVariables);
                            if (!ifCondition) {
                                return false;
                            }
                        }
                    }
                    
                    if (block.isInsideIf || block.isInsideRepeat) {
                        return false;
                    }
                    
                    return Math.abs(block.x - startBlock.x) < 20;
                })
                .sort((a, b) => a.y - b.y);
        }
    
        console.log('Blocks to process:', blocksToProcess.map(b => b.blockTypeName));
    
        for (const block of blocksToProcess) {
            const inputs = blockInputs[block.id];
            console.log('Processing block:', {
                type: block.blockTypeName,
                id: block.id,
                inputs
            });
            
            switch (block.blockTypeName) {
                case 'StartBlock':
                    break;

                case 'VariableBlock':
                    if (inputs) {
                        const { variableName, variableValue } = inputs;  
                        console.log('Processing Variable Block:', { 
                            variableName, 
                            variableValue, 
                            currentVars: programVariables,
                            rawInputs: inputs
                        });
                        
                        if (variableName && variableValue !== undefined) {
                            const processedValue = !isNaN(variableValue)  
                                ? parseFloat(variableValue) 
                                : rot13Cipher(variableValue);
                            programVariables[variableName.trim()] = processedValue;

                            const displayValue = typeof processedValue === 'string' 
                                ? rot13Decipher(processedValue) // decipher na bago i-display
                                : processedValue;
                            outputs.push(`${variableName} = ${displayValue}`);
                            process.push(`Set variable ${variableName}`);
                            console.log('Variable set successfully:', { 
                                name: variableName, 
                                value: processedValue, 
                                allVars: programVariables 
                            });
                        } else {
                            console.log('Variable block validation failed:', {
                                hasName: Boolean(variableName),
                                hasValue: variableValue !== undefined,
                                inputs
                            });
                        }
                    } else {
                        console.log('No inputs found for variable block');
                    }
                    break;

                case 'IFBlockTop':
                    if (inputs) {
                        const condition = evaluateCondition(inputs, programVariables);
                        process.push(`Evaluating IF condition: ${inputs.value1} ${inputs.operation} ${inputs.value2}`);
                
                        if (condition) {
                            process.push('IF condition is TRUE');
                            
                            const ifBottom = blockList.find(b => 
                                b.blockTypeName === 'IFBlockBottom' && 
                                b.parentId === block.id
                            );
                            
                            // oncly include blocks na marked as inside the if area
                            const innerBlocks = blockList.filter(b => 
                                b.y > block.y && 
                                (!ifBottom || b.y < ifBottom.y) &&
                                Math.abs(b.x - block.x) < 80 &&
                                b.id !== block.id &&
                                b.id !== ifBottom?.id &&
                                !b.isInsideRepeat 
                            ).sort((a, b) => a.y - b.y);
                            
                            console.log('Blocks in IF area:', innerBlocks);
                
                            if (innerBlocks.length > 0) {
                                const ifContext = { ...programVariables };
                                const ifResult = handleRunBlocks(innerBlocks, ifContext);
                                programVariables = { ...programVariables, ...ifResult.variables };
                                outputs.push(...ifResult.outputs);
                            } else {
                                process.push('No blocks found inside IF area.');
                            }
                        } else {
                            process.push('IF condition is FALSE - skipping blocks inside IF area.');
                        }
                    }
                    break;
                    
                case 'IFBlockBottom':
                    break;

                case 'RepeatBlockTop':
                    if (inputs) {
                        // check if nasa loob ng if block
                        for (const ifBlock of blockList.filter(b => b.blockTypeName === 'IFBlockTop')) {
                            const ifBottom = blockList.find(b => 
                                b.blockTypeName === 'IFBlockBottom' && 
                                b.parentId === ifBlock.id
                            );
                            
                            if (!ifBottom) continue;

                            const isInsideIfArea = 
                                block.y > ifBlock.y && 
                                block.y < ifBottom.y && 
                                Math.abs(block.x - ifBlock.x) < 80;

                            if (isInsideIfArea) {
                                const ifInputs = blockInputs[ifBlock.id];
                                const ifCondition = evaluateCondition(ifInputs, programVariables);
                                if (!ifCondition) {
                                    return { process, outputs, variables: programVariables };
                                }
                            }
                        }

                        let iterations;
                        if (inputs.iterations in programVariables) {
                            iterations = parseInt(programVariables[inputs.iterations], 10);
                        } else {
                            iterations = parseInt(inputs.iterations, 10);
                        }

                        if (isNaN(iterations)) {
                            process.push('Error: Invalid number of iterations');
                            break;
                        }

                        process.push(`Repeat block will iterate ${iterations} times`);

                        if (iterations > 0) {
                            const repeatBottom = blockList.find(b => 
                                b.blockTypeName === 'RepeatBlockBottom' && 
                                b.parentId === block.id
                            );

                            const innerBlocks = blockList.filter(b => 
                                b.y > block.y && 
                                (!repeatBottom || b.y < repeatBottom.y) &&
                                Math.abs(b.x - block.x) < 80 &&
                                b.id !== block.id &&
                                b.id !== repeatBottom?.id
                            ).sort((a, b) => a.y - b.y);

                            console.log('Blocks in Repeat area:', {
                                iterations,
                                blockCount: innerBlocks.length,
                                blocks: innerBlocks
                            });

                            if (innerBlocks.length > 0) {
                                // get variables from main 
                                const originalVars = { ...programVariables };
                                
                                for (let i = 0; i < iterations; i++) {
                                    let iterationContext = { ...originalVars };
                                    
                                    const iterationResult = handleRunBlocks(innerBlocks, iterationContext);
                                    
                                    programVariables = { ...programVariables, ...iterationResult.variables };
                                    outputs.push(...iterationResult.outputs);
                                }
                            } else {
                                process.push('No blocks found inside Repeat area');
                            }
                        } else {
                            process.push('Repeat block skipped: iterations must be greater than 0');
                        }
                    }
                    break;
                    
                case 'RepeatBlockBottom':
                    break;
                
                case 'AddBlock':
                    if (inputs) {
                        let arrayName = inputs.value1?.trim();
                        let element = inputs.value2;

                        const targetArray = arrayName in programVariables ? arrayName : arrayName; // fixed checker

                        if (element in programVariables) {
                            element = programVariables[element];
                        }

                        console.log('Processing AddBlock:', {
                            arrayName,
                            element,
                            currentVars: programVariables
                        });

                        if (!arrayName) {
                            process.push('Error: Array name is required');
                            break;
                        }

                        try {
                            if (!(arrayName in programVariables)) {
                                programVariables[arrayName] = [];
                            }

                            if (!Array.isArray(programVariables[arrayName])) {
                                programVariables[arrayName] = [];
                            }

                            // parse element pag num
                            let parsedElement = !isNaN(parseFloat(element)) ? 
                                parseFloat(element) : element;

                            programVariables[arrayName].push(parsedElement);
                            process.push(`Added ${parsedElement} to ${arrayName}`);
                            outputs.push(`${arrayName} = [${programVariables[arrayName]}]`);
                            
                            console.log('After AddBlock execution:', {
                                arrayName,
                                currentArray: programVariables[arrayName],
                                allVars: programVariables
                            });
                        } catch (error) {
                            process.push(`Error: ${error.message}`);
                            console.error('AddBlock error:', error);
                        }
                    }
                    break;
    
                case 'ArithmeticBlock':
                    if (inputs) {
                        let value1 = inputs.value1?.trim();
                        let value2 = inputs.value2?.trim();

                        let originalValue1;
                        if (value1 in programVariables) {
                            originalValue1 = value1;
                            value1 = programVariables[value1];
                        } else if (value1 && !isNaN(parseFloat(value1))) {
                            value1 = parseFloat(value1);
                        } else if (value1) {
                            process.push(`Variable '${inputs.value1}' is not defined`);
                            return { process, outputs, variables: programVariables };
                        }

                        if (value2 in programVariables) {
                            value2 = programVariables[value2];
                        } else if (value2 && !isNaN(parseFloat(value2))) {
                            value2 = parseFloat(value2);
                        } else if (value2) {
                            process.push(`Error: Variable '${inputs.value2}' is not defined`);
                            return { process, outputs, variables: programVariables };
                        }

                        let result;
                        switch (inputs.operation) {
                            case '+': result = value1 + value2; break;
                            case '-': result = value1 - value2; break;
                            case '*': result = value1 * value2; break;
                            case '/': result = value2 !== 0 ? value1 / value2 : 'Error: Division by zero'; break;
                            case '+=': 
                                if (originalValue1) {
                                    result = value1 + value2;
                                    programVariables[originalValue1] = result;
                                } else {
                                    result = 'Error: += requires a variable';
                                }
                                break;
                            case '-=': 
                                if (originalValue1) {
                                    result = value1 - value2;
                                    programVariables[originalValue1] = result;
                                } else {
                                    result = 'Error: -= requires a variable';
                                }
                                break;
                            default: result = 'Invalid operation';
                        }

                        outputs.push(`${inputs.value1} ${inputs.operation} ${inputs.value2} = ${result}`);
                        process.push('Arithmetic operation completed');
                    }
                    break;

                case 'FunctionBlock':
                    if (inputs?.functionName) {
                        const functionName = inputs.functionName.trim();
                        const functionBlocks = blockList.filter(b => 
                            b.y > block.y && 
                            Math.abs(b.x - block.x) < 50 && 
                            b.id !== block.id
                        );
        
                        setFunctionDefinitions(prev => ({
                            ...prev,
                            [functionName]: {
                                blocks: functionBlocks,
                                inputs: blockInputs
                            }
                        }));
                    }
                    break;
        
                case 'CallFunction':
                    if (inputs?.functionName) {
                        const functionName = inputs.functionName.trim();
                        console.log('Calling function:', {
                            name: functionName,
                            availableFunctions: functionDefinitions,
                            currentVars: programVariables
                        });
                        
                        const functionDef = functionDefinitions[functionName];
                        
                        if (!functionDef || !functionDef.blocks || functionDef.blocks.length === 0) {
                            process.push(`Warning: Function "${functionName}" has no blocks`);
                            break;
                        }

                        process.push(`Executing function "${functionName}"`);
                        
                        let functionContext = { ...programVariables };
                        
                        const functionBlocks = functionDef.blocks.sort((a, b) => a.y - b.y);
                        for (const funcBlock of functionBlocks) {
                            const blockInputs = functionDef.inputs[funcBlock.id];
                            console.log('Executing function block:', {
                                type: funcBlock.blockTypeName,
                                inputs: blockInputs,
                                context: functionContext
                            });
                            
                            const result = handleRunBlocks([{...funcBlock, inputs: blockInputs}], functionContext);
                            functionContext = { ...functionContext, ...result.variables };
                            outputs.push(...result.outputs);
                        }
                        
                        programVariables = { ...programVariables, ...functionContext };
                        process.push(`Completed function "${functionName}"`);
                    }
                    break;

                case 'RemoveBlock':
                    if (inputs) {
                        const { value1: arrayName } = inputs;
                        
                        if (!(arrayName in programVariables)) {
                            process.push('Error: Array does not exist');
                            break;
                        }
    
                        try {
                            if (!Array.isArray(programVariables[arrayName])) {
                                process.push('Error: Not an array');
                                break;
                            }
    
                            if (programVariables[arrayName].length === 0) {
                                process.push('Error: Array is empty');
                                break;
                            }
    
                            const removedElement = programVariables[arrayName].pop();
                            process.push(`Removed ${removedElement} from ${arrayName}`);
                        } catch (error) {
                            process.push(`Error: ${error.message}`);
                        }
                    }
                    break;
            }
        }
    
        return { process, outputs, variables: programVariables };
    };

    const handleRunClick = () => {
        const result = handleRunBlocks();
        setVariables(result.variables);
        setProcessSteps(result.process);
        setOutputSteps(result.outputs);
        console.log('Final program state:', result);
    };

    return (
        <div className="container">
            <div className="left">
                <Functions onBlockAdd={handleBlockAdd} />
            </div>
            <div className="center">
                <Playground 
                    blocks={blocks}
                    blockInputs={blockInputs}
                    onInputsChange={handleInputsChange} 
                    onBlockMove={handleBlockMove} 
                />
            </div>
            <div className="right">
                <div className="top">
                    <CodeProcess processSteps={processSteps} />
                </div>
                <div className="buttons-container">
                    <button onClick={handleRunClick}>Run</button>
                    <button onClick={handleClearBlocks}>Clear All</button>
                </div>
                <div className="bottom">
                    <Output executionOutput={outputSteps} />
                </div>
            </div>
        </div>
    );
}
