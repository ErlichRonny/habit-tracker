import { useState, useEffect } from "react";
import { useHabits } from "../context/HabitContext";
import {
  getStorageValue,
  setStorageValue,
  removeStorageValue,
} from "../Storage";
// import js-confetti (uncomment and specify the correct path if needed)
import JSConfetti from "js-confetti";

export default function HabitCard({
  name,
  category,
  streak,
  onDelete,
  showConfetti,
}) {
  const { recordHabitCompletion } = useHabits();
  // Get a date object with time set to midnight
  const getTodayDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  // Format date consistently for storage
  const formatDateKey = (date) => {
    if (!date) return "";
    const d = new Date(date);
    // Get local year, month, day (not UTC)
    const year = d.getFullYear();
    // Month is 0-indexed, so add 1 and pad with 0 if needed
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to directly access streak data
  const getStreakData = () => {
    return getStorageValue(name, [streak || 0, null]);
  };

  // Function to check if a date is yesterday
  const isYesterday = (date) => {
    if (!date) return false;
    const testDate = new Date(date);
    testDate.setHours(0, 0, 0, 0);

    const yesterday = new Date(getTodayDate());
    yesterday.setDate(yesterday.getDate() - 1);

    return testDate.getTime() === yesterday.getTime();
  };

  // Function to check if a date is today
  const isToday = (date) => {
    if (!date) return false;
    const testDate = new Date(date);
    testDate.setHours(0, 0, 0, 0);
    return testDate.getTime() === getTodayDate().getTime();
  };

  // Set initial state based on stored data
  const [streakData, setStreakData] = useState(() => {
    const [storedStreak, lastDateStr] = getStreakData();

    // Check if we need to reset streak (missed a day or more)
    if (lastDateStr && !isToday(lastDateStr) && !isYesterday(lastDateStr)) {
      return { count: 0, lastCompleted: null, isCompleted: false };
    }

    return {
      count: storedStreak,
      lastCompleted: lastDateStr,
      isCompleted: isToday(lastDateStr),
    };
  });

  // Save streak data to localStorage
  useEffect(() => {
    if (streakData.count > 0 && streakData.lastCompleted) {
      setStorageValue(name, [streakData.count, streakData.lastCompleted]);
    } else {
      removeStorageValue(name);
    }
  }, [streakData, name]);

  const handleToggle = () => {
    // Toggle completion status
    const newIsCompleted = !streakData.isCompleted;

    // Current date
    const today = new Date();

    // Create a copy of current data
    const newData = { ...streakData };

    if (newIsCompleted) {
      // Show confetti effect if enabled
      if (showConfetti) {
        // Add confetti effect when completing a habit
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
          confettiColors: [
            "#ff0a54",
            "#ff477e",
            "#ff7096",
            "#ff85a1",
            "#fbb1bd",
            "#f9bec7",
          ],
          confettiRadius: 4.5,
          confettiNumber: 400,
        });

        // Emoji confetti
        jsConfetti.addConfetti({
          emojis: ["🌈", "🎉", "🥳", "✨", "💫", "🏆"],
          emojiSize: 40,
          confettiNumber: 30,
        });
      }
      // MARKING AS COMPLETE

      // Case 1: First completion or resuming after missing days
      if (!streakData.lastCompleted || !isYesterday(streakData.lastCompleted)) {
        newData.count = 1;
        newData.lastCompleted = today.toISOString();
        newData.isCompleted = true;
      }
      // Case 2: Continuing streak from yesterday
      else if (isYesterday(streakData.lastCompleted)) {
        newData.count = streakData.count + 1;
        newData.lastCompleted = today.toISOString();
        newData.isCompleted = true;
      }
      // Case 3: Already marked today but undid it
      else if (isToday(streakData.lastCompleted)) {
        // Just restore completion status
        newData.isCompleted = true;
      }
    } else {
      // MARKING AS INCOMPLETE

      // Only lower streak if it was completed today
      if (isToday(streakData.lastCompleted)) {
        if (streakData.count === 1) {
          // If streak is only 1, reset completely
          newData.count = 0;
          newData.lastCompleted = null;
        } else {
          // For longer streaks, reduce by 1 and set date to yesterday
          newData.count = streakData.count - 1;
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          newData.lastCompleted = yesterday.toISOString();
        }
        newData.isCompleted = false;
      }
    }

    // Update state
    setStreakData(newData);

    // Record in history
    recordHabitCompletion(name, formatDateKey(today), newIsCompleted);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-full max-w-md">
      <div className="flex items-center gap-2 mb-2">
        <button
          className="px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 transition"
          id="check-button"
          onClick={handleToggle}
        >
          {streakData.isCompleted ? "✅" : "▢"}
        </button>
        <p className="font-medium"> {name} </p>
      </div>
      <p>Category: {category}</p>
      <p className="mb-2">Streak: {streakData.count}</p>
      <button
        className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 transition"
        onClick={() => onDelete(name)}
      >
        🗑️
      </button>
    </div>
  );
}
