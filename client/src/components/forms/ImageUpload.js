import Resizer from 'react-image-file-resizer';
import axios from 'axios';

export const ImageUpload = ({ ad, setAd }) => {
	/* Handlers */
	const handleUpload = async (e) => {
		try {
			let files = e.target.files;
			files = [...files];

			if (files?.length) {
				setAd({ ...ad, uploading: true });

				files.map((file) => {
					return new Promise(() => {
						Resizer.imageFileResizer(
							file,
							1080,
							720,
							'JPEG',
							100,
							0,
							async (uri) => {
								try {
									// console.log("UPLOAD URI => ", uri);
									const { data } = await axios.post('/upload-image', {
										image: uri,
									});
									setAd((prev) => ({
										...prev,
										photos: [data, ...prev.photos],
										uploading: false,
									}));
								} catch (err) {
									console.log(err);
									setAd({ ...ad, uploading: false });
								}
							},
							'base64'
						);
					});
				});
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
