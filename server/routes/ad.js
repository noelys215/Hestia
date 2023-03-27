import express from 'express';
import { uploadImage, removeImage, create } from '../controllers/ad.js';
import { requireSignIn } from '../middlewares/auth.js';
const router = express.Router();

router.post('/upload-image', requireSignIn, uploadImage);
router.post('/remove-image', requireSignIn, removeImage);
router.post('/ad', requireSignIn, create);

export default router;
