import { AWS_SES } from '../utils/config.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { emailTemplate } from '../helpers/email.js';
import { comparePassword, hashPassword } from '../helpers/auth.js';
import User from '../models/user.js';
import { nanoid } from 'nanoid';
import validator from 'email-validator';
import { emailHtml } from '../templates/emailHTML.js';
import { resetPasswordHtml } from '../templates/resetPasswordHtml.js';

dotenv.config();

const tokenAndUserResponse = (req, res, user) => {
	const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '7d',
	});
	const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '7d',
	});

	user.password = undefined;
	user.resetCode = undefined;

	return res.json({
		token,
		refreshToken,
		user,
	});
};

export const welcome = (req, res) => {
	res.json({
		data: 'Yo Fox!',
	});
};

export const preRegister = async (req, res) => {
	/* Create JWT with Email & Password; send confirmation email */
	/* Registration completes when email is clicked */
	try {
		// console.log(req.body);
		const { email, password } = req.body;

		// validataion
		if (!validator.validate(email)) {
			return res.json({ error: 'A valid email is required' });
		}
		if (!password) {
			return res.json({ error: 'Password is required' });
		}
		if (password && password?.length < 6) {
			return res.json({ error: 'Password should be at least 6 characters' });
		}

		const user = await User.findOne({ email });
		if (user) {
			return res.json({ error: 'Email is taken' });
		}

		const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
			expiresIn: '7d',
		});
		// Send Confirmation Email
		AWS_SES.sendEmail(
			emailTemplate(email, emailHtml(token), process.env.REPLY_TO, 'Activate Your Account'),
			(err, data) => {
				if (err) {
					console.log(err);
					return res.json({ ok: false });
				} else {
					console.log(data);
					return res.json({ ok: true });
				}
			}
		);
	} catch (error) {
		console.log(error.message);
		return res.json({ error: 'Something went wrong, try again.' });
	}
};

export const register = async (req, res) => {
	try {
		// Verify token is valid
		const { email, password } = jwt.verify(req.body.token, process.env.JWT_SECRET);

		const userExist = await User.findOne({ email });
		if (userExist) {
			return res.json({ error: 'Email is taken' });
		}

		const hashedPassword = await hashPassword(password);

		const user = await new User({
			username: nanoid(6),
			email,
			password: hashedPassword,
		}).save();

		tokenAndUserResponse(req, res, user);
	} catch (error) {
		console.log(error);
		return res.json({ error: 'Something went wrong, try again.' });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		// 1 find user by email
		const user = await User.findOne({ email });
		// 2 compare password
		const match = await comparePassword(password, user.password);
		if (!match) {
			return res.json({ error: 'Wrong password' });
		}

		tokenAndUserResponse(req, res, user);
	} catch (err) {
		console.log(err);
		return res.json({ error: 'Something went wrong. Try again.' });
	}
};

export const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.json({ error: 'Could not find user with that email' });
		} else {
			const resetCode = nanoid();
			user.resetCode = resetCode;
			user.save();

			const token = jwt.sign({ resetCode }, process.env.JWT_SECRET, {
				expiresIn: '7d',
			});

			// Send Reset Password Email
			AWS_SES.sendEmail(
				emailTemplate(
					email,
					resetPasswordHtml(token),
					process.env.REPLY_TO,
					'Reset Your Password'
				),
				(err) => (err ? res.json({ ok: false }) : res.json({ ok: true }))
			);
		}
	} catch (error) {
		console.log(error);
		return res.json({ error: 'Something went wrong, Try again.' });
	}
};

export const accessAccount = async (req, res) => {
	try {
		const { resetCode } = jwt.verify(req.body.resetCode, process.env.JWT_SECRET);

		const user = await User.findOneAndUpdate({ resetCode }, { resetCode: '' });

		/*  */
		tokenAndUserResponse(req, res, user);
		/*  */
	} catch (error) {
		console.log(error);
		return res.json({ error: 'Something went wrong, Try again.' });
	}
};

export const refreshToken = async (req, res) => {
	try {
		const { _id } = jwt.verify(req.headers.refresh_token, process.env.JWT_SECRET);
		const user = await User.findById(_id);

		/*  */
		tokenAndUserResponse(req, res, user);
		/*  */
	} catch (error) {
		console.log(error);
		return res.status(403).json({ error: 'Something went wrong, Try again.' });
	}
};

export const currentUser = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		user.password = undefined;
		user.resetCode = undefined;
		res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(403).json({ error: 'Unauthorized' });
	}
};

export const publicProfile = async (req, res) => {
	try {
		const user = await User.findOne({ username: req.params.username });
		user.password = undefined;
		user.resetCode = undefined;
		res.json(user);
	} catch (err) {
		console.log(err);
		return res.json({ error: 'User not found' });
	}
};

export const updatePassword = async (req, res) => {
	try {
		const { password } = req.body;

		if (!password) {
			return res.json({ error: 'Password is required' });
		}
		if (password && password?.length < 6) {
			return res.json({ error: 'Password should be min 6 characters' });
		}

		const user = await User.findByIdAndUpdate(req.user._id, {
			password: await hashPassword(password),
		});

		res.json({ ok: true });
	} catch (err) {
		console.log(err);
		return res.status(403).json({ error: 'Unauhorized' });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const user = await User.findByIdAndUpdate(req.user._id, req.body, {
			new: true,
		});
		user.password = undefined;
		user.resetCode = undefined;
		res.json(user);
	} catch (err) {
		console.log(err);
		if (err.codeName === 'DuplicateKey') {
			return res.json({ error: 'Username or email is already taken' });
		} else {
			return res.status(403).json({ error: 'Unauthorized' });
		}
	}
};
