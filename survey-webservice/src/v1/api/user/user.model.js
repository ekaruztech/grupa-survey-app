/**
 * User Schema
 */
import mongoose, { Schema } from 'mongoose';
import UserProcessor from './user.processor';
import UserValidation from './user.validation';
import AppSchema from '../_core/app.model';
import config from 'config';

const UserModel = new AppSchema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	email: {
		type: String,
		lowercase: true,
		index: true
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	role: {
		type: String,
		required: true,
		enum: config.get('userRoles'),
		default: 'respondent'
	},
	active: {
		type: Boolean,
		default: true,
	},
	deleted: {
		type: Boolean,
		default: false,
		select: false,
	},
}, {
	autoCreate: true,
	timestamps: true,
	toJSON: { virtuals: true }
});

UserModel.statics.fillables = [
	'firstName',
	'lastName'
];

/**
 * @return {Object} The validator object with the specified rules.
 */
UserModel.statics.getValidator = () => {
	return new UserValidation();
};

/**
 * @param {Model} model required for response
 * @return {Object} The processor class instance object
 */
UserModel.statics.getProcessor = (model) => {
	return new UserProcessor(model);
};
/**
 * @typedef UserModel
 */
export default mongoose.model('User', UserModel);
