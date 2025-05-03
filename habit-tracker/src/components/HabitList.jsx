import HabitCard from "./HabitCard";
import { useState } from "react";

function HabitList() {
  const [habits, setHabits] = useState([
    { name: "Drink water", category: "Wellness", streak: 10, id: 1 },
    { name: "Exercise", category: "Wellness", streak: 2, id: 2 },
  ]);

  const handleDelete = (habitName) => {
    setHabits(habits.filter(habit => habit.name !== habitName));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Habits</h1>
      <div className="flex flex-col items-center gap-4 w-full">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            {...habit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default HabitList;
