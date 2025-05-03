export default HabitCard;

function HabitCard({name, category, streak}) {
  return (
    <>
      <p> ------- </p>
      <p> Name: {name}</p>
      <p> Category: {category}</p>
      <p> Streak: {streak}</p>
    </>
  );
}
