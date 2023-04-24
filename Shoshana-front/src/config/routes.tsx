import StartingPage from "../components/StartingPage";
import { Route } from "react-router-dom";
import AuthGuard from "../components/AuthGuard";
import ManagerPage from "../components/manager/ManagerPage";

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
];

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

export default routes;
