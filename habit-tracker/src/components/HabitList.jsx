import HabitCard from "./HabitCard";

function HabitList() {
  const habits = [
    { name: "Drink water", category: "Wellness", streak: 10, id: 1 },
    { name: "Exercise", category: "Wellness", streak: 2, id: 2 },
  ];

  return (
    <>
      <h1 className="text-center"> Habits </h1>
      <ul className="max-w-xl mx-auto bg-gray-100 rounded-lg shadow-md">
        {habits.map((habit) => (
          <HabitCard
            name={habit.name}
            category={habit.category}
            streak={habit.streak}
          />
        ))}
      </ul>
    </>
  );
}

export default HabitList;
