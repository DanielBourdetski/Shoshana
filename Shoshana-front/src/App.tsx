import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPage from './components/AdminPage';
import StartingPage from './components/StartingPage';
import { UserDataContext } from './services/services';
import type { UserData } from './services/services';
import AuthGuard from './components/AuthGuard';

function App() {
	const [userData, setUserData] = useState<UserData | null>(null);

	const updateUserData = (userData: UserData) => {
		setUserData(userData);
	};

	return (
		<div className=''>
			<UserDataContext.Provider value={{ userData, updateUserData }}>
				<Routes>
					<Route
						path='/'
						element={<StartingPage handleAuth={updateUserData} />}
					/>

					<Route
						path='/manager'
						element={<AuthGuard Component={AdminPage} />}
					/>
				</Routes>
			</UserDataContext.Provider>
		</div>
	);
}

export default App;
