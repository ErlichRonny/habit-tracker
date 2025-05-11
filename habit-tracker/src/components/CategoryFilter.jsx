import { useState } from "react";

export default function CategoryFilter({
  categories,
  filteredCategory,
  setFilteredCategory,
}) {
  const [clicked, setClicked] = useState(false);
  const handleClick = (cat) => {
    if (!clicked) {
      setFilteredCategory(cat);
      setClicked(true);
    } else {
      setFilteredCategory("");
      setClicked(false);
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
