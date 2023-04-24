import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import authService from '../services/authService';
import type { RootState } from '../store/store';

const StartingPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	
	const userIsLoggedIn = useSelector((state: RootState) => state.general.isLoggedIn);
	
	useEffect(() => {
		if (userIsLoggedIn) navigate("/manager");
	}, [])
	
	const onLogin = async () => {
		const userData = await authService.login(username, password);
		
		navigate("/manager");
	};

	const onRegister = async () => {
		const userData = await authService.register(username, password);

		navigate('/manager')
	};

	return (
		<div className='col'>
			<label htmlFor='username'>Username</label>
			<input
				value={username}
				name='username'
				type='text'
				onChange={e => setUsername(e.target.value)}
			/>

			<label htmlFor='password'>Password</label>
			<input
				value={password}
				name='password'
				type='password'
				onChange={e => setPassword(e.target.value)}
			/>

			<div className='row'>
				<button onClick={onLogin}>Login</button>
				<button onClick={onRegister}>Register</button>
			</div>
		</div>
	);
};

export default StartingPage;
