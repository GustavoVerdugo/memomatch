"use client"
import Board from "@/components/Board";
import WelcomeModal from "@/components/WelcomeModal";
import useGameStore from "@/store/useGameStore";

export default function Home() {
  const userName = useGameStore((state) => state.userName);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-gray-900 font-semibold text-center text-2xl">MemoMatch</h1>
      {!userName ? <WelcomeModal /> : <Board />}
    </div>
  );
}
