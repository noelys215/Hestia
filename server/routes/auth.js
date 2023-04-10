import express from 'express';
import * as controller from '../controllers/auth.js';
import { requireSignIn } from '../middlewares/auth.js';
const router = express.Router();

router.get('/', requireSignIn, controller.welcome);

router.post('/pre-register', controller.preRegister);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/forgot-password', controller.forgotPassword);
router.post('/access-account', controller.accessAccount);

router.get('/refresh-token', controller.refreshToken);
router.get('/current-user', requireSignIn, controller.currentUser);
router.get('/profile/:username', controller.publicProfile);

router.put('/update-password', requireSignIn, controller.updatePassword);
router.put('/update-profile', requireSignIn, controller.updateProfile);

router.get('/agents', controller.agents);
router.get('/agent-ad-count/:_id', controller.agentAdCount);
router.get('/agent/:username', controller.agent);

export default router;
