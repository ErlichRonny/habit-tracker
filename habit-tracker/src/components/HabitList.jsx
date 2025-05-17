import HabitCard from "./HabitCard";
import { useState, useEffect } from "react";
import HabitModal from "./HabitModal";
import AddHabitForm from "./AddHabitForm";
import CategoryFilter from "./CategoryFilter";

function HabitList() {
  const [habits, setHabits] = useState(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      const parsedHabits = JSON.parse(storedHabits);
      // Add unique IDs to habits that don't have them
      const habitsWithIds = parsedHabits.map((habit, index) => ({
        ...habit,
        id: habit.id || `habit-${Date.now()}-${index}`,
      }));
      localStorage.setItem("habits", JSON.stringify(habitsWithIds));
      // Return the updated habits
      return habitsWithIds;
    }
    return [];
  });

  const [categories, setCategories] = useState(() => {
    const storedCategories = localStorage.getItem("categories");
    return storedCategories ? JSON.parse(storedCategories) : [];
  });

  const [showAddModal, setShowModal] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState("");
  const filteredHabits = habits.filter(
    (habit) => filteredCategory === "" || habit.category === filteredCategory
  );

  // Runs every time the habits state changes
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [habits, categories]);

  const handleDelete = (habitName) => {
    const updatedHabits = habits.filter((habit) => habit.name !== habitName);
    setHabits(updatedHabits);

    const activeCategories = [
      ...new Set(updatedHabits.map((habit) => habit.category)),
    ];
    setCategories(activeCategories);
  };

  const handleAddHabit = (newHabit) => {
    const habitWithId = {
      ...newHabit,
      id: newHabit.id || `habit-${Date.now()}`,
    };

    setHabits([habitWithId, ...habits]);
    if (!categories.includes(habitWithId.category)) {
      setCategories([habitWithId.category, ...categories]);
    }
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
          <HabitCard key={habit.id} {...habit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default HabitList;
