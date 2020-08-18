import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import axios from 'axios';
import lang from '../../lang';
import config from 'config';
import _ from 'lodash';
import { addHourToDate, generateOTCode, sendEmail } from '../../../utils/helpers';
import { CONFLICT, FORBIDDEN, NOT_FOUND, UNAUTHORIZED } from '../../../utils/constants';
import AppResponse from '../../../lib/api/app-response';
import AppError from '../../../lib/api/app-error';

const AuthProcessor = {
	/**
	 * @param {Object} response The access token for verification
	 * @param {Object} auth social auth type
	 * @param {Object} socialType social auth type
	 * @return {Promise} The result of the find
	 */
	async signInSocial(response, auth, socialType) {
		_.extend(auth, {
			accountVerified: true, active: true, socialId: response.id,
			socialAuth: true, socialAuthType: socialType,
		});
		if (auth.email && response.email !== auth.email) {
			_.extend(auth, {
				accountVerified: false
			});
		}
		return auth;
	},
	/**
	 * @param {String} type The type of social account
	 * @param {Object} obj social auth type
	 * @return {Promise} The result of the find
	 */
	async loginSocial(type = 'FACEBOOK', { accessToken, socialId, social, email }) {
		/* Todo : the social authentication auth are not verified properly should be done before production */
		const socialType = social.toUpperCase();
		let url = `${config.get('social.facebook.GraphUrl')}&access_token=${accessToken}`;
		if (social === 'google') {
			url = `${config.get('social.google.url')}?id_token=${accessToken}`;
		}
		return axios.get(url)
			.then(async (resp) => {
				const response = resp;
				if (type === socialType) {
					response.data.id = response.data.sub;
				}
				if (response.data && response.data.id && response.data.id === socialId) {
					return response.data;
				} else {
					throw new AppError(lang.get('auth').social_error, FORBIDDEN);
				}
			}, (err) => {
				if (err.response && err.response.data && err.response.data.error) {
					if (err.response.data.error) {
						if (err.response.data.error.message.indexOf('username_1')) {
							throw new AppError(err.response.data.error.message, FORBIDDEN);
						}
						throw new AppError(err.response.data.error.message, FORBIDDEN);
					} else if (err.response.data.error_description) {
						throw new AppError(err.response.data.error_description, FORBIDDEN);
					}
				}
				throw new AppError(lang.get('auth').social_error, FORBIDDEN);
			});
	},
	/**
	 * @param {Object} obj The object properties
	 * @return {Promise<Object>}
	 */
	async processNewObject(obj) {
		obj.verifyCodeExpiration = addHourToDate(1);
		const code = generateOTCode(4);
		obj = await _.extend(obj, { verificationCode: code });
		return obj;
	},
	/**
	 * @param {Object} options required for response
	 * @return {Promise<Object>}
	 */
	async getResponse({ model, value, code, message, count, token, email }) {
		try {
			const meta = AppResponse.getSuccessMeta();
			if (token) {
				meta.token = token;
			}
			_.extend(meta, { status_code: code });
			if (message) {
				meta.message = message;
			}
			if (model.hiddenFields && model.hiddenFields.length > 0) {
				value = _.omit(value.toJSON(), ...model.hiddenFields);
			}
			if (email) {
				sendEmail(email);
			}
			return AppResponse.format(meta, value);
		} catch (e) {
			throw e;
		}
	},
	/**
	 * @param {Object} auth The object properties
	 * @return {Promise<String>}
	 */
	async signToken({ auth, user }) {
		const obj = {
			authId: auth._id,
			...(_.pick(auth, ['accountVerified', 'email']))
		};
		const sign = jwt.sign(obj, config.get('auth.encryption_key'),
			{ expiresIn: config.get('auth.expiresIn') });
		return sign;
	},
	/**
	 * @param {Object} user The main property
	 * @param {Object} object The object properties
	 * @return {Object} returns the api error if main cannot be verified
	 */
	canLogin(user, object) {
		if (!user) {
			return new AppError(lang.get('auth').credential_incorrect, NOT_FOUND);
		}
		let authenticated = object.password && user.password && user.comparePassword(object.password);
		if (!authenticated) {
			return new AppError(lang.get('auth').authentication_failed, UNAUTHORIZED);
		}
		return true;
	},
	/**
	 * @param {Object} auth The main property
	 * @param {Object} object The object properties
	 * @return {Object} returns the api error if main cannot be verified
	 */
	async canVerify(auth, object) {
		if (!auth) {
			return new AppError(lang.get('auth').account_does_not_exist, NOT_FOUND);
		}
		else if (auth.accountVerified) {
			return new AppError(lang.get('auth').account_verified, CONFLICT);
		}
		if (!object.hash && !object.verificationCode) {
			return new AppError(lang.get('auth').verify_unauthorized, FORBIDDEN);
		}
		if (object.hash) {
			const userHash = crypto.createHash('md5').update(auth.verificationCode).digest('hex');
			if (userHash !== object.hash) {
				return new AppError(lang.get('auth').verify_unauthorized, FORBIDDEN);
			}
		} else {
			console.log('auth ::::: ', auth);
			console.log('auth.verificationCode ::::: ', auth.verificationCode);
			if (!auth.accountVerified && auth.verificationCode !== object.verificationCode) {
				return new AppError(lang.get('auth').incorrect_verify_code, FORBIDDEN);
			}
		}
		if (new Date() > auth.verifyCodeExpiration) {
			return new AppError(lang.get('auth').verify_expired, FORBIDDEN);
		}
		return true;
	},
	
	/**
	 * @param {Object} auth The main property
	 * @param {Object} object The object properties
	 * @return {Object} returns the main error if main cannot be verified
	 */
	async cannotResetPassword(auth, object) {
		if (!auth) {
			return new AppError(lang.get('auth').account_does_not_exist, NOT_FOUND);
		}
		if (!(auth.resetCodeExpiration && auth.passwordResetCode)) {
			return new AppError(lang.get('auth').password_reset_unauthorized, FORBIDDEN);
		}
		const userHash = crypto.createHash('md5').update(auth.passwordResetCode).digest('hex');
		if ((object.hash && (userHash !== object.hash)) ||
			(object.passwordResetCode && (auth.passwordResetCode !== object.passwordResetCode))) {
			return new AppError(lang.get('auth').password_reset_unauthorized, UNAUTHORIZED);
		}
		if (new Date() > auth.resetCodeExpiration) {
			return new AppError(lang.get('auth').password_reset_link_expired, FORBIDDEN);
		}
		return null;
	},
	/**
	 * @param {Object} auth The main property
	 * @param {Object} object The object property
	 * @return {Object} returns the main error if main cannot be verified
	 */
	async resetUserPassword(auth, object) {
		auth.password = object.password;
		const updateObj = { resetCodeExpiration: '', passwordResetCode: '', password: object.password };
		_.extend(auth, updateObj);
		return auth.save();
	}
};

export default AuthProcessor;
