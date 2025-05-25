import { useState, useEffect } from "react";

export default function EditForm({ onEditHabit, habitToEdit }) {
  const [habitName, setHabitName] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim() === "" || category.trim() === "") {
      alert("Please fill out all fields.");
      return;
    }
    onEditHabit({
      name: habitName,
      category: category,
      streak: 0,
    });
    setCategory("");
  };

  useEffect(() => {
    if (habitToEdit) {
      setHabitName(habitToEdit.name || "");
      setCategory(habitToEdit.category || "");
    }
  }, [habitToEdit]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-start p-6 bg-gray-50">
        <h1 className="text-xl font-bold mb-6">Edit Habit</h1>

        <div className="mb-4 w-full max-w-sm">
          <label className="block mb-1 font-medium">Name:</label>
          <input
            className="w-full border border-gray-400 rounded px-2 py-1 hover:bg-gray-100 placeholder:text-gray-500 placeholder:opacity-100"
            name="habitName"
            onChange={(e) => setHabitName(e.target.value)}
            placeholder={habitToEdit?.name || "Enter habit name"}
          />
        </div>
        <div className="mb-4 w-full max-w-sm">
          <label className="block mb-1 font-medium">Category:</label>
          <input
            className="w-full border border-gray-400 rounded px-2 py-1 hover:bg-gray-100 placeholder:text-gray-500 placeholder:opacity-100"
            name="habitCategory"
            onChange={(e) => setCategory(e.target.value)}
            placeholder={habitToEdit?.category || "Enter category"}
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
