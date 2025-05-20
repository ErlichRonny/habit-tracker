import { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useHabits } from "../context/HabitContext";

export default function CalendarPage() {
  const { habits, habitsHistory } = useHabits();

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Format date to local YYYY-MM-DD (not UTC/ISO)
  const formatDateKey = useCallback((date) => {
    if (!date) return "";
    const d = new Date(date);
    // Get local year, month, day (not UTC)
    const year = d.getFullYear();
    // Month is 0-indexed, so add 1 and pad with 0 if needed
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  const [dateKey, setDateKey] = useState(() => formatDateKey(selectedDate));

  // Debug available dates with better formatting
  const availableDates = Object.keys(habitsHistory || {}).map((key) => {
    return {
      key,
      habits: habitsHistory[key] || [],
    };
  });

  // Log the available dates in a clearer format
  useEffect(() => {
    console.log("Available dates in history:");
    availableDates.forEach((date) => {
      console.log(`- ${date.key}: ${date.habits.length} habits`);
    });
  }, [availableDates, habitsHistory]);

  // Update dateKey whenever selectedDate changes
  useEffect(() => {
    const newKey = formatDateKey(selectedDate);
    console.log(`Setting dateKey from ${dateKey} to ${newKey}`);
    setDateKey(newKey);
  }, [selectedDate, formatDateKey, dateKey]);

  // Handle date selection
  const handleDateChange = (date) => {
    console.log(
      `Calendar date changed to: ${date} (will format as: ${formatDateKey(
        date
      )})`
    );
    setSelectedDate(date);
  };

  // Get habits completed on the selected date
  const getHabitsForDate = (dateString) => {
    if (!dateString || !habitsHistory) return [];
    return habitsHistory[dateString] || [];
  };

  // Add indicators to calendar tiles
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const tileDateKey = formatDateKey(date);
    const completedHabits = habitsHistory[tileDateKey];

    if (!completedHabits || completedHabits.length === 0) return null;

    return (
      <div className="flex justify-center mt-1">
        <div
          className={`h-2 w-2 rounded-full ${
            completedHabits.length === habits.length
              ? "bg-green-500"
              : "bg-yellow-500"
          }`}
        />
      </div>
    );
  };

  // Get the habits for currently selected date
  const habitsForSelectedDate = getHabitsForDate(dateKey);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Habit Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={tileContent}
      />

      <div className="mt-4 bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold">
          {selectedDate.toLocaleDateString()}
        </h2>

        <div className="mt-2">
          <h3 className="font-medium">Completed Habits:</h3>
          <ul className="mt-1 pl-5 list-disc">
            {habitsForSelectedDate.length > 0 ? (
              habitsForSelectedDate.map((habitName) => (
                <li key={habitName}>{habitName}</li>
              ))
            ) : (
              <p className="text-gray-500">No habits completed on this date</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
