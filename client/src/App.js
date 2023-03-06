import { Main } from './components/nav/Main';
import { AuthProvider } from './context/auth';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AccountActivate } from './pages/auth/AccountActivate';
import { ForgotPassword } from './pages/auth/ForgotPassword';

function App() {
	return (
		<BrowserRouter>
			<Toaster />
			<AuthProvider>
				<Main />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/auth/account-activate/:token" element={<AccountActivate />} />
					<Route path="/auth/forgot-password" element={<ForgotPassword />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
