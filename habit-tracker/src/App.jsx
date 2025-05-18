import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { useState } from "react";
import CalendarPage from "./components/CalendarPage";
import { HabitProvider } from "./context/HabitContext";

function App() {
  const [showCalendar, setShowCalendar] = useState(false);
  const handleContentToggle = () => {
    setShowCalendar(!showCalendar);
  };
  return (
    <HabitProvider>
      <div>
        <Navbar handleContentToggle={handleContentToggle} />
        {showCalendar ? (
          <CalendarPage />
        ) : (
          <Dashboard handleContentToggle={handleContentToggle} />
        )}
      </div>
    </HabitProvider>
  );
}

export default App;
