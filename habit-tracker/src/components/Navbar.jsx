function Navbar({ onDashboardClick, onCalendarClick, currentView }) {
  return (
    <div className="flex justify-center items-center gap-2 mb-4">
      <h1
        className={`text-2xl font-bold text-center cursor-pointer transition-colors duration-200 ${
          currentView === "dashboard"
            ? "text-gray-700"
            : "text-gray-500 hover:text-gray-400"
        }`}
        onClick={onDashboardClick}
      >
        Dashboard
      </h1>
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
    </div>
  );
}

export default Navbar;
