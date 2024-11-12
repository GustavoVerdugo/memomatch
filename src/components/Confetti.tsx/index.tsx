import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface SkeletonWithConfettiProps {
  duration?: number;
  unMount: () => void;
}

const Confetti: React.FC<SkeletonWithConfettiProps> = ({ duration = 15000, unMount }) => {
  useEffect(() => {
    function randomInRange(min: number, max: number): number {
      return Math.random() * (max - min) + min;
    }

    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    let interval = setInterval(function () {
      let timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        unMount()
      }

      let particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, [duration]);

  return (
    <div className="w-60 h-24 z-20 rounded-md mx-auto mt-20 relative">
      <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
      </div>
    </div>
  );
};

export default Confetti;
