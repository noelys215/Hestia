import { Main } from './components/nav/Main';
import { AuthProvider } from './context/auth';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
	return (
		<BrowserRouter>
			<Main />
			<Toaster />
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
