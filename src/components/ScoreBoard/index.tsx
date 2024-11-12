import useGameStore from '@/store/useGameStore';
import React from 'react';

const Scoreboard: React.FC = () => {
  const { hits, errors } = useGameStore()
  return (
    <div className="scoreboard flex justify-center gap-10 mb-4">
      <p className="text-xl font-semibold text-gray-800">Aciertos: {hits}</p>
      <p className="text-xl font-semibold text-gray-800">Errores: {errors}</p>
    </div>
  );
};

export default Scoreboard;
