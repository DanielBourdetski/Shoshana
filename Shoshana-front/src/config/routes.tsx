import StartingPage from "../components/StartingPage";
import { Route, Navigate } from "react-router-dom";
import AuthGuard from "../components/AuthGuard";
import ManagerPage from "../components/manager/ManagerPage";
import Month from "../components/calendar/month/Month";
import MonthRow from "../components/calendar/monthRow/MonthRow";
import Week from "../components/calendar/week/Week";
import Calendar from "../components/calendar/Calendar";

const routes = [
  // ! on route / no route is detected
  {
    path: "auth/:formType",
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

  {
    path: "/",
    Element: () => <Navigate to="/calendar" />,
    protected: false,
  },
];

const calendarRoutes = [
  { path: "", Element: Month },
  { path: "month-row", Element: MonthRow },
  { path: "week", Element: Week },
];

// TODO there is a built-in "configure routes from data" method in react-router, implement it

export const routesArr = routes.map((route, i) => {
  if (route.protected)
    return (
      <Route
        key={i}
        path={route.path}
        element={<AuthGuard Component={route.Element} />}
      />
    );

  return <Route key={i} path={route.path} element={<route.Element />} />;
});

export default { routes, calendarRoutes };
