import Scoreboard from "../ScoreBoard";

const SkeletonBoard = ({ username }: { username: string }) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-lg text-gray-800 text-center font-semibold mt-5'>Hola, {username}</p>
      <Scoreboard />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4 lg:gap-6 xl:gap-8 mt-5">
        {Array.from({ length: 24 }).map((_, index) => (
          <div key={index} className="w-28 h-40 bg-gray-300 rounded-md animate-pulse" />
        ))}
      </div>
    </div>
  )
}

export default SkeletonBoard;