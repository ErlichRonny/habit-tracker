import { useState, useEffect, createContext, useContext } from "react";
import {
  setStorageValue,
  removeStorageValue,
  getStorageValue,
} from "../Storage";

// Create a context for habits
const HabitContext = createContext(null);

export function HabitProvider({ children }) {
  // Main habits state
  const [habits, setHabits] = useState(() => {
    return getStorageValue("habits", []).map((habit, index) => ({
      ...habit,
      id: habit.id || `habit-${Date.now()}-${index}`,
    }));
  });

  // Categories state
  const [categories, setCategories] = useState(() => {
    return getStorageValue("categories", []);
  });

  // History of habit completions
  const [habitsHistory, setHabitsHistory] = useState(() => {
    return getStorageValue("habitsHistory", {});
  });

  // Persist habits and categories
  useEffect(() => {
    setStorageValue("habits", habits);
    setStorageValue("categories", categories);
    setStorageValue("habitsHistory", habitsHistory);
  }, [habits, categories, habitsHistory]);

  // CRUD operations for habits
  // Add a new habit
  const addHabit = (newHabit) => {
    const habitWithId = {
      ...newHabit,
      id: newHabit.id || `habit-${Date.now()}`,
    };

    setHabits((prevHabits) => [habitWithId, ...prevHabits]);

    if (!categories.includes(habitWithId.category)) {
      setCategories((prevCategories) => [
        habitWithId.category,
        ...prevCategories,
      ]);
    }

    return habitWithId;
  };

  // Delete a habit
  const deleteHabit = (habitName) => {
    // Remove from habits list
    const updatedHabits = habits.filter((habit) => habit.name !== habitName);
    setHabits(updatedHabits);

    // Update categories list
    const activeCategories = [
      ...new Set(updatedHabits.map((habit) => habit.category)),
    ];
    setCategories(activeCategories);

    // Clean up localStorage
    removeStorageValue(habitName);
  };

  const editHabit = (habitId, updatedHabitData) => {
    setHabits((prevHabits) => {
      const updatedHabits = prevHabits.map((habit) => {
        if (habit.id === habitId) {
          return {
            ...habit,
            ...updatedHabitData,
            id: habit.id, // Keep the original ID
          };
        }
        return habit;
      });

      // Update categories list to include any new categories
      const allCategories = [
        ...new Set(updatedHabits.map((habit) => habit.category)),
      ];
      setCategories(allCategories);

      return updatedHabits;
    });
  };

  // Record habit completion in history
  const recordHabitCompletion = (
    habitName,
    date, // Change this back to date since you're using formatDateKey
    isCompleted = true
  ) => {
    // Format the date consistently
    const formatDateKey = (date) => {
      if (!date) return "";
      // Check if date is already a string in YYYY-MM-DD format
      if (typeof date === "string" && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return date; // Already formatted correctly
      }

      const d = new Date(date);
      // Get local year, month, day (not UTC)
      const year = d.getFullYear();
      // Month is 0-indexed, so add 1 and pad with 0 if needed
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Format the date parameter
    const formattedDateKey = formatDateKey(date);

    setHabitsHistory((prev) => {
      const newHistory = { ...prev };

      // Initialize date entry if it doesn't exist
      if (!newHistory[formattedDateKey]) {
        newHistory[formattedDateKey] = [];
      }

      // Add or remove the habit from history
      if (isCompleted) {
        // Add habit if not already present
        if (!newHistory[formattedDateKey].includes(habitName)) {
          newHistory[formattedDateKey] = [
            ...newHistory[formattedDateKey],
            habitName,
          ];
        }
      } else {
        // Remove habit if present
        newHistory[formattedDateKey] = newHistory[formattedDateKey].filter(
          (name) => name !== habitName
        );

        // Clean up empty date entries
        if (newHistory[formattedDateKey].length === 0) {
          delete newHistory[formattedDateKey];
        }
      }

      return newHistory;
    });
  };

  // Create context value
  const contextValue = {
    habits,
    setHabits,
    categories,
    setCategories,
    habitsHistory,
    setHabitsHistory,
    addHabit,
    deleteHabit,
    editHabit,
    recordHabitCompletion,
  };

  return (
    <HabitContext.Provider value={contextValue}>
      {children}
    </HabitContext.Provider>
  );
}

// Custom hook for using this context
export function useHabits() {
  const context = useContext(HabitContext);

  if (context === null) {
    throw new Error("useHabits must be used within a HabitProvider");
  }

  return context;
}
