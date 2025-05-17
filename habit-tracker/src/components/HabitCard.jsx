import { useState, useEffect } from "react";
import { useCallback } from "react";

export default function HabitCard({ name, category, streak, onDelete }) {
  const getTodayDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  // Load data from localStorage
  const loadStoredData = useCallback(() => {
    const storedValue = localStorage.getItem(name);
    if (storedValue) {
      try {
        return JSON.parse(storedValue);
      } catch (e) {
        console.error("Error parsing stored data:", e);
        return [0, null];
      }
    }
    return [streak || 0, null];
  }, [name, streak]);

  // Track the highest streak achieved today for restoration
  const [highestTodayStreak, setHighestTodayStreak] = useState(0);

  // Check if this habit was completed today
  const wasCompletedToday = () => {
    const storedValue = localStorage.getItem(name);
    if (storedValue) {
      try {
        const [_, lastDateStr] = JSON.parse(storedValue);
        if (!lastDateStr) return false;

        const lastDate = new Date(lastDateStr);
        lastDate.setHours(0, 0, 0, 0);
        return lastDate.getTime() === getTodayDate().getTime();
      } catch {
        return false;
      }
    }
    return false;
  };

  // Initialize states
  const [isComplete, setComplete] = useState(wasCompletedToday);
  const [completedStreak, setStreak] = useState(() => {
    const [storedStreak] = loadStoredData();
    return storedStreak;
  });

  // Save streak data when it changes
  useEffect(() => {
    if (completedStreak > 0) {
      // Get the last saved date
      const [, lastDateStr] = loadStoredData();
      let dateToSave;

      if (isComplete) {
        // If marked complete, use today's date
        dateToSave = new Date();

        // Update highest streak achieved today
        if (completedStreak > highestTodayStreak) {
          setHighestTodayStreak(completedStreak);
        }
      } else if (lastDateStr) {
        // If unmarked but there was a previous date, use that
        const lastDate = new Date(lastDateStr);

        // If last completion was today, keep that date
        if (
          new Date(lastDate).setHours(0, 0, 0, 0) === getTodayDate().getTime()
        ) {
          dateToSave = lastDate;
        } else {
          // Otherwise use the original date
          dateToSave = lastDate;
        }
      } else {
        // Fallback - use yesterday
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        dateToSave = yesterday;
      }

      localStorage.setItem(name, JSON.stringify([completedStreak, dateToSave]));
    } else {
      localStorage.removeItem(name);
    }
  }, [completedStreak, isComplete, name, highestTodayStreak, loadStoredData]);

  const handleToggle = () => {
    const today = getTodayDate();
    const [currentStreak, lastDateStr] = loadStoredData();

    const lastDate = lastDateStr ? new Date(lastDateStr) : null;
    if (lastDate) lastDate.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Get today's start and end
    const todayStart = getTodayDate();
    const todayEnd = new Date(todayStart);
    todayEnd.setHours(23, 59, 59, 999);

    // Toggling from complete to incomplete
    if (isComplete) {
      setComplete(false);

      // Only decrement if it was completed today
      if (lastDate && lastDate.getTime() === today.getTime()) {
        // Decrement the streak (but not below 0)
        const newStreak = Math.max(currentStreak - 1, 0);
        setStreak(newStreak);
      }
    }
    // Toggling from incomplete to complete
    else {
      setComplete(true);

      // If toggle a habit off and on on the same day, restore the previous streak
      if (
        lastDate &&
        lastDate.getTime() >= todayStart.getTime() &&
        lastDate.getTime() <= todayEnd.getTime() &&
        highestTodayStreak > 0
      ) {
        setStreak(highestTodayStreak);
      }
      // Check if completed yesterday (streak continues)
      else if (lastDate && lastDate.getTime() === yesterday.getTime()) {
        const newStreak = currentStreak + 1;
        setStreak(newStreak);

        // Update highest today streak
        setHighestTodayStreak(newStreak);
      }
      // If this is the first completion or days were missed
      else if (!lastDate || lastDate.getTime() < yesterday.getTime()) {
        setStreak(1);
        setHighestTodayStreak(1);
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-full max-w-md">
      <div className="flex items-center gap-2 mb-2">
        <button
          className="px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 transition"
          onClick={handleToggle}
        >
          {isComplete ? "✅" : "▢"}
        </button>
        <p className="font-medium"> {name} </p>
      </div>
      <p>Category: {category}</p>
      <p className="mb-2">Streak: {completedStreak}</p>
      <button
        className="px-2 py-1 rounded bg-red-100 hover:bg-red-200 transition"
        onClick={() => onDelete(name)}
      >
        🗑️
      </button>
    </div>
  );
}
