import express from 'express';
import { uploadImage } from '../controllers/ad.js';
import { requireSignIn } from '../middlewares/auth.js';
const router = express.Router();

router.post('/upload-image', requireSignIn, uploadImage);

export default router;
