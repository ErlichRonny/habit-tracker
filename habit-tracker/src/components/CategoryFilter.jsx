export default function CategoryFilter({
  categories,
  filteredCategory,
  setFilteredCategory,
}) {
  const handleClick = (cat) => {
    if (filteredCategory === cat) {
      // If clicking the same habit that's already selected, clear the filter
      setFilteredCategory("");
    } else {
      // If clicking a different habit, switch to it
      setFilteredCategory(cat);
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <button
        className={`px-3 py-1 rounded-full text-sm ${
          filteredCategory === "" ? "bg-blue-200" : "bg-gray-100"
        }`}
        onClick={() => setFilteredCategory("")}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-3 py-1 rounded-full text-sm ${
            filteredCategory === cat ? "bg-blue-200" : "bg-gray-100"
          }`}
          onClick={() => handleClick(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
