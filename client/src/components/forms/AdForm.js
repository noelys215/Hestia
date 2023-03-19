import { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

export const AdForm = ({ action, type }) => {
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
		type: '',
		title: '',
		description: '',
		loading: false,
	});
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
			</div>

			<pre>{JSON.stringify(ad, null, 4)}</pre>
		</>
	);
};
