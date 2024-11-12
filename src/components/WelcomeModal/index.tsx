import useGameStore from '@/store/useGameStore';
import React, { useState } from 'react';


const WelcomeModal: React.FC = () => {
  const [name, setName] = useState('');
  const setUserName = useGameStore((state) => state.setUserName);

  const handleStart = () => {
    if (name.trim()) setUserName(name);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Bienvenido a Memory Game</h2>
        <p className='text-sm font-semibold text-gray-700'>Ingresa tu nombre para comenzar a jugar</p>
        <input
          data-testid='player-name'
          id='player-name'
          type="text"
          placeholder="Pedrito"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4 placeholder:text-gray-600 text-gray-700"
        />
        <button
          disabled={!name}
          onClick={handleStart} className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300">
          Empezar Juego
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
