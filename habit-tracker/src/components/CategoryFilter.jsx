export default function CategoryFilter({
  categories,
  filteredCategory,
  setFilteredCategory,
}) {
  const handleClick = (cat) => {
    if (filteredCategory === cat) {
      setFilteredCategory("");
    } else {
      setFilteredCategory(cat);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
          filteredCategory === ""
            ? "bg-indigo-400 text-white border-indigo-600 shadow-sm"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
        }`}
        onClick={() => setFilteredCategory("")}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
            filteredCategory === cat
              ? "bg-indigo-200 text-indigo-700  border-gray-300 shadow-sm"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400"
          }`}
          onClick={() => handleClick(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
