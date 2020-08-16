import crypto from 'crypto';
import config from 'config';

/**
 * The UserValidation class
 */
const AuthEmail = {
	/**
	 * @param {Object} auth The object to perform validation on
	 * @param {String} redirectUrl The redirect url
	 * @return {Object} The template object fot send grid.
	 */
	resetPassword(auth, redirectUrl) {
		const recoveryToken = crypto.createHash('md5').update(auth.passwordResetCode).digest('hex');
		const link = `${redirectUrl}/${auth.email}/${recoveryToken}`;
		return {
			templateId: config.get('emailAlerts.templateIds.reset'),
			recipients: [auth.email],
			substitutions: {
				subject: `${config.get('app.appName')} - Reset Password`,
				reset_password_link: `${link}`,
				reset_password_code: `${auth.passwordResetCode}`,
			},
		};
	},
	/**
	 * @param {Object} auth The object to perform validation on
	 * @param {String} verifyRedirectUrl The redirect url
	 * @return {Object} The template object fot send grid.
	 */
	verifyCode(auth, verifyRedirectUrl) {
		const verifyToken = crypto.createHash('md5').update(auth.verificationCode).digest('hex');
		const link = `${verifyRedirectUrl}/${auth.email}/${verifyToken}`;
		return {
			templateId: config.get('emailAlerts.templateIds.verify'),
			recipients: [auth.email],
			substitutions: {
				email: auth.email,
				subject: `${config.get('app.appName')} - Verify Account`,
				verification_link: `${link}`,
				verification_code: `${auth.verificationCode}`,
			},
		};
	}
};

export default AuthEmail;
