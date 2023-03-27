import { useContext, useState } from 'react';
import { ServicesContext } from '../services/services';
import { useNavigate } from 'react-router-dom';

const StartingPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();
	const {authService} = useContext(ServicesContext);

	if(authService.isLoggedIn())
	{
		navigate("/manager");
	}
	
	const onLogin = async () => {
		const userData = await authService.login(username, password);
		
		//if (userData === undefined) return;
		
		navigate("/manager");
	};

	const onRegister = async () => {
		const userData = await authService.register(username, password);

		if (userData === undefined) return;
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
