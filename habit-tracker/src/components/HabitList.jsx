import HabitCard from "./HabitCard";
import { useState } from "react";
import HabitModal from "./HabitModal";
import AddHabitForm from "./AddHabitForm";
import CategoryFilter from "./CategoryFilter";
import { useHabits } from "../context/HabitContext";
import DeleteForm from "./DeleteForm";
import EditForm from "./EditForm";

export default function HabitList() {
  const { habits, categories, addHabit, deleteHabit, editHabit } = useHabits();
  const [showAddModal, setShowModal] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [habitToDelete, setHabitToDelete] = useState(null);
  const [habitToEdit, setHabitToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHabits = habits.filter((habit) => {
    const matchesCategory =
      filteredCategory === "" || habit.category === filteredCategory;
    const matchesSearch =
      searchTerm === "" ||
      habit.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  const handleEditClick = (habitName) => {
    const habitObj = habits.find((habit) => habit.name === habitName);
    setHabitToEdit(habitObj);
    setShowEditModal(true);
  };

  const handleEditSubmit = (editedHabit) => {
    editHabit(habitToEdit.id, editedHabit);
    setHabitToEdit(null);
    setShowEditModal(false);
  };

  const toggleDarkMode = () => {
    const html = document.documentElement;
    console.log("Before toggle:", html.classList.contains("dark"));

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setDarkMode(false);
    } else {
      html.classList.add("dark");
      setDarkMode(true);
    }

    console.log("After toggle:", html.classList.contains("dark"));
    console.log("HTML classes:", html.className);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Habits</h1>
      <CategoryFilter
        categories={categories}
        filteredCategory={filteredCategory}
        setFilteredCategory={setFilteredCategory}
      />
      <div className="flex gap-4 mb-4 items-center">
        <button
          className="px-3 py-1 rounded text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition"
          onClick={toggleDarkMode}
        >
          Dark Mode {darkMode ? "☀️" : "🌙"}
        </button>
        <button
          className="px-3 py-1 rounded text-sm bg-pink-100 hover:bg-pink-200 dark:bg-pink-800 dark:hover:bg-pink-700 dark:text-white transition"
          onClick={() => setShowConfetti(!showConfetti)}
        >
          Toggle Confetti {showConfetti ? "Off" : "On"}
        </button>
        <button
          className="px-3 py-1 rounded bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:hover:bg-green-700 dark:text-white transition"
          onClick={() => setShowModal(true)}
        >
          Add Habit
        </button>
      </div>
      <input
        type="text"
        placeholder="Search habits..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md mb-4 w-64 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
      />
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
      {showEditModal && (
        <HabitModal onClose={() => setShowEditModal(false)}>
          <EditForm onEditHabit={handleEditSubmit} habitToEdit={habitToEdit} />
        </HabitModal>
      )}
      <div className="flex flex-col items-center gap-4 w-full">
        {filteredHabits.map((habit) => (
          <HabitCard
            key={habit.id}
            {...habit}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
            showConfetti={showConfetti}
          />
        ))}
      </div>
    </div>
  );
}
