import React from 'react';
const IFBlockBottom = ({ onClick, parentId, style }) => {  // Added onClick prop
  return (
      <div 
          onClick={onClick}
          data-if-bottom={parentId}
          style={{
              width: '200px',
              height: '30px',
              backgroundColor: '#e9d180',
              borderRadius: '0 0 10px 10px',
              cursor: 'pointer',  // Added cursor style
              ...style
          }}
      />
  );
};
export default IFBlockBottom;