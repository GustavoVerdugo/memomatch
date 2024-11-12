import useGameStore from '@/store/useGameStore';
import React from 'react';

type SuccessModalType = {
  refresh: () => void;
}

const SuccessModal: React.FC<SuccessModalType> = ({ refresh }) => {
  const { setUserName, resetGame } = useGameStore()

  const handleStart = () => {
    resetGame()
    refresh()
    setUserName('')
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">Felicidades!!</h2>
        <p className='text-sm font-semibold text-gray-700 my-5'>Muchas gracias por jugar con nosotros</p>
        <button
          onClick={handleStart} className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300">
          Jugar nuevamente
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
