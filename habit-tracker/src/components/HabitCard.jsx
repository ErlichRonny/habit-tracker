import { useState } from "react";

export default function HabitCard({ name, category, streak }) {
  const [isPressed, setPressed] = useState(false);


  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-full max-w-md">
      <div className="flex items-center gap-2 mb-2">
        <button
          className="px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 transition"
          onClick={() => setPressed(!isPressed)}
        >
          {isPressed ? "✅" : "▢"}
        </button>
        <p className="font-medium">Name: {name}</p>
      </div>
      <p>Category: {category}</p>
      <p>Streak: {streak}</p>
    </div>
  );
}
