function Navbar({ onDashboardClick, onCalendarClick, currentView }) {
  return (
<nav className="flex justify-center items-center gap-4 py-4 border-b border-gray-200 bg-white shadow-sm">
      <button className={`text-2xl font-bold text-center cursor-pointer transition-colors duration-200 ${
          currentView === "dashboard"
            ? "text-gray-700"
            : "text-gray-500 hover:text-gray-400"
        }`}
        onClick={onDashboardClick}
      >
        Dashboard
      </button>
      <button
        className={`text-2xl font-bold text-center cursor-pointer transition-colors duration-200 ${
          currentView === "calendar"
            ? "text-gray-700"
            : "text-gray-500 hover:text-gray-400"
        }`}
        onClick={onCalendarClick}
      >
        Calendar View
      </button>
    </nav>
  );
}

export default Navbar;
