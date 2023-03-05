import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
	/* States */
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	/* Hooks */
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const { data } = await axios.post(`/pre-register`, { email, password });

			if (data?.error) {
				toast.error(data?.error);
				setLoading(false);
			} else {
				toast.success('Check Email');
				setLoading(false);
				navigate('/');
			}
		} catch (err) {
			setLoading(false);
			toast.error(err);
		}
	};

	return (
		<div>
			<h1 className="display-1 bg-primary text-light p-5">Register</h1>

			<div className="container">
				<div className="row">
					<div className="col-lg-4 offset-lg-4">
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								placeholder="Enter Email"
								className="form-control mb-4"
								required
								autoFocus
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
							<input
								type="password"
								placeholder="Enter Password"
								className="form-control mb-4"
								required
								autoFocus
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							<button className="btn btn-primary col-12 mb-4" disabled={loading}>
								{loading ? 'Waiting...' : 'Register'}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
