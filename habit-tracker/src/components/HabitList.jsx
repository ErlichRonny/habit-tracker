import HabitCard from "./HabitCard";
import { useState } from "react";
import HabitModal from "./HabitModal";
import AddHabitForm from "./AddHabitForm";
import CategoryFilter from "./CategoryFilter";
import { useHabits } from "../context/HabitContext";

export default function HabitList() {
  const { habits, categories, addHabit, deleteHabit } = useHabits();
  const [showAddModal, setShowModal] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState("");
  const filteredHabits = habits.filter(
    (habit) => filteredCategory === "" || habit.category === filteredCategory
  );
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAddHabit = (newHabit) => {
    addHabit(newHabit);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Habits</h1>
      <CategoryFilter
        categories={categories}
        filteredCategory={filteredCategory}
        setFilteredCategory={setFilteredCategory}
      />
      <div className="flex gap-4 mb-4 items-center">
        <button
          className="px-3 py-1 rounded text-sm bg-pink-100 hover:bg-pink-200 transition"
          onClick={() => setShowConfetti(!showConfetti)}
        >
          Toggle Confetti {showConfetti ? "Off" : "On"}
        </button>
        <button
          className="px-3 py-1 rounded bg-green-100 hover:bg-green-200 transition"
          onClick={() => setShowModal(true)}
        >
          Add Habit
        </button>
      </div>
      {showAddModal && (
        <HabitModal onClose={() => setShowModal(false)}>
          <AddHabitForm onAddHabit={handleAddHabit} categories={categories} />
        </HabitModal>
      )}
      <div className="flex flex-col items-center gap-4 w-full">
        {filteredHabits.map((habit) => (
          <HabitCard key={habit.id} {...habit} onDelete={deleteHabit} showConfetti={showConfetti} />
        ))}
      </div>
    </div>
  );
}
