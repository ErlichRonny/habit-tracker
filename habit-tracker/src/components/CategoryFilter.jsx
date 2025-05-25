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
            ? "bg-indigo-400 dark:bg-indigo-500 text-white border-indigo-600 dark:border-indigo-700 shadow-sm"
            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
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
              ? "bg-indigo-200 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 border-gray-300 dark:border-gray-600 shadow-sm"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
          }`}
          onClick={() => handleClick(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
