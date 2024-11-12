import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Card {
  id: string;
  image: {
    url: string;
  };
  isFlipped: boolean;
  matched: boolean;
}

interface GameState {
  cards: Card[];
  setCards: (cards: Card[]) => void;
  firstCard: Card | null;
  setFirstCard: (card: Card | null) => void;
  hits: number;
  setHits: (hits: number) => void;
  errors: number;
  setErrors: (errors: number) => void;
  userName: string | null;
  setUserName: (name: string) => void;
  lockBoard: boolean;
  setLockBoard: (locked: boolean) => void;
  resetGame: () => void;
}

const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      cards: [],
      setCards: (cards) => set({ cards }),
      firstCard: null,
      setFirstCard: (card) => set({ firstCard: card }),
      hits: 0,
      setHits: (hits) => set({ hits }),
      errors: 0,
      setErrors: (errors) => set({ errors }),
      userName: null,
      setUserName: (name) => set({ userName: name }),
      lockBoard: false,
      setLockBoard: (locked) => set({ lockBoard: locked }),
      resetGame: () => set({ hits: 0, errors: 0, firstCard: null, lockBoard: false, cards: [] }),
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGameStore;
