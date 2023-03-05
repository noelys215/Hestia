import { useState, createContext, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: null,
		token: '',
		refreshToken: '',
	});

	// Configured Axios
	axios.defaults.baseURL = process.env.REACT_APP_API;

	return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
