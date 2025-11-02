'use client';

import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

interface GameWinCelebrationProps {
  winner: string | null;
  resetGame: () => void;
}

const GameWinCelebration: React.FC<GameWinCelebrationProps> = ({ winner, resetGame }) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (winner) {
      setShowCelebration(true);
    }
  }, [winner]);

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    updateSize(); // Set initial size
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleClose = () => {
    setShowCelebration(false);
    resetGame();
  }

  if (!showCelebration) return null;

  return (
    <>
      <Confetti width={windowSize.width} height={windowSize.height} />

      <div className="modal-overlay">
        <div className="modal">
          <h2>🎉 Congratulations!</h2>
          <p>Player <strong>{winner}</strong> wins!</p>
          <button onClick={handleClose}>Restart</button>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal {
          background-color: #11111110;
          padding: 30px 40px;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          text-align: center;
          max-width: 90%;
          backdrop-filter: blur(1px)
        }

        .modal h2 {
          margin-bottom: 15px;
          font-size: 24px;
          color: orange;
        }

        .modal p {
          font-size: 18px;
          margin-bottom: 20px;
        }

        .modal button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: aquamarine;
          color: #333;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .modal button:hover {
          background-color: aquamarine;
        }
      `}</style>
    </>
  );
};

export default GameWinCelebration;