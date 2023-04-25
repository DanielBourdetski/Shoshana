import StartingPage from "../components/StartingPage";
import { Route } from "react-router-dom";
import AuthGuard from "../components/AuthGuard";
import ManagerPage from "../components/manager/ManagerPage";
import Month from "../components/calendar/month/Month";
import MonthRow from "../components/calendar/monthRow/MonthRow";
import Week from "../components/calendar/week/Week";
import Calendar from "../components/calendar/Calendar";

const routes = [
  {
    path: "/",
    Element: StartingPage,
    protected: false,
  },

  {
    path: "/manager",
    Element: ManagerPage,
    protected: true,
  },

  {
    path: "/calendar/*",
    Element: Calendar,
    protected: true,
  },
];

const calendarRoutes = [
  { path: "month", Element: Month },
  { path: "month-row", Element: MonthRow },
  { path: "week", Element: Week },
];

// TODO there is a built-in "configure routes from data" method in react-router, implement it

export const routesArr = routes.map((r, i) => {
  if (r.protected)
    return (
      <Route
        key={i}
        path={r.path}
        element={<AuthGuard Component={r.Element} />}
      />
    );

  return <Route key={i} path={r.path} element={<r.Element />} />;
});

export default { routes, calendarRoutes };
