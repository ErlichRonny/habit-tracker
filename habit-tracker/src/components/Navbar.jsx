function Navbar({ handleContentToggle }) {
    
  return (
    <div className="flex justify-center items-center gap-2 mb-4">
      <h1 className="text-3xl font-bold text-center" onClick={handleContentToggle}> Dashboard </h1>
      <button className="text-3xl text-center" onClick={handleContentToggle}> Calendar View </button>
    </div>
  );
}

export default Navbar;
