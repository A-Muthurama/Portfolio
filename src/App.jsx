import React, { useEffect, useState } from "react";
import Portfolio from "./components/portf";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("portfolio-theme");
    if (savedMode === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
    }
  };

  return (
    <div className="App">
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <Portfolio />
    </div>
  );
}

export default App;
