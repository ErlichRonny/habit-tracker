import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { useState } from "react";
import CalendarPage from "./components/CalendarPage";
import { HabitProvider } from "./context/HabitContext";

function App() {
  const [showCalendar, setShowCalendar] = useState(false);

  const goToDashboard = () => {
    setShowCalendar(false);
  };

  const goToCalendar = () => {
    setShowCalendar(true);
  };

  return (
    <HabitProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100">
        <Navbar
          onDashboardClick={goToDashboard}
          onCalendarClick={goToCalendar}
          currentView={showCalendar ? "calendar" : "dashboard"}
        />
        {showCalendar ? <CalendarPage /> : <Dashboard />}
      </div>
    </HabitProvider>
  );
}

export default App;
