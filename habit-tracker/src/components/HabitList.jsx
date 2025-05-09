import HabitCard from "./HabitCard";
import { useState } from "react";
import HabitModal from "./HabitModal";
import AddHabitForm from "./AddHabitForm";

function HabitList() {
  const [habits, setHabits] = useState([
    { name: "Drink water", category: "Wellness", streak: 10, id: 1 },
    { name: "Exercise", category: "Wellness", streak: 2, id: 2 },
  ]);

  const [showAddModal, setShowModal] = useState(false);

  const handleDelete = (habitName) => {
    setHabits(habits.filter((habit) => habit.name !== habitName));
  };

  const handleAddHabit = (newHabit) => {
    setHabits([newHabit, ...habits]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Habits</h1>
      <button
        className="px-2 py-1 rounded bg-green-100 hover:bg-green-200 transition mb-2"
        onClick={() => setShowModal(true)}
      >
        {" "}
        Add Habit{" "}
      </button>
      {showAddModal && (
        <HabitModal onClose={() => setShowModal(false)}>
          <AddHabitForm onAddHabit={handleAddHabit} />
        </HabitModal>
      )}
      <div className="flex flex-col items-center gap-4 w-full">
        {habits.map((habit) => (
          <HabitCard key={habit.id} {...habit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default HabitList;
