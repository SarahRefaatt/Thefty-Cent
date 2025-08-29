"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageCoinRoll() {
  const [isRolling, setIsRolling] = useState(false);

  useEffect(() => {
    // Auto-start the animation when component mounts
    setIsRolling(true);
    
    // Stop animation after it completes
    const timer = setTimeout(() => {
      setIsRolling(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const restartAnimation = () => {
    setIsRolling(false);
    setTimeout(() => setIsRolling(true), 50);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        3D Coin Roll Animation
      </h1>
      
      <div className="relative w-80 h-80 flex items-center justify-center mb-12">
        {/* 3D perspective container */}
        <div className="relative w-64 h-64 perspective-1000">
          {/* The coin with front and back faces */}
          <div className={`relative w-full h-full ${isRolling ? 'animate-coin-roll' : ''}`}>
            {/* Coin front */}
            <div className="absolute inset-0 rounded-full overflow-hidden backface-hidden">
              <Image
              width={160}
                    height={160}
                src="/assets/IMG.JPG" 
                alt="Coin Front" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 rounded-full border-4 border-black/80" />
            </div>
            
            {/* Coin back */}
            <div className="absolute inset-0 rounded-full overflow-hidden backface-hidden rotate-y-180">
              <Image

              width={160}
                    height={160}
                src="/assets/IMG - Copy.JPG"
                alt="Coin Back" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 rounded-full border-4 border-black/80" />
            </div>
            
            {/* Coin edge - black and thicker for better visibility */}
            <div className="absolute inset-0 rounded-full border-8 border-black" style={{
              transform: 'translateZ(-4px)',
              boxShadow: 'inset 0 0 25px rgba(100, 100, 100, 0.6)'
            }} />
          </div>
        </div>
        
        {/* Shadow - darker for black background */}
        <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-5 bg-black rounded-full blur-md transition-all duration-300 ${isRolling ? 'opacity-70 scale-110' : 'opacity-40 scale-100'}`} />
      </div>
      
      <button 
        onClick={restartAnimation}
        className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 font-bold rounded-lg shadow-lg transition-colors flex items-center gap-2 border border-gray-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
        Roll Again
      </button>
      
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        @keyframes coin-roll {
          0% {
            transform: rotateY(0deg);
            animation-timing-function: cubic-bezier(0.1, 0.8, 0.2, 1); /* Very fast start */
          }
          30% {
            transform: rotateY(1080deg); /* Fast spinning at the beginning */
            animation-timing-function: cubic-bezier(0.4, 0.8, 0.6, 0.9);
          }
          60% {
            transform: rotateY(1980deg);
            animation-timing-function: cubic-bezier(0.7, 0.6, 0.8, 0.9); /* Starting to slow down */
          }
          80% {
            transform: rotateY(2340deg);
            animation-timing-function: cubic-bezier(0.8, 0.4, 0.9, 0.7); /* Slowing down more */
          }
          90% {
            transform: rotateY(2430deg);
            animation-timing-function: cubic-bezier(0.9, 0.2, 0.95, 0.4); /* Almost stopped */
          }
          100% {
            transform: rotateY(2460deg); /* Final slow rotation to stop */
          }
        }
        
        .animate-coin-roll {
          animation: coin-roll 1.8s forwards;
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}