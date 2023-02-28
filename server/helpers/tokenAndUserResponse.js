export const tokenAndUserResponse = (req, res, user) => {
	/* Create JWT Tokens */
	const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '1hr',
	});
	const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '7d',
	});

	/* Send Response */
	user.password = undefined;
	user.resetCode = undefined;

	return res.json({ token, refreshToken, user });
};
