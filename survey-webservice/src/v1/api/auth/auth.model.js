import bcrypt from 'bcrypt-nodejs';
import mongoose, { Schema } from 'mongoose';
import Enum from 'enum';
import { decrypt, encrypt } from '../../../utils/helpers';
import config from 'config';

/**
 * Auth Schema
 */
const AuthModel = new Schema({
	email: {
		type: String,
		unique: true,
		index: true,
		get: (e) => (config.get('auth.email_encryption') === true) ? decrypt(e) : e,
		set: (e) => (config.get('auth.email_encryption') === true) ? encrypt(e) : e,
	},
	password: {
		type: String,
		select: false,
	},
	accountVerified: {
		type: Boolean,
		default: false,
	},
	verificationCode: {
		type: String,
		get: (e) => (config.get('auth.email_encryption') === true) ? decrypt(e) : e,
		set: (e) => (config.get('auth.email_encryption') === true) ? encrypt(e) : e,
	},
	active: {
		type: Boolean,
		default: false,
	},
	socialAuth: {
		type: Boolean,
	},
	socialAuthType: {
		type: String,
		enum: ['facebook', 'google', 'apple'],
	},
	socialId: {
		type: String,
		get: (e) => (config.get('auth.email_encryption') === true) ? decrypt(e) : e,
		set: (e) => (config.get('auth.email_encryption') === true) ? encrypt(e) : e,
	},
	passwordReset: {
		type: Boolean,
		default: false,
	},
	passwordResetCode: {
		type: String,
		get: (e) => (config.get('auth.email_encryption') === true) ? decrypt(e) : e,
		set: (e) => (config.get('auth.email_encryption') === true) ? encrypt(e) : e,
	},
	resetCodeExpiration: {
		type: Date,
	},
	verifyCodeExpiration: {
		type: Date,
	},
	changedPassword: {
		type: Boolean,
		default: false,
	},
	deleted: {
		type: Boolean,
		default: false,
		select: false,
	},
}, {
	autoCreate: true,
	timestamps: true
});

if (config.app.environment === 'production') {
	AuthModel.statics.hiddenFields = AuthModel.statics.hiddenFields
		.concat(['password_reset_code', 'verification_code', 'password', 'deleted']);
}
/**
 * @return {Object} The validator object with the specified rules.
 */
AuthModel.statics.types = () => {
	return new Enum({
		0: 'FACEBOOK',
		1: 'GOOGLE'
	});
};

AuthModel.pre('save', function (next) {
	const user = this;
	if (!user.isModified('password')) return next();
	user.password = bcrypt.hashSync(user.password);
	next();
});

/**
 * @param {String} password The password to compare against
 * @return {Boolean} The result of the comparison
 */
AuthModel.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

/**
 * @typedef AuthModel
 */
export default mongoose.model('Auth', AuthModel);
