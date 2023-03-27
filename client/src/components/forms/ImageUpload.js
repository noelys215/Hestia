import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { Avatar } from 'antd';

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

	const handleDelete = async (photo) => {
		const answer = window.confirm('Delete image?');
		if (!answer) return;
		setAd({ ...ad, uploading: true });
		try {
			const { data } = await axios.post('/remove-image', photo);
			if (data?.ok) {
				setAd((prev) => ({
					...prev,
					photos: prev.photos.filter((p) => p.Key !== photo.Key),
					uploading: false,
				}));
			}
		} catch (err) {
			console.log(err);
			setAd({ ...ad, uploading: false });
		}
	};

	return (
		<>
			<label className="btn btn-secondary mb-4">
				{ad.uploading ? 'Processing...' : 'Upload photos'}
				<input onChange={handleUpload} type="file" accept="image/*" multiple hidden />
			</label>
			{ad.photos?.map((file, index) => (
				<Avatar
					key={index}
					src={file?.Location}
					shape="square"
					size="large"
					className="ml-2 mb-4"
					onClick={() => handleDelete(file)}
				/>
			))}
		</>
	);
};
