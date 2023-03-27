import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServicesContext } from '../services/services';

interface Props {
	Component: () => JSX.Element;
	elementType?: string;
}

const AuthGuard = ({ Component }: Props) => {
	const navigate = useNavigate();
	const {authService} = useContext(ServicesContext);
	
	console.log(authService.isLoggedIn());

	useEffect(()=> {
		if(!authService.isLoggedIn()) {
			navigate("/");
		}
	}, []);

	return <Component />;
};

export default AuthGuard;
