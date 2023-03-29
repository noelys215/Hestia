import express from 'express';
import { uploadImage, removeImage, create, ads } from '../controllers/ad.js';
import { requireSignIn } from '../middlewares/auth.js';
const router = express.Router();

router.post('/upload-image', requireSignIn, uploadImage);
router.post('/remove-image', requireSignIn, removeImage);
router.post('/ad', requireSignIn, create);
router.get('/ads', requireSignIn, ads);

export default router;
