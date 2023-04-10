import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import CurrencyInput from 'react-currency-input-field';
import { ImageUpload } from './ImageUpload';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';

export const AdForm = ({ action, type }) => {
	/* Context */
	const [auth, setAuth] = useAuth();
	/* Hooks */
	// const navigate = useNavigate();
	/* State */
	const [ad, setAd] = useState({
		photos: [],
		uploading: false,
		price: '',
		address: '',
		bedrooms: '',
		bathrooms: '',
		carpark: '',
		landsize: '',
		title: '',
		description: '',
		loading: false,
		type,
		action,
	});

	const handleSubmit = async () => {
		try {
			setAd({ ...ad, loading: true });
			const { data } = await axios.post('/ad', ad);
			if (data?.error) {
				toast.error(data.error);
				setAd({ ...ad, loading: false });
			} else {
				/* Update Context */
				setAuth({ ...auth, user: data.user });
				/* Update Local Storage */
				const fromLS = JSON.parse(localStorage.getItem('auth'));
				fromLS.user = data.user;
				localStorage.setItem('auth', JSON.stringify(fromLS));

				toast.success('Ad Created');
				setAd({ ...ad, loading: false });
				// navigate('/dashboard');
				/* Reload page on redirect */
				window.location.href = '/dashboard';
			}
		} catch (err) {
			console.log(err);
			setAd({ ...ad, loading: false });
		}
	};

	return (
		<>
			<div className="mb-3 form-control">
				<GooglePlacesAutocomplete
					apiKey={process.env.REACT_APP_GOOGLE_PLACES_KEY}
					apiOptions="us"
					selectProps={{
						defaultInputValue: ad?.address,
						placeholder: 'Search for address..',
						onChange: ({ value }) => {
							setAd({ ...ad, address: value.description });
						},
					}}
				/>
				<div className="mt-3 ">
					<ImageUpload ad={ad} setAd={setAd} />
				</div>
			</div>

			<div style={{ marginTop: '80px' }}>
				<CurrencyInput
					placeholder="Price"
					defaultValue={ad.price}
					className="form-control mb-3"
					onValueChange={(value) => setAd({ ...ad, price: value })}
				/>
			</div>

			{type === 'House' ? (
				<>
					<input
						type="number"
						min="0"
						className="form-control mb-3"
						placeholder="Bedrooms"
						value={ad.bedrooms}
						onChange={(e) => setAd({ ...ad, bedrooms: e.target.value })}
					/>

					<input
						type="number"
						min="0"
						className="form-control mb-3"
						placeholder="Bathrooms"
						value={ad.bathrooms}
						onChange={(e) => setAd({ ...ad, bathrooms: e.target.value })}
					/>

					<input
						type="number"
						min="0"
						className="form-control mb-3"
						placeholder="Carpark"
						value={ad.carpark}
						onChange={(e) => setAd({ ...ad, carpark: e.target.value })}
					/>
				</>
			) : (
				''
			)}

			<input
				type="text"
				className="form-control mb-3"
				placeholder="Land Size"
				value={ad.landsize}
				onChange={(e) => setAd({ ...ad, landsize: e.target.value })}
			/>

			<input
				type="text"
				className="form-control mb-3"
				placeholder="Title"
				value={ad.title}
				onChange={(e) => setAd({ ...ad, title: e.target.value })}
			/>

			<textarea
				className="form-control mb-3"
				placeholder="Description"
				value={ad.description}
				onChange={(e) => setAd({ ...ad, description: e.target.value })}
			/>

			<button
				onClick={handleSubmit}
				className={`btn btn-primary mb-5 ${ad.loading ? 'disabled' : ''}`}>
				{ad.loading ? 'Saving...' : 'Submit'}
			</button>
		</>
	);
};
