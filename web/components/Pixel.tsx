import React, {useState} from "react";
import {useDojo} from "@/hooks/dojo";
import {useSystems} from "@/hooks/dojo/systems/useSystems";

import {KATANA_ACCOUNT_1_ADDRESS, setupNetwork} from "../otherdojo/setupNetwork";

interface PixelProps {
    index: number;
    selectedColor: string;
    selectedUnicode: string;
    viewMode: string;
    position: number[];
};

const network = setupNetwork()


function executePaint(position: number[]) {
    console.log("executePaint")
    network.execute(
        "spawn_pixel_system",
        [
            position[0], position[1],                // position
            482670636660,       // pixel_type : "paint"
            0                   // allowlist.length
        ]
    ).then(() => {
        console.log("a", window.color)
        network.execute(
            "put_color_system",
            [
                position[0], position[1],    // position
                window.color[0],window.color[1],window.color[2] // color
            ]
        )
        console.log("2")
    })
        .catch((error) => {
            console.log(error);
        });
}

const Pixel: React.FC<PixelProps> = ({index, selectedColor, selectedUnicode, viewMode, position}) => {

    // remove the '#' from the start of the color value, if present
    // const trimmedColor = selectedColor[0] === '#' ? selectedColor.slice(1) : selectedColor;

    const initialData = {
        color: index % 2 === 0 ? "#FFFFFF" : "#EBEBED",
        unicode: '0x10',
    };

    // const initialColor = index % 2 === 0 ? "#FFFFFF" : "#EBEBED";

    // const [pixelColor, setPixelColor] = useState(initialColor);
    const [pixelData, setPixelData] = useState(initialData);

    const {account} = useDojo();
    const {put_color, isPending, error: txError} = useSystems();


    function handleClick() {
        if (window.gameMode == "paint") executePaint(position)
        else if (window.gameMode == "rps") executeRps(position)
        else if (window.gameMode == "snake") executeSnake(position)
        else {
            //nothing
        }


        console.log("click on ", pixelData, account)

        if (viewMode === "Pixel") {
            setPixelData({...pixelData, color: selectedColor});
        } else if (viewMode === "Game") {
            setPixelData({...pixelData, unicode: selectedUnicode});
        }
    }


    // const red = parseInt(trimmedColor.slice(0, 2), 16);
    // const green = parseInt(trimmedColor.slice(2, 4), 16);
    // const blue = parseInt(trimmedColor.slice(4, 6), 16);

    return (
        <div
            style={{backgroundColor: pixelData.color, margin: '0rem'}}
            className='flex items-center justify-center text-white h-4 w-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110'
            onClick={() => {
                handleClick()
            }}
        >
            {viewMode === "Game" && pixelData.color === "#999999" && (
                <span>{String.fromCodePoint(parseInt('1F40D', 16))}</span>
            )}
            {/* {pixelData.unicode !== '0x0' && (
        <span>{String.fromCodePoint(parseInt(pixelData.unicode, 16))}</span>
      )} */}
        </div>
    )
};

export default Pixel;