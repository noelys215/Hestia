import { AWS_S3 } from '../utils/config.js';
import { nanoid } from 'nanoid';

export const uploadImage = async (req, res) => {
	try {
		const { image } = req.body;

		const base64Image = new Buffer.from(
			image.replace(/^data:image\/\w+;base64,/, ''),
			'base64'
		);
		const type = image.split(';')[0].split('/')[1];

		/* Image Params */
		const params = {
			Bucket: 'hestia-bucket',
			Key: `${nanoid()}.${type}`,
			Body: base64Image,
			ACL: 'public-read',
			ContentEncoding: 'base64',
			ContentType: `image/${type}`,
		};

		AWS_S3.upload(params, (err, data) => {
			if (err) {
				console.log(err);
				res.sendStatus(400);
			} else {
				console.log(data);
				res.send(data);
			}
		});
	} catch (error) {
		console.log(error);
		res.json({ error: 'Upload Failed' });
	}
};

export const removeImage = async (req, res) => {
	try {
		const { Key, Bucket } = req.body;

		AWS_S3.deleteObject({ Bucket, Key }, (err, data) => {
			if (err) {
				console.log(err);
				res.sendStatus(400);
			} else {
				res.send({ ok: true });
			}
		});
	} catch (error) {
		console.log(error);
	}
};
