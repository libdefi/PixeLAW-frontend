import React from 'react';

import Row from './Row';

interface DrawingPanelProps {
  selectedColor: string;
  selectedUnicode: string;
  viewMode: string;
};

const DrawingPanel:React.FC<DrawingPanelProps> = ({selectedColor, selectedUnicode, viewMode}) => {
  const width = 64;
  const height = 64;

  let rows = [];

  for (let y = 0; y < height; y++) {
    rows.push(<Row y={y} width={width} selectedColor={selectedColor} selectedUnicode={selectedUnicode} viewMode={viewMode} key={y}/>)
  }

  return (
    <div>
      <div id="pixels"
        className=''>
        {rows}
      </div>
    </div>
  )
};

export default DrawingPanel;