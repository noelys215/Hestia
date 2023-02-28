export const emailTemplate = (email, content, replyTo, subject) => {
	return {
		Source: process.env.EMAIL_FROM,
		Destination: {
			ToAddresses: [email],
		},
		Message: {
			Body: {
				Html: {
					Charset: 'UTF-8',
					Data: content,
				},
			},
			Subject: {
				Charset: 'UTF-8',
				Data: subject,
			},
		},
		// Destination: req.body.email,
	};
};
