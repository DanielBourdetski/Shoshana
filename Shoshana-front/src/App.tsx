import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import DEBUG from "./components/DEBUG/DEBUG";
import { routesArr } from "./config/routes";

function App() {
  const [debug, setDebug] = useState(true);

  useEffect(() => {
    const toggleDebug = (e: KeyboardEvent) => {
      if (e.key === "F9") setDebug((cs) => !cs);
    };

    window.addEventListener("keydown", toggleDebug);

    // TODO handle JWT: fetching from localhost, sending for confirmation

    return () => window.removeEventListener("keydown", toggleDebug);
  }, [debug]);

  return (
    <div className="w-full h-full p-4">
      <Routes>{routesArr}</Routes>
      {debug && <DEBUG />}
    </div>
  );
}

export default App;
