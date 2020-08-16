import config from 'config';
import Validator from 'validatorjs';

/**
 * The User Validation class
 */
const AuthValidation = {
	/**
	 * @param {Object} body The object to perform validation on
	 * @return {Validator} The validator object with the specified rules.
	 */
	async social(body = {}) {
		const rules = {
			socialId: 'required',
			email: 'required|email',
			accessToken: 'required'
		};
		const validator = new Validator(body, rules);
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	},
	/**
	 * @param {Object} body The object to validate
	 * @return {Object} Validator
	 */
	async signIn(body = {}) {
		const rules = {
			email: 'required|email',
			password: 'required|min:6'
		};
		const validator = new Validator(body, rules);
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	},
	/**
	 * @param {Object} body The object to validate
	 * @return {Object} Validator
	 */
	async signUp(body = {}) {
		body.verifyRedirectUrl = (body.verifyRedirectUrl)
			? body.verifyRedirectUrl
			: config.get('app.verify_redirect_url');
		const rules = {
			email: 'required|email',
			password: 'required|min:6',
			verifyRedirectUrl: 'required'
		};
		if (`${config.util.getEnv('NODE_ENV')}` === 'production') {
			rules['verifyRedirectUrl'] = 'required|url';
		}
		const validator = new Validator(body, rules);
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	},
	/**
	 * @param {Object} body The object to perform validation on
	 * @return {Validator} The validator object with the specified rules.
	 */
	async verifyCode(body = {}) {
		const rules = {
			verificationCode: 'required|numeric',
		};
		const validator = new Validator(body, rules);
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	},
	/**
	 * @param {Object} obj The object to perform validation on
	 * @return {Validator} The validator object with the specified rules.
	 */
	async verifyLink(obj) {
		const rules = {
			email: 'required|email',
			hash: 'required',
		};
		const validator = new Validator(obj, rules, {
			'email.email': 'Not a valid email address',
			'email.required': 'Your email is required',
			'hash.required': 'The hash is required',
		});
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	},
	/**
	 * @param {Object} obj The object to perform validation on
	 * @return {Validator} The validator object with the specified rules.
	 */
	sendVerification(obj) {
		const rules = {
			verifyRedirectUrl: 'required',
		};
		if (`${config.util.getEnv('NODE_ENV')}` === 'production') {
			rules['verifyRedirectUrl'] = 'required|url';
		}
		const validator = new Validator(obj, rules);
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	},
	/**
	 * @param {Object} obj The object to perform validation on
	 * @return {Validator} The validator object with the specified rules.
	 */
	sendResetPasswordCodeLink(obj) {
		if (!obj.redirectUrl) {
			obj.redirectUrl = config.get('app.baseUrl');
		}
		const rules = {
			redirectUrl: 'required',
			email: 'required'
		};
		if (`${config.util.getEnv('NODE_ENV')}` === 'production') {
			rules['redirectUrl'] = 'required|url';
		}
		const validator = new Validator(obj, rules);
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	},
	/**
	 * @param {Object} obj The object to perform validation on
	 * @return {Validator} The validator object with the specified rules.
	 */
	resetPassword(obj) {
		const rules = {
			passwordResetCode: 'required',
			password: 'required',
			email: 'required',
		};
		const validator = new Validator(obj, rules);
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	},
	/**
	 * @param {Object} obj The object to perform validation on
	 * @return {Validator} The validator object with the specified rules.
	 */
	changePassword(obj) {
		const rules = {
			currentPassword: 'required|min:6',
			password: 'required|min:6',
		};
		const validator = new Validator(obj, rules, {
			'currentPassword.required': 'Your current password is required',
			'currentPassword.min': 'Your current password must be at least 6 characters!',
			'password.required': 'Your new password is required',
			'password.min': 'New password must be at least 6 characters!',
		});
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	},
	
	/**
	 * @param {Object} body The object to perform validation on
	 * @return {Validator} The validator object with the specified rules.
	 */
	async verifyEmail(body = {}) {
		const rules = {
			'email': 'required|email'
		};
		const validator = new Validator(body, rules);
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	}
};

export default AuthValidation;
