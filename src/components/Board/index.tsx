import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Scoreboard from '../ScoreBoard';
import Card from '../Card';
import useGameStore from '@/store/useGameStore';
import { getImages } from '@/services/cardServices';
import { getRandomImages } from '@/utils/randomImages';
import { shuffleCards } from '@/utils/shuffleCardImages';
import Confetti from '../Confetti.tsx';
import SuccessModal from '../SuccessModal';
import SkeletonBoard from './skeleton';

interface CardData {
  id: string;
  image: {
    url: string;
  };
  isFlipped: boolean;
  matched: boolean;
}

const Board: React.FC = () => {
  const { cards, setCards, firstCard, setFirstCard, hits,
    setHits, errors, setErrors, resetGame, userName,
    lockBoard, setLockBoard, } = useGameStore();
  const [win, setWin] = React.useState(false);

  const { isLoading, data, isError } = getImages()

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const images = data?.data
      const selectedImages = getRandomImages(images)
      const shuffledCards = shuffleCards([
        ...selectedImages,
        ...selectedImages,
      ]);
      setCards(shuffledCards)
    }
  }, [isLoading, isError, data]);

  const handleCardClick = (card: CardData) => {
    if (card.isFlipped || card.matched || lockBoard || (firstCard && firstCard.id === card.id)) return;

    setCards(cards.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c)));

    if (!firstCard) {
      setFirstCard(card);
    } else {
      setLockBoard(true);

      if (firstCard.image.url === card.image.url) {
        setHits(hits + 1);
        setCards(
          cards.map((c) =>
            c.id === card.id || c.id === firstCard.id ? { ...c, matched: true } : c
          )
        );
        setFirstCard(null);
        setLockBoard(false);
      } else {
        setErrors(errors + 1);
        setTimeout(() => {
          setCards(
            cards.map((c) =>
              c.id === card.id || c.id === firstCard.id ? { ...c, isFlipped: false } : c
            )
          );
          setFirstCard(null);
          setLockBoard(false);
        }, 1000);
      }
    }
  };

  const handleConfetti = () => {
    setWin(true);
  };

  useEffect(() => {
    if (hits === cards.length / 2 && cards.length > 0) {
      handleConfetti()
      alert(`Felicidades, ${userName}! Gananste!`);
      resetGame();
    }
  }, [hits, cards.length, resetGame]);

  if (isLoading) {
    return (
      <SkeletonBoard data-testid="skeleton-board" username={userName!} />
    );
  }

  if (isError) {
    return <div>Error fetching images</div>
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      {win && <SuccessModal refresh={() => setWin(false)} />}
      <p className='text-lg text-gray-800 text-center font-semibold mt-5'>Hola, {userName}</p>
      <Scoreboard />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 lg:gap-6 xl:gap-8 mt-5">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={() => handleCardClick(card)} />
        ))}
      </div>
      {win && <Confetti duration={10000} unMount={() => setWin(false)} />}
    </div>
  );
};

export default Board;
