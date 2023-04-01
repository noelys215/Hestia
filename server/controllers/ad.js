import { AWS_S3, GOOGLE_GEOCODER } from '../utils/config.js';
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import Ad from '../models/ad.js';
import User from '../models/user.js';

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

export const create = async (req, res) => {
	try {
		// console.log(req.body);
		const { photos, description, title, address, price, type, landsize } = req.body;
		/* Validation Checks */
		if (!photos?.length) return res.json({ error: 'Photos are required' });
		if (!price) return res.json({ error: 'Price is required' });
		if (!type) return res.json({ error: 'Is property house or land?' });
		if (!address) return res.json({ error: 'Address is required' });
		if (!description) return res.json({ error: 'Description is required' });

		const geo = await GOOGLE_GEOCODER.geocode(address);

		const ad = await new Ad({
			...req.body,
			postedBy: req.user._id,
			location: {
				type: 'Point',
				coordinates: [geo?.[0]?.longitude, geo?.[0]?.latitude],
			},
			googleMap: geo,
			slug: slugify(`${type}-${address}-${price}-${nanoid(6)}`),
		}).save();

		/* Change User to Seller */
		const user = await User.findByIdAndUpdate(
			req.user._id,
			{ $addToSet: { role: 'Seller' } },
			{ new: true }
		);

		user.password = undefined;
		user.resetCode = undefined;

		res.json({ ad, user });
	} catch (error) {
		console.log(error);
		res.json({ error: 'Something went wrong' });
	}
};

export const ads = async (req, res) => {
	try {
		const adsForSell = await Ad.find({ action: 'Sell' })
			.select('-googleMap -location -photo.Key -photo.key -photo.ETag')
			.sort({ createdAt: -1 })
			.limit(12);

		const adsForRent = await Ad.find({ action: 'Rent' })
			.select('-googleMap -location -photo.Key -photo.key -photo.ETag')
			.sort({ createdAt: -1 })
			.limit(12);

		res.json({ adsForSell, adsForRent });
	} catch (error) {
		console.log(error);
	}
};

export const read = async (req, res) => {
	try {
		const ad = await Ad.findOne({ slug: req.params.slug }).populate(
			'postedBy',
			'name username email phone company photo.Location'
		);

		const related = await Ad.find({
			_id: { $ne: ad._id },
			action: ad.action,
			type: ad.type,
			address: {
				$regex: ad.googleMap[0].city,
				$options: 'i',
			},
		})
			.limit(3)
			.select('-photos.Key -photos.key -photos.ETag -photos.Bucket -googleMap');

		res.json({ ad, related });
	} catch (err) {
		console.log(err);
	}
};
