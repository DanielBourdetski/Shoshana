import { useContext, useState } from 'react';
import { ServicesContext, UserData } from '../services/services';
import createServices from '../services/services';

interface Props {
	handleAuth: (userData: UserData) => void;
}

const StartingPage = ({ handleAuth }: Props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const modeType = useContext(ServicesContext);

	const { authService } = createServices(modeType);

	const onLogin = async () => {
		const userData = await authService.login(username, password);

		if (userData === undefined) return;

		handleAuth(userData);
	};

	const onRegister = async () => {
		const userData = await authService.login(username, password);

		if (userData === undefined) return;

		handleAuth(userData);
	};

	return (
		<form className='col'>
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
		</form>
	);
};

export default StartingPage;
