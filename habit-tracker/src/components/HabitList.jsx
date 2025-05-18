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
      <button
        className="px-2 py-1 rounded bg-green-100 hover:bg-green-200 transition mb-2"
        onClick={() => setShowModal(true)}
      >
        {" "}
        Add Habit{" "}
      </button>
      {showAddModal && (
        <HabitModal onClose={() => setShowModal(false)}>
          <AddHabitForm onAddHabit={handleAddHabit} categories={categories} />
        </HabitModal>
      )}
      <div className="flex flex-col items-center gap-4 w-full">
        {filteredHabits.map((habit) => (
          <HabitCard key={habit.id} {...habit} onDelete={deleteHabit} />
        ))}
      </div>
    </div>
  );
}
