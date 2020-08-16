require('dotenv').config();
const PORT = process.env.PORT || 3000;
module.exports = {
	app: {
		appName: process.env.APP_NAME || 'App Name',
		environment: process.env.NODE_ENV || 'dev',
		superSecret: process.env.SERVER_SECRET || 'ipa-BUhBOJAm',
		baseUrl: `http://localhost:${PORT}`,
		port: PORT,
		domain: process.env.APP_DOMAIN || 'app.com',
		email_encryption: process.env.EMAIL_ENCRYPTION || false,
		verify_redirect_url: `${process.env.BASE_URL}/verify`,
	},
	auth: {
		email_encryption: false,
		encryption_key: process.env.SERVER_SECRET || 'appSecret',
		expiresIn: 3600 * 124 * 100,
	},
	api: {
		lang: 'en',
		prefix: '^/api/v[1-9]',
		versions: [1],
		patch_version: '1.0.0',
		pagination: {
			itemsPerPage: 10
		}
	},
	userRoles: ['respondent', 'coordinator'],
	databases: {
		mongodb: {
			url: process.env.DB_URL,
			test: process.env.DB_TEST_URL,
		}
	},
	social: {
		facebook: {
			GraphUrl: 'https://graph.facebook.com/v2.11/me?fields=id,name,email',
			clientId: process.env.FACEBOOK_CLIENT_ID,
		},
		google: {
			url: 'https://www.googleapis.com/oauth2/v3/tokeninfo',
			clientId: process.env.GOOGLE_CLIENT_ID,
			secret: process.env.GOOGLE_SECRET,
			redirect_uris: process.env.GOOGLE_REDIRECT_URI,
			refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
		},
	},
	email: {
		sendgrid: {
			apiKey: process.env.SENDGRID_API_KEY,
			from: process.env.EMAIL_NO_REPLY,
			contactFormRecipient: process.env.CONTACT_FORM_EMAIL_RECIPIENT,
		}
	},
	emailAlerts: {
		templateIds: {
			verify: process.env.VERIFY_CODE,
			reset: process.env.RESET_PASSWORD
		},
	},
	aws: {
		credentials: {
			accessKeyId: process.env.AWS_ACCESS_KEY,
			secretAccessKey: process.env.AWS_SECRET_KEY,
			region: process.env.AWS_REGION,
			params: { Bucket: 'vwcompany' },
		},
		bucket: process.env.AWS_BUCKET,
		s3Link: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com/`,
	}
};
