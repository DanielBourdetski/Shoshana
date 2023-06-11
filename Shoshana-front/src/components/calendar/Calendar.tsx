import { Route, Routes } from "react-router-dom";
import routes from "../../config/routes";
import { getAppointments } from "../../services/appointmentService";

const Calendar = () => {
  const { calendarRoutes } = routes;
  const routesArr = calendarRoutes.map((r) => (
    <Route key={r.path} Component={r.Element} path={r.path} />
  ));

  getAppointments();

  return (
    <div className="w-full h-full">
      <Routes>{routesArr}</Routes>
    </div>
  );
};

export default Calendar;

// ? this should hold the state of month/week to prevent useless calculations (like filling month/week calendar with dates, if the month/week is chosen beforehand and wont change)
