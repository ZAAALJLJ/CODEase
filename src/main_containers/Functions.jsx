import AddBlock from '../blocks/AddBlock';
import ArithmeticBlock from '../blocks/ArithmeticBlock';
import CallFunction from '../blocks/CallFunction';
import ExpandableCBlock from '../blocks/ExpandableCBlock';
import ExpandableIFBlock from '../blocks/ExpandableIFBlock';
import FunctionBlock from '../blocks/functionBlock';
import RemoveBlock from '../blocks/RemoveBlock';
import StartBlock from '../blocks/StartBlock';
import VariableBlock from '../blocks/VariableBlock';
import './Functions.css';

export default function Functions({ onBlockAdd }) {
    return (
        <div className="functions-container">
            <p className="title">FUNCTIONS</p>
            <div className="functions-place">
                <StartBlock onClick={() => onBlockAdd(<StartBlock />)} />
                <ExpandableCBlock onClick={() => onBlockAdd(<ExpandableCBlock />)} />
                <ExpandableIFBlock onClick={() => onBlockAdd(<ExpandableIFBlock />)} />
                <ArithmeticBlock onClick={() => onBlockAdd(<ArithmeticBlock />)} />
                <VariableBlock onClick={() => onBlockAdd(<VariableBlock />)} />
                <AddBlock onClick={() => onBlockAdd(<AddBlock />)} />
                <RemoveBlock onClick={() => onBlockAdd(<RemoveBlock />)} />
                <FunctionBlock onClick={() => onBlockAdd(<FunctionBlock />)} />
                <CallFunction onClick={() => onBlockAdd(<CallFunction />)} />
            </div>
            <div class="bottom-spacer"></div>
        </div>
    );
}
