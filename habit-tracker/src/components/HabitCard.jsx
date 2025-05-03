import { useState } from "react";

export default function HabitCard({ name, category, streak }) {
  const [isPressed, setPressed] = useState(false);

  return (
    <>
      <p> ------- </p>
      <button
        className="px-2 py-2 rounded"
        onClick={() => setPressed(!isPressed)}
      >
        {isPressed ? "✅" : "Done"}
      </button>
      <p> Name: {name}</p>
      <p> Category: {category}</p>
      <p> Streak: {streak}</p>
    </>
  );
}
