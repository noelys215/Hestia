import express from 'express';
import {
	uploadImage,
	removeImage,
	create,
	ads,
	read,
	addToWishlist,
	removeFromWishlist,
	contactSeller,
	userAds,
	update,
	remove,
	enquiriedProperties,
	wishlist,
} from '../controllers/ad.js';
import { requireSignIn } from '../middlewares/auth.js';
const router = express.Router();

router.post('/upload-image', requireSignIn, uploadImage);
router.post('/remove-image', requireSignIn, removeImage);
router.post('/ad', requireSignIn, create);
router.get('/ads', requireSignIn, ads);
router.get('/ad/:slug', read);

router.post('/wishlist', requireSignIn, addToWishlist);
router.delete('/wishlist/:adId', requireSignIn, removeFromWishlist);
router.post('/contact-seller', requireSignIn, contactSeller);

router.get('/user-ads/:page', requireSignIn, userAds);
router.put('/ad/:_id', requireSignIn, update);
router.delete('/ad/:_id', requireSignIn, remove);

router.get('/enquiries', requireSignIn, enquiriedProperties);
router.get('/wishlist', requireSignIn, wishlist);

export default router;
