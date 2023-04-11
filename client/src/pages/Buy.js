import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AdCard } from '../components/cards/AdCard';
import { SearchForm } from '../components/forms/SearchForm';

export const Buy = () => {
	/* State */
	const [ads, setAds] = useState([]);

	useEffect(() => {
		fetchAds();
	}, []);

	const fetchAds = async () => {
		try {
			const { data } = await axios.get('/ads-for-sell');
			setAds(data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<SearchForm />
			<h1 className="display-1 bg-primary text-light p-5">For Rent</h1>
			<div className="container">
				<div className="row">
					{ads?.map((ad) => (
						<AdCard ad={ad} key={ad._id} />
					))}
				</div>
			</div>
		</div>
	);
};
