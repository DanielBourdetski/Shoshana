import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import DEBUG from "./components/DEBUG/DEBUG";
import { routesArr } from "./config/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/navBar/NavBar";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import AddAppointment from "./components/calendar/AddAppointment";
// import NextAppointment from "./components/NextAppointment";
import { Appointment } from "./types";
// import { getAppointments } from "./services/calendarService";



function App() {
  
  const [debug, setDebug] = useState(true);
  const isLoggedIn = useSelector(
    (state: RootState) => state.general.isLoggedIn
  );

  useEffect(() => {
    const toggleDebug = (e: KeyboardEvent) => {
      if (e.key === "F9") setDebug((cs) => !cs);
    };

    window.addEventListener("keydown", toggleDebug);

    // TODO handle JWT: fetching from localhost, sending for confirmation

    return () => window.removeEventListener("keydown", toggleDebug);
  }, [debug]);

  return (
    <>
      <div className="w-full h-full p-4 overflow-y-auto">
        {isLoggedIn && <NavBar />}
        <ToastContainer limit={3} position="bottom-center" />
        <Routes>{routesArr}</Routes>
        {debug && <DEBUG />}
      </div>
    </>
  );
}

export default App;
