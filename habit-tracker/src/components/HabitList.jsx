import HabitCard from "./HabitCard";

function HabitList() {
  const habits = [
    { name: "Drink water", category: "Wellness", streak: 10, id: 1 },
    { name: "Exercise", category: "Wellness", streak: 2, id: 2 },
  ];
  const handleHabitClick = (habitName) => {
    alert(`Habit clicked: ${habitName}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Habits</h1>
      <div className="flex flex-col items-center gap-4 w-full">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            name={habit.name}
            category={habit.category}
            streak={habit.streak}
          />
        ))}
      </div>
    </div>
  );
}

export default HabitList;
