import User from './user.model';
import AppProcessor from '../_core/app.processor';

/**
 * The ModuleProcessor class
 */
class UserProcessor extends AppProcessor {
	/**
	 * @param {Object} current required for response
	 * @param {Object} obj required for response
	 * @return {Object}
	 */
	async validateUpdate(current, obj) {
		// the essence of this i think is to validate bvn and return null if all goes well
		if (obj.bankAccountDetail) {
			// validate bvn here and checkout the request file should you want to send request
			// below is sample return error when something goes wrong.
			// return next(new AppError(lang.get('error').bvn_validation_error, BAD_REQUEST));
			// const config = {
			// 	method: 'get',
			// 	url: `validate bvn url`,
			// 	headers: {
			// 	key : value
			// 	}
			// };
			// return createRequest(config)
			// 	.then(response => response.data,
			// 		err => formatError(err));
		}
		return null;
	}
	
	/**
	 * @param {String} authId The payload object
	 * @param {Object} obj The payload object
	 * @param {Object} session The payload object
	 * @return {Object}
	 */
	static async getUser(authId, obj, session = null) {
		let user = await User.findOne({ _id: authId });
		if (!user) {
			user = await (new User({ _id: authId, email: obj.email })).save(session);
		}
		return user;
	}
}

export default UserProcessor;
