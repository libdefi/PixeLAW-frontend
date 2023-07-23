import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useState } from 'react';


import App from '../components/App';
import Modal from '../components/Modal';
import NavBar from '../components/NavBar';

import { formatAddress } from "@/utils/contract";
import { useDojo } from "@/hooks/dojo";
import { useSystems } from "@/hooks/dojo/systems/useSystems";
import {Account, RpcProvider} from "starknet";

import { atom } from 'jotai'

const inter = Inter({ subsets: ['latin'] })

if (typeof window !== "undefined") window.color = [255,0,0]



export default function Home() {

  const { put_color } = useSystems();

  const [viewMode, setViewMode] = useState("Pixel");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewClick = () => {
    // viewMode === "Pixel" : Pixel Art View. We can see only colors
    // viewMode === "Game" : Game Mode View. We can see emojis, which represents by unicodes.
    if (viewMode === "Pixel") {
      setViewMode("Game");
    } else {
      setViewMode("Pixel");
    }
  };

  const handlePlayClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };


  return (
    <div className='relative h-screen w-full bg-no-repeat bg-center bg-fixed bg-cover overflow-auto'>
      <div className='w-full bg-custom-gray mb-16'>
        <NavBar viewMode={viewMode} handleViewClick={handleViewClick} isModalOpen={isModalOpen} handlePlayClick={handlePlayClick}/>
        { isModalOpen ? (
          <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        ) : null}
        <App viewMode={viewMode} />
      </div>
    </div>
  );
}