import HabitCard from "./HabitCard";
import { useState } from "react";
import HabitModal from "./HabitModal";
import AddHabitForm from "./AddHabitForm";
import CategoryFilter from "./CategoryFilter";
import { useHabits } from "../context/HabitContext";
import DeleteForm from "./DeleteForm";

export default function HabitList() {
  const { habits, categories, addHabit, deleteHabit } = useHabits();
  const [showAddModal, setShowModal] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState("");
  const filteredHabits = habits.filter(
    (habit) => filteredCategory === "" || habit.category === filteredCategory
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAddHabit = (newHabit) => {
    addHabit(newHabit);
    setShowModal(false);
  };

  const handleDeleteClick = (habitName) => {
    setHabitToDelete(habitName);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (habitToDelete) {
      deleteHabit(habitToDelete);
      setShowDeleteModal(false);
      setHabitToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setHabitToDelete(null);
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
      {showDeleteModal && (
        <HabitModal onClose={handleCancelDelete}>
          <DeleteForm
            onDeleteHabit={handleConfirmDelete}
            habitName={habitToDelete}
            onCancel={handleCancelDelete}
          />
        </HabitModal>
      )}
      <div className="flex flex-col items-center gap-4 w-full">
        {filteredHabits.map((habit) => (
          <HabitCard
            key={habit.id}
            {...habit}
            onDelete={handleDeleteClick}
            showConfetti={showConfetti}
          />
        ))}
      </div>
    </div>
  );
}
