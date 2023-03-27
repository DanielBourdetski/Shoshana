import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPage from './components/AdminPage';
import StartingPage from './components/StartingPage';
import AuthGuard from './components/AuthGuard';

function App() {

	return (
		<div className=''>
			<Routes>
				<Route
					path='/'
					element={<StartingPage />}
				/>
				<Route
					path='/manager'
					element={<AuthGuard Component={AdminPage} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
