import { NavLink } from 'react-router-dom';

export const Main = () => {
	return (
		<nav className="nav d-flex justify-content-between">
			<NavLink className="nav-link" to="/">
				Home
			</NavLink>
			<NavLink className="nav-link" to="/login">
				Login
			</NavLink>
			<NavLink className="nav-link" to="/register">
				Register
			</NavLink>

			<div className="dropdown">
				<li>
					<button
						className="nav-link dropdown-toggle navButton"
						data-bs-toggle="dropdown">
						User
					</button>
					<ul className="dropdown-menu">
						<li>
							<NavLink className="nav-link" to="/dashboard">
								Dashboard
							</NavLink>
						</li>
						<li>
							<a className="nav-link" href="/logout">
								Logout
							</a>
						</li>
					</ul>
				</li>
			</div>
		</nav>
	);
};
