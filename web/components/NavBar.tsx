import React, { useState } from "react";
import { useDojo } from "@/hooks/dojo";
import {formatAddress} from "@/utils/contract";

interface NavBarProps {
  viewMode: string;
  handleViewClick: () => void;
  isModalOpen: boolean;
  handlePlayClick: () => void;
};

export default function NavBar({viewMode, handleViewClick, isModalOpen, handlePlayClick}: NavBarProps) {
    const { account, isBurnerDeploying, createBurner } = useDojo();

  // const [mode, setMode] = useState("view");
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handlePlayClick = () => {
  //   setIsModalOpen(true);
  // };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <nav
      className='flex py-2 justify-between'>
      <div
        className='px-6 text-custom-yellow text-2xl font-bold'
        style={{ fontFamily: 'PixelFont' }}>
        PixeLAW
      </div>
      <div className="justify-center">
        <button 
          className='text-2xl text-white mx-2 bg-custom-blue rounded-md px-2 md:4'
          onClick={() => handleViewClick()}
          style={{ fontFamily: 'PixelFont' }}>
            {viewMode === "Pixel" ? "Pixel Art View" : "Game Mode View"}
        </button>
        <button
          className='text-2xl text-white mx-2 bg-custom-blue rounded-md px-2 md:4'
          onClick={() => handlePlayClick()}
          style={{ fontFamily: 'PixelFont' }}>
          Play
        </button>

      </div>
    </nav>
  );
}
