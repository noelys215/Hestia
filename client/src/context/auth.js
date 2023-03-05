import { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: null,
		token: '',
		refreshToken: '',
	});

	useEffect(() => {
		let fromLS = localStorage.getItem('auth');
		if (fromLS) setAuth(JSON.parse(fromLS));
	}, []);

	// Configured Axios
	axios.defaults.baseURL = process.env.REACT_APP_API;

	return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
