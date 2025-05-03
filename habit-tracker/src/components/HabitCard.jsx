import { useState } from "react";

export default function HabitCard({ name, category, streak, onDelete }) {
  const [isComplete, setComplete] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-full max-w-md">
      <div className="flex items-center gap-2 mb-2">
        <button
          className="px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 transition"
          onClick={() => setComplete(!isComplete)}
        >
          {isComplete ? "✅" : "▢"}
        </button>
        <p className="font-medium"> {name} </p>
      </div>
      <p>Category: {category}</p>
      <p className="mb-2">Streak: {streak}</p>
      <button
        className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 transition"
        onClick={() => onDelete(name)}
      >
        🗑️
      </button>
    </div>
  );
}
