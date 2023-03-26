import React, { useContext, useEffect } from 'react';
import { ReactPropTypes } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../services/services';

interface Props {
	Component: () => JSX.Element;
	elementType?: string;
}

const AuthGuard = ({ Component }: Props) => {
	const navigate = useNavigate();
	const userData = useContext(UserDataContext);

	useEffect(() => {
		// if (!userData) navigate('/');
	}, []);

	return <Component />;
};

export default AuthGuard;
