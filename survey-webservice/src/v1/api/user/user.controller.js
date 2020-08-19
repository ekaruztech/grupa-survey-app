import AppController from "../_core/app.controller";
import { OK } from "../../../utils/constants";

/**
 *  TaskController
 */
class UserController extends AppController {
	/**
	 * @param {Model} model The default model object
	 * for the controller. Will be required to create
	 * an instance of the controller¬
	 */
	constructor(model) {
		super(model);
		this.updateMe = this.updateMe.bind(this);
		this.currentUser = this.currentUser.bind(this);
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {callback} next The callback to the next program handler
	 * @return {void}
	 */
	async updateMe(req, res, next) {
		req.object = await this.model.findById(req.authId);
		super.update(req, res, next);
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {void}
	 */
	async currentUser(req, res, next) {
		const user = await this.model.findById(req.authId);
		req.response = {
			model: this.model,
			code: OK,
			value: user
		};
		return next();
	}
}

export default UserController;
