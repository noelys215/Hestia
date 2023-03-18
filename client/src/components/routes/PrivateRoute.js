import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';

export const PrivateRoute = () => {
	// Context
	// eslint-disable-next-line no-unused-vars
	const [auth, setAuth] = useAuth();
	const [ok, setOk] = useState(false);

	useEffect(() => {
		if (auth?.token) getCurrentUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth?.token]);

	const getCurrentUser = async () => {
		try {
			// eslint-disable-next-line no-unused-vars
			const { data } = await axios.get('/current-user', {
				headers: {
					Authorization: auth?.token,
				},
			});
			setOk(true);
		} catch (err) {
			setOk(false);
		}
	};

	return ok ? <Outlet /> : '';
};
