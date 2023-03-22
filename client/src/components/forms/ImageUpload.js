// import Resizer from 'react-image-file-resizer';
// import axios from 'axios';

export const ImageUpload = ({ ad, setAd }) => {
	/* Handlers */
	const handleUpload = async (e) => {
		try {
			let files = e.target.files;
			files = [...files];

			if (files?.length) {
				setAd({ ...ad, uploading: true });
			}
		} catch (error) {
			setAd({ ...ad, uploading: false });
			console.log(error);
		}
	};

	const handleDelete = async () => {
		try {
			setAd({ ...ad, uploading: true });
		} catch (error) {
			setAd({ ...ad, uploading: false });
			console.log(error);
		}
	};

	return (
		<>
			<label className="btn btn-secondary mb-4">
				Upload Photos
				<input onChange={handleUpload} type="file" accept="image/*" multiple hidden />
			</label>
		</>
	);
};
