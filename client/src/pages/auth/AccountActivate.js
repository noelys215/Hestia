import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import axios from 'axios';

export const AccountActivate = () => {
	// context
	// eslint-disable-next-line no-unused-vars
	const [auth, setAuth] = useAuth();
	// hooks
	const { token } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (token) requestActivation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	const requestActivation = async () => {
		try {
			const { data } = await axios.post(`/register`, { token });
			if (data?.error) {
				toast.error(data.error);
			} else {
				// save in local storage
				localStorage.setItem('auth', JSON.stringify(data));
				// save in context
				setAuth(data);
				toast.success('Successfully logged in. Welcome to Realist app.');
				navigate('/');
			}
		} catch (err) {
			console.log(err);
			toast.error('Something went wrong. Try again.');
		}
	};

	return (
		<div
			className="display-1 d-flex justify-content-center align-items-center vh-100"
			style={{ marginTop: '-5%' }}>
			Please wait...
		</div>
	);
};
