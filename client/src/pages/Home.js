import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';

export const Home = () => {
	/* Context */
	// eslint-disable-next-line no-unused-vars
	const [auth, setAuth] = useAuth();
	/* State */
	const [adsForSale, setAdsForSale] = useState();
	const [adsForRent, setAdsForRent] = useState();

	useEffect(() => {
		fetchAds();
	}, []);

	const fetchAds = async () => {
		try {
			const { data } = axios.get('/ads');
			setAdsForSale(data?.adsForSale);
			setAdsForRent(data?.adsForRent);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1 className="display-1 bg-primary text-light p-5">Home</h1>
			<pre>{JSON.stringify(auth, null, 4)}</pre>
		</div>
	);
};
