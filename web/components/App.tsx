import React, { useState, useEffect } from "react";

import DrawingPanel from "./DrawingPanel";
import { CompactPicker } from 'react-color';

interface AppProps {
  viewMode: string;
  // setViewMode: () => void;
};

function hexToRGB(hex: string) {
  // Remove the '#' character if it exists
  if (hex.charAt(0) === '#') {
    hex = hex.substr(1);
  }

  // Ensure the hexadecimal string is 6 characters long
  if (hex.length !== 6) {
    throw new Error('Invalid hexadecimal color format. It should be in the format "#RRGGBB".');
  }

  // Parse the hexadecimal values for red, green, and blue
  const red = parseInt(hex.substr(0, 2), 16);
  const green = parseInt(hex.substr(2, 2), 16);
  const blue = parseInt(hex.substr(4, 2), 16);

  return {
    red,
    green,
    blue,
  };
}


const App = ({viewMode}: AppProps) => {

  // const [selectedColor, setColor] = useState("#FFFFFF");
  const [data, setData] = useState({color: "#FFFFFF", unicode: "0x0"});
  const [isMounted, setIsMounted] = useState(false);
  // const [viewMode, setViewMode] = useState("Pixel");
  // const [data, setData] = useState("pixelArt");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function changeColor(color: any) {
    setData(data => ({...data, color:color.hex}));
    window.color = [color.rgb.r,color.rgb.g,color.rgb.b]
    console.log("Color is now ", window.color);
  }
  function changeUnicode(unicode: any) {
    setData(data => ({...data, unicode:unicode}));
    console.log(data);
  }

  function changeData(color: any, unicode: any) {
    setData({color: color, unicode: unicode});
    console.log(data);
  }  
  
  
  return (
    <div>
      <div>
        <DrawingPanel selectedColor={data.color} selectedUnicode={data.unicode} viewMode={viewMode}/>
      </div>
      <div className="fixed bottom-4 right-4">
        {/* className="flex justify-center mt-10"  */}
        {/* <CompactPicker color={selectedColor} onChangeComplete={changeColor}/> */}
        {isMounted && <CompactPicker color={data.color} onChangeComplete={changeColor}/>}
      </div>
    </div>
  )
};

export default App;