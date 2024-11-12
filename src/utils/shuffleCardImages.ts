import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export const shuffleCards = (cards: any[]) => {
  return _.shuffle(
    cards.map((card) => ({
      id: uuidv4(),
      image: { url: card.url },
      isFlipped: false,
      matched: false,
    }))
  );
};