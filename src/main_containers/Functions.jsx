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
import './Functions.css';

export default function Functions({ onBlockAdd }) {
    const handleBlockAdd = (type) => {
        const blockId = `${type}-${Date.now()}`;
        onBlockAdd({
            type: { name: type },
            id: blockId,
            blockTypeName: type,
            x: 0,
            y: 0
        });
    };

    return (
        <div className="functions-container">
            <p className="title">FUNCTIONS</p>
            <div className="functions-place">
                <StartBlock onClick={() => handleBlockAdd('StartBlock')} />
                <RepeatBlockTop onClick={() => handleBlockAdd('RepeatBlockTop')} />
                <RepeatBlockBottom onClick={() => handleBlockAdd('RepeatBlockBottom')} />
                <IFBlockTop onClick={() => handleBlockAdd('IFBlockTop')} />
                <IFBlockBottom onClick={() => handleBlockAdd('IFBlockBottom')}/>
                <ArithmeticBlock onClick={() => handleBlockAdd('ArithmeticBlock')} />
                <VariableBlock onClick={() => handleBlockAdd('VariableBlock')} />
                <AddBlock onClick={() => handleBlockAdd('AddBlock')} />
                <RemoveBlock onClick={() => handleBlockAdd('RemoveBlock')} />
                <FunctionBlock onClick={() => handleBlockAdd('FunctionBlock')} />
                <CallFunction onClick={() => handleBlockAdd('CallFunction')} />
            </div>
            <div class="bottom-spacer"></div>
        </div>
    );
}
