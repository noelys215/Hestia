import { useAuth } from '../context/auth';

export const Home = () => {
	// eslint-disable-next-line no-unused-vars
	const [auth, setAuth] = useAuth();

	return (
		<div>
			<h1 className="display-1 bg-primary text-light p-5">Home</h1>
			<pre>{JSON.stringify(auth, null, 4)}</pre>
		</div>
	);
};
