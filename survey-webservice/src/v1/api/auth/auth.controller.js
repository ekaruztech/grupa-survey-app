import Auth from './auth.model';
import AuthValidation from './auth.validation';
import AuthProcessor from './auth.processor';
import AuthEmail from './auth.email';
import _ from 'lodash';
import lang from '../../lang';
import mongoose from 'mongoose';
import { addHourToDate, generateOTCode } from '../../../utils/helpers';
import { BAD_REQUEST, CONFLICT, NOT_FOUND, OK } from '../../../utils/constants';
import UserProcessor from '../user/user.processor';
import AppError from '../../../lib/app-error';

const AuthController = {
	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async socialSignIn(req, res, next) {
		let session = null;
		try {
			session = await mongoose.startSession();
			await session.startTransaction();
			const obj = req.body;
			const validator = await AuthValidation.social(obj);
			if (!validator.passed) {
				return next(
					new AppError(lang.get('error').inputs, BAD_REQUEST, validator.errors)
				);
			}
			const social = req.params.social;
			let auth = await Auth.findOne({
				$or: [{ socialId: obj.socialId }, { email: obj.email }]
			});
			if (!auth) {
				auth = new Auth({ ...obj });
			}
			const socialData = await AuthProcessor.loginSocial(
				Auth.types()[1].value,
				{ ...obj, social }
			);
			const authObject = await AuthProcessor.signInSocial(
				socialData,
				auth,
				social
			);
			auth = await authObject.save(session);
			const { role } = await UserProcessor.getUser(auth._id, obj, session);
			const token = await AuthProcessor.signToken({ auth, role });
			let response = await AuthProcessor.getResponse({
				token,
				model: Auth,
				code: OK,
				value: { ...auth.toJSON(), role }
			});
			await session.commitTransaction();
			return res.status(OK).json(response);
		} catch (e) {
			await session.abortTransaction();
			return next(e);
		}
	},
	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async signIn(req, res, next) {
		let session = null;
		try {
			session = await mongoose.startSession();
			await session.startTransaction();
			const obj = req.body;
			const validator = await AuthValidation.signIn(obj);
			if (!validator.passed) {
				return next(
					new AppError(lang.get('error').inputs, BAD_REQUEST, validator.errors)
				);
			}
			const auth = await Auth.findOne({ email: obj.email }).select('+password');
			const canLogin = await AuthProcessor.canLogin(auth, obj);
			if (canLogin instanceof AppError) {
				return next(canLogin);
			}
			const { role } = await UserProcessor.getUser(auth._id, obj, session);
			const token = await AuthProcessor.signToken({ auth, role });
			const response = await AuthProcessor.getResponse({
				token,
				model: Auth,
				code: OK,
				value: { ...auth.toJSON(), role }
			});
			await session.commitTransaction();
			return res.status(OK).json(response);
		} catch (e) {
			await session.abortTransaction();
			return next(e);
		}
	},
	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async signUp(req, res, next) {
		let session = null;
		try {
			session = await mongoose.startSession();
			await session.startTransaction();
			const obj = req.body;
			const validator = await AuthValidation.signUp(obj);
			if (!validator.passed) {
				return next(
					new AppError(lang.get('error').inputs, BAD_REQUEST, validator.errors)
				);
			}
			let auth = await Auth.findOne({ email: obj.email });
			if (auth) {
				return next(new AppError(lang.get('auth').email_exist, CONFLICT));
			}
			const authObject = await AuthProcessor.processNewObject(obj);
			auth = (await Auth.create([{ ...authObject }], { session }))[0];
			const { role } = await UserProcessor.getUser(auth._id, obj, session);
			const token = await AuthProcessor.signToken({ auth, role });
			const email = AuthEmail.verifyCode(auth, obj.verifyRedirectUrl);
			const response = await AuthProcessor.getResponse({
				token,
				email,
				model: Auth,
				code: OK,
				value: { ...auth.toJSON(), role }
			});
			await session.commitTransaction();
			return res.status(OK).json(response);
		} catch (e) {
			await session.abortTransaction();
			return next(e);
		}
	},
	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async verifyCode(req, res, next) {
		let session = null;
		try {
			session = await mongoose.startSession();
			await session.startTransaction();
			const obj = req.body;
			const validator = await AuthValidation.verifyCode(obj);
			if (!validator.passed) {
				return next(
					new AppError(lang.get('error').inputs, BAD_REQUEST, validator.errors)
				);
			}
			let auth = await Auth.findById(req.authId);
			const verifyError = await AuthProcessor.canVerify(auth, obj);
			if (verifyError instanceof AppError) {
				return next(verifyError);
			}
			const updateObj = {
				verificationCode: null,
				accountVerified: true,
				active: true
			};
			_.extend(auth, updateObj);
			auth = await auth.save();
			const { role } = await UserProcessor.getUser(auth._id, obj, session);
			const response = await AuthProcessor.getResponse({
				message: lang.get('auth').verification_successful,
				model: Auth,
				code: OK,
				value: { ...auth.toJSON(), role }
			});
			return res.status(OK).json(response);
		} catch (e) {
			await session.abortTransaction();
			return next(e);
		}
	},
	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async verifyLink(req, res, next) {
		const obj = req.body;
		const validator = await AuthValidation.verifyLink(obj);
		if (!validator.passed) {
			return next(
				new AppError(lang.get('error').inputs, BAD_REQUEST, validator.errors)
			);
		}
		try {
			let auth = await Auth.findOne({ email: obj.email }).exec();
			const verifyError = await AuthProcessor.canVerify(auth, obj);
			if (verifyError instanceof AppError) {
				return next(verifyError);
			}
			const updateObj = {
				verificationCode: null,
				accountVerified: true,
				active: true
			};
			_.extend(auth, updateObj);
			auth = await auth.save();
			const response = await AuthProcessor.getResponse({
				message: lang.get('auth').verification_successful,
				model: Auth,
				code: OK,
				value: auth
			});
			return res.status(OK).json(response);
		} catch (err) {
			return next(err);
		}
	},
	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async sendVerification(req, res, next) {
		const obj = req.body;
		const validator = await AuthValidation.sendVerification(obj);
		if (!validator.passed) {
			return next(
				new AppError(lang.get('error').inputs, BAD_REQUEST, validator.errors)
			);
		}
		try {
			let auth = await Auth.findById(req.authId);
			if (!auth) {
				return next(
					new AppError(lang.get('auth').account_does_not_exist, NOT_FOUND)
				);
			} else if (auth.accountVerified) {
				return next(new AppError(lang.get('auth').account_verified, CONFLICT));
			}
			auth.verifyCodeExpiration = addHourToDate(48);
			auth.verificationCode = generateOTCode(4);
			auth = await auth.save();
			const email = AuthEmail.verifyCode(auth, obj.verifyRedirectUrl);
			const response = await AuthProcessor.getResponse({
				email,
				message: lang.get('auth').verify_email_sent,
				model: Auth,
				code: OK,
				value: auth
			});
			return res.status(OK).json(response);
		} catch (err) {
			return next(err);
		}
	},
	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async changePassword(req, res, next) {
		const obj = req.body;
		const validator = await AuthValidation.changePassword(obj);
		if (!validator.passed) {
			return next(
				new AppError(lang.get('error').inputs, BAD_REQUEST, validator.errors)
			);
		}
		try {
			let auth = await Auth.findById(req.authId)
				.select('+password')
				.exec();
			if (!auth) {
				return next(
					new AppError(lang.get('auth').account_does_not_exist, NOT_FOUND)
				);
			} else if (
				!auth.socialAuth &&
				!auth.comparePassword(obj.currentPassword)
			) {
				return next(
					new AppError(lang.get('auth').incorrect_password, NOT_FOUND)
				);
			}
			auth.password = obj.password;
			if (auth.changePassword) {
				auth.changePassword = false;
			}
			auth = await auth.save();
			const response = await AuthProcessor.getResponse({
				model: Auth,
				code: OK,
				value: auth
			});
			return res.status(OK).json(response);
		} catch (err) {
			return next(err);
		}
	},
	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async sendResetPasswordCodeLink(req, res, next) {
		try {
			const obj = req.body;
			const validator = await AuthValidation.sendResetPasswordCodeLink(obj);
			if (!validator.passed) {
				return next(
					new AppError(lang.get('error').inputs, BAD_REQUEST, validator.errors)
				);
			}
			let auth = await Auth.findOne({ email: obj.email })
				.select('+password')
				.exec();
			if (!auth) {
				return next(
					new AppError(lang.get('auth').account_does_not_exist, NOT_FOUND)
				);
			}
			auth.passwordResetCode = generateOTCode(4);
			auth.resetCodeExpiration = addHourToDate(24);
			auth = await auth.save();
			const email = AuthEmail.resetPassword(auth, obj.redirectUrl);
			const response = await AuthProcessor.getResponse({
				model: Auth,
				email,
				code: OK,
				value: { email: auth.email }
			});
			return res.status(OK).json(response);
		} catch (err) {
			return next(err);
		}
	},
	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async resetPassword(req, res, next) {
		try {
			const obj = req.body;
			const validator = await AuthValidation.resetPassword(obj);
			if (!validator.passed) {
				return next(
					new AppError(lang.get('error').inputs, BAD_REQUEST, validator.errors)
				);
			}
			let auth = await Auth.findOne({ email: obj.email })
				.select('+password')
				.exec();
			if (!auth) {
				return next(
					new AppError(lang.get('auth').account_does_not_exist, NOT_FOUND)
				);
			}
			const resetError = await AuthProcessor.cannotResetPassword(auth, obj);
			if (resetError) {
				return next(resetError);
			}
			auth = await AuthProcessor.resetUserPassword(auth, obj);
			const response = await AuthProcessor.getResponse({
				model: Auth,
				code: OK,
				value: { success: !!auth, email: auth.email }
			});
			return res.status(OK).json(response);
		} catch (err) {
			return next(err);
		}
	},
	
	/**
	 * @param {Object} req
	 * @param {Object} res
	 * @param {Function} next
	 * @return {Object}
	 */
	async findByEmail(req, res, next) {
		const validate = await AuthValidation.verifyEmail({
			email: req.params.email
		});
		if (!validate.passed) {
			return next(
				new AppError(lang.get('error').inputs, BAD_REQUEST, validate.errors)
			);
		}
		try {
			let object = await Auth.findOne({ email: req.params.email });
			if (object) {
				const response = await AuthProcessor.getResponse({
					model: Auth,
					code: OK,
					value: {
						success: true,
						email: object.email
					}
				});
				return res.status(OK).json(response);
			}
			const appError = new AppError(
				lang.get('auth').email_does_not_exist,
				NOT_FOUND
			);
			return next(appError);
		} catch (err) {
			return next(err);
		}
	}
};

export default AuthController;
