export default function DeleteForm({ onDeleteHabit, habitName, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDeleteHabit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-start p-6 bg-gray-50">
        <h1 className="text-xl font-bold mb-6">Delete Habit</h1>

        <div className="mb-4 w-full max-w-sm">
          <p className="block mb-4 font-medium">
            Permanently delete '{habitName}' habit?
          </p>

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-red-100 hover:bg-red-200 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
