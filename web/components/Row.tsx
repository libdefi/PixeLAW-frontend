import React from 'react';
import Pixel from './Pixel';

interface RowProps {
  y: number;
  width: number;
  selectedColor: string;
  selectedUnicode: string;
  viewMode: string;
};

const Row: React.FC<RowProps> = ({ y, width, selectedColor, selectedUnicode, viewMode}) => {
  let pixels = [];

  for (let x = 0; x < width; x++) {
    let index = y + x;
    pixels.push(<Pixel
      index={index}
      selectedColor={selectedColor}
      selectedUnicode={selectedUnicode}
      viewMode={viewMode}
      key={x}
      position={[x,y]}
    />)
  };

  return (
    <div className='flex justify-center'>
      {pixels}
    </div>
  )
};

export default Row;