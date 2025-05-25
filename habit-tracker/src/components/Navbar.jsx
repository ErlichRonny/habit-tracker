function Navbar({ onDashboardClick, onCalendarClick, currentView }) {
  return (
    <nav className="flex justify-center items-center gap-4 py-4 border-b border-gray-200 bg-white dark:bg-gray-900 shadow-sm">
      <button
        className={`text-2xl font-bold text-center cursor-pointer transition-colors duration-200 ${
          currentView === "dashboard"
            ? "text-gray-700 dark:text-gray-200"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-400 dark:hover:text-gray-300"
        }`}
        onClick={onDashboardClick}
      >
        Dashboard
      </button>
      <button
        className={`text-2xl font-bold text-center cursor-pointer transition-colors duration-200 ${
          currentView === "calendar"
            ? "text-gray-700 dark:text-gray-200"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-400 dark:hover:text-gray-300"
        }`}
        onClick={onCalendarClick}
      >
        Calendar View
      </button>
    </nav>
  );
}

export default Navbar;
