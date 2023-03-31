import { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { AdCard } from '../components/cards/AdCard';

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
			const { data } = await axios.get('/ads');
			setAdsForSale(data.adsForSell);
			setAdsForRent(data.adsForRent);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<h1 className="display-1 bg-primary text-light p-5">For Sale</h1>

			<div className="container">
				<div className="row">
					{adsForSale?.map((ad) => (
						<AdCard ad={ad} key={ad?.id} />
					))}
				</div>
			</div>

			<div className="container">
				<div className="row">
					{adsForRent?.map((ad) => (
						<AdCard ad={ad} key={ad?.id} />
					))}
				</div>
			</div>
		</div>
	);
};
