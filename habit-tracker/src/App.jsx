import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import React, { useState } from 'react';
import CalendarPage from './components/CalendarPage';

function App() {
  const [showCalendar, setShowCalendar] = useState(false); 
  const handleContentToggle = () => {
    setShowCalendar(!showCalendar);
  };
  return (
    <div>
      <Navbar handleContentToggle={handleContentToggle} />
      {showCalendar ? <CalendarPage /> : <Dashboard handleContentToggle={handleContentToggle} />}
    </div>
  );
}

export default App;

