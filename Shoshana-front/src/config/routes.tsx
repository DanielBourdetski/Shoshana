import StartingPage from '../components/StartingPage';
import { Route } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';

const routes = [
	{
		path: '/',
		element: StartingPage,
		protected: false,
	},
];

const routesArr = routes.map((r, i) => {
	if (r.protected)
		return (
			<Route
				key={i}
				path={r.path}
				element={<AuthGuard Component={r.element} />}
			/>
		);

	return <Route key={i} path={r.path} element={<r.element />} />;
});

export default routes;
