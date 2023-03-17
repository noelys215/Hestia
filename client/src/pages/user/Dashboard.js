import { Sidebar } from '../../components/nav/Sidebar';
import { useAuth } from '../../context/auth';

export const Dashboard = () => {
	// eslint-disable-next-line no-unused-vars
	const [auth, setAuth] = useAuth();

	return (
		<div>
			<h1 className="display-1 bg-primary text-light p-5">Dashboard</h1>
			<Sidebar />
		</div>
	);
};
