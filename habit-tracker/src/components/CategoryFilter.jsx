export default function CategoryFilter({
  categories,
  filteredCategory,
  setFilteredCategory,
}) {
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
          onClick={() => setFilteredCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
