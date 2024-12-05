import React from 'react';

const RepeatBlockBottom = ({ onClick, parentId, style }) => {
    return (
        <div 
            onClick={onClick}
            data-repeat-bottom={parentId}
            style={{
                width: '200px',
                height: '30px',
                backgroundColor: '#c3e7b4',
                borderRadius: '0 0 10px 10px',
                cursor: 'pointer',
                ...style
            }}
        />
    );
};

export default RepeatBlockBottom;
