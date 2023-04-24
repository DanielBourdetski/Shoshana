import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import DEBUG from "./components/DEBUG/DEBUG";
import { routesArr } from "./config/routes";

function App() {
  useEffect(() => {
    const toggleDebug = (e: KeyboardEvent) => {
      if (e.key === "F9") setDebug((cs) => !cs);
    };

    window.addEventListener("keydown", toggleDebug);

    return () => window.removeEventListener("keydown", toggleDebug);
  }, []);
  const [debug, setDebug] = useState(true);

  return (
    <div className="app col">
      <Routes>{routesArr}</Routes>
      {debug && <DEBUG />}
    </div>
  );
}

export default App;
