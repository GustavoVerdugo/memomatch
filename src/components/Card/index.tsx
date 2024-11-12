import React from 'react';
import { Card as CardType } from '@/store/useGameStore';

interface CardProps {
  card: CardType;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <div
      data-testid="card"
      className="group w-28 h-40 [perspective:1000px] hover:scale-105 hover:shadow-lg transition-all duration-500">
      <div
        className={`relative w-full h-full transition-all duration-500 transform rounded-lg shadow-lg border-gray-500 border-2
      ${card.isFlipped || card.matched ? `[transform:rotateY(180deg)] [transform-style:preserve-3d] 
      ${card.matched && "border-green-600 border-4"}` : 'bg-blue-500'}`}
        onClick={onClick}
      >
        {card.isFlipped || card.matched ? (
          <img src={card.image.url} alt="animal" className="object-cover w-full h-full rounded" />
        ) : (
          <img src='/images/29747.jpg' alt="question" className="object-center w-full h-full rounded" />
        )}
      </div>
    </div>
  );
};

export default Card;
