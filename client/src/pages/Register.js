import { useState } from 'react';
import axios from 'axios';

export const Register = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(`${process.env.REACT_APP_API}/pre-register`, {
				email,
				password,
			});
			console.log(data);
		} catch (error) {
			console.log(error);
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
							<button className="btn btn-primary col-12 mb-4">Register</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
