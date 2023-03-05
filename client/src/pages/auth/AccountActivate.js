import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import axios from 'axios';

export const AccountActivate = () => {
	/* Hooks */
	const { token } = useParams();
	const navigate = useNavigate();
	/* Context */
	const [auth, setAuth] = useAuth();

	const requestActivation = async () => {
		try {
			const { data } = axios.post(`/register`, { token });
			if (data?.error) {
				toast.error(data?.error);
			} else {
				setAuth(data);
				toast.success('Success');
				navigate('/');
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong, try again');
		}
	};

	useEffect(() => {
		if (token) requestActivation();
	}, [token]);

	return (
		<div
			className="display-1 d-flex justify-content-center align-items-center vh-100"
			style={{ marginTop: '-5%' }}>
			Please wait...
		</div>
	);
};
