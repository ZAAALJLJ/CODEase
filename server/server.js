const express = require("express");
const cors = require("cors");

const app = express();
const BLOCK_VERTICAL_SPACING = 35;
const IF_BLOCK_HEIGHT = 120;

app.use(cors());
app.use(express.json());

let blocks = [];
let startBlockPresent = false;

app.post('/addBlock', (req, res) => {
  try {
    const { blockTypeName, id, x, y, parentId } = req.body;
    
    if (!blockTypeName || !id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // avoid duplicates by deleting block with same id
    blocks = blocks.filter(block => block.id !== id);

    // sets position for block to be added
    const newBlock = {
      id,
      blockTypeName,
      x: x || 100,
      y: y || 100,
      parentId: parentId || null,
      isInsideIf: false,
      isInsideRepeat: false,
    };

    // handling for RepeatBlockBottom and IFBlockBottom
    if (blockTypeName === 'RepeatBlockBottom' || blockTypeName === 'IFBlockBottom') {
      const topBlockType = blockTypeName === 'RepeatBlockBottom' ? 'RepeatBlockTop' : 'IFBlockTop';
      const nearestTop = blocks
        .filter(b => b.blockTypeName === topBlockType)
        .find(top => Math.abs(top.x - (x || 100)) < 50 && top.y < (y || 100));

      if (nearestTop) {
        newBlock.parentId = nearestTop.id;
        newBlock.x = nearestTop.x;
      }
    }

    blocks.push(newBlock);
    
    console.log('Added block:', {
      type: newBlock.blockTypeName,
      id: newBlock.id,
      position: { x: newBlock.x, y: newBlock.y },
      parentId: newBlock.parentId,
      isInsideIf: newBlock.isInsideIf,
      isInsideRepeat: newBlock.isInsideRepeat
    });

    res.status(200).json({ 
      message: `${blockTypeName} added successfully`,
      block: newBlock
    });

  } catch (error) {
    console.error('Error adding block:', error);
    res.status(500).json({ 
      message: "Error adding block", 
      error: error.message 
    });
  }
});

app.post('/updatePosition', (req, res) => {
  try {
    const { id, x, y } = req.body;
    
    if (!id || x === undefined || y === undefined) {
      return res.status(400).json({ 
        message: "Missing required fields",
        details: {
          id: !id ? "Missing id" : null,
          x: x === undefined ? "Missing x coordinate" : null,
          y: y === undefined ? "Missing y coordinate" : null
        }
      });
    }

    const movedBlock = blocks.find(b => b.id === id);
    if (!movedBlock) {
      return res.status(404).json({ message: "Block not found" });
    }

    movedBlock.x = x;
    movedBlock.y = y;

    const ifBlocks = blocks.filter(b => b.blockTypeName === 'IFBlockTop');
    const repeatBlocks = blocks.filter(b => b.blockTypeName === 'RepeatBlockTop');
    let parentIfBlock = null;
    let parentRepeatBlock = null;

    if (movedBlock.blockTypeName === 'IFBlockTop') {
      const bottomBlock = blocks.find(b => 
        b.blockTypeName === 'IFBlockBottom' && 
        b.parentId === movedBlock.id
      );
      if (bottomBlock) {
        bottomBlock.x = x;
        const containedBlocks = blocks.filter(b => 
          b.parentId === movedBlock.id && 
          b.isInsideIf
        );
        const blockHeight = containedBlocks.length > 0 
          ? Math.max(...containedBlocks.map(b => b.y)) - y + BLOCK_VERTICAL_SPACING
          : IF_BLOCK_HEIGHT;
        bottomBlock.y = y + blockHeight;
      }
    }

    if (movedBlock.blockTypeName === 'RepeatBlockTop') {
      const bottomBlock = blocks.find(b => 
        b.blockTypeName === 'RepeatBlockBottom' && 
        b.parentId === movedBlock.id
      );
      if (bottomBlock) {
        bottomBlock.x = x;
        bottomBlock.y = y + 150;
      }
    }

    // checks if moved block is not if/repeat 
    if (!['IFBlockTop', 'IFBlockBottom', 'RepeatBlockTop', 'RepeatBlockBottom'].includes(movedBlock.blockTypeName)) {
      for (const ifBlock of ifBlocks) {
        const bottomBlock = blocks.find(b => 
          b.blockTypeName === 'IFBlockBottom' && 
          b.parentId === ifBlock.id
        );
        if (!bottomBlock) continue;

        // check if block was previously inside the if block
        const wasInsideThisIf = movedBlock.parentId === ifBlock.id;
        const distanceFromIf = Math.abs(x - ifBlock.x);
        const isFarFromParent = distanceFromIf > 150;

        const isInsideIfBlock = 
          y > ifBlock.y && 
          y < bottomBlock.y && 
          x >= ifBlock.x - 80 && 
          x <= ifBlock.x + 80;

        if (isInsideIfBlock || (wasInsideThisIf && !isFarFromParent)) {
          parentIfBlock = ifBlock;
          movedBlock.parentId = ifBlock.id;
          movedBlock.x = ifBlock.x;
          movedBlock.isInsideIf = true;
          movedBlock.isInsideRepeat = false;
          break;
        }
      }

      for (const repeatBlock of repeatBlocks) {
        const bottomBlock = blocks.find(b => 
          b.blockTypeName === 'RepeatBlockBottom' && 
          b.parentId === repeatBlock.id
        );
        if (!bottomBlock) continue;

        const isInsideRepeatBlock = 
          y > repeatBlock.y && 
          y < bottomBlock.y && 
          x >= repeatBlock.x - 80 && 
          x <= repeatBlock.x + 80;

        if (isInsideRepeatBlock) {
          parentRepeatBlock = repeatBlock;
          movedBlock.parentId = repeatBlock.id;
          movedBlock.x = repeatBlock.x;
          movedBlock.isInsideRepeat = true;
          movedBlock.isInsideIf = false;
          break;
        }
      }
    }

    if (movedBlock.blockTypeName === 'RepeatBlockBottom') {
      const nearestTop = repeatBlocks.find(top => 
        Math.abs(top.x - x) < 50 && 
        top.y < y
      );
      if (nearestTop) {
        movedBlock.parentId = nearestTop.id;
        movedBlock.x = nearestTop.x;
      }
    }

    if (parentIfBlock || parentRepeatBlock) {
      movedBlock.parentId = parentIfBlock ? parentIfBlock.id : parentRepeatBlock.id;
      movedBlock.isInsideIf = parentIfBlock ? true : false;
      movedBlock.isInsideRepeat = parentRepeatBlock ? true : false;
    }

    // only remove parent if not inside if/repeat
    if (!parentIfBlock && !parentRepeatBlock) {
      const previousParent = blocks.find(b => b.id === movedBlock.parentId);
      if (previousParent) {
        const distanceFromParent = Math.abs(x - previousParent.x);
        if (distanceFromParent > 100) {
          movedBlock.parentId = null;
          movedBlock.isInsideIf = false;
          movedBlock.isInsideRepeat = false;
        } else {
          movedBlock.x = previousParent.x;
        }
      }
    }

    console.log('Block position updated:', {
      id: movedBlock.id,
      type: movedBlock.blockTypeName,
      position: { x: movedBlock.x, y: movedBlock.y },
      parentId: movedBlock.parentId,
      isInsideIf: movedBlock.isInsideIf,
      isInsideRepeat: movedBlock.isInsideRepeat
    });

    res.status(200).json({
      message: "Position updated",
      block: {
        ...movedBlock,
        isInsideIf: movedBlock.isInsideIf,
        isInsideRepeat: movedBlock.isInsideRepeat,
        parentId: movedBlock.parentId
      }
    });
  } catch (error) {
    console.error('Error updating position:', error);
    res.status(500).json({ message: "Error updating position" });
  }
});


app.post('/clearBlocks', (req, res) => {
  try {
    blocks = [];
    startBlockPresent = false;
    res.status(200).json({ message: "All blocks cleared." });
  } catch (error) {
    console.error('Error clearing blocks:', error);
    res.status(500).json({ message: "An error occurred while clearing the blocks.", error: error.message });
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
