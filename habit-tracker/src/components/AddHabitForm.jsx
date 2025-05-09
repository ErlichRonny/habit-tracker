import { useState } from "react";

export default function AddHabitForm({ onAddHabit }) {
  const [habitName, setHabitName] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim() === "" || category.trim() === "") {
      alert("Please fill out all fields.");
      return;
    }
    onAddHabit({
      name: habitName,
      category: category,
      streak: 0,
    });
    setHabitName("");
    setCategory("");
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-start p-6 bg-gray-50">
        <h1 className="text-xl font-bold mb-6">Add New Habit</h1>

        <div className="mb-4 w-full max-w-sm">
          <label className="block mb-1 font-medium">Name:</label>
          <input
            className="w-full border border-gray-400 rounded px-2 py-1 hover:bg-gray-100"
            name="habitName"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
        </div>
        <div className="mb-4 w-full max-w-sm">
          <label className="block mb-1 font-medium">Category:</label>
          <input
            className="w-full border border-gray-400 rounded px-2 py-1 hover:bg-gray-100"
            name="habitCategory"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-1 w-full max-w-sm">
          <button
            type="submit"
            className="px-2 py-1 rounded bg-green-100 hover:bg-green-200 transition mb-2"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
