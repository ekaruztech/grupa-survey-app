import AppController from "../_core/app.controller";
import {
	BAD_REQUEST,
	FORBIDDEN,
	NOT_FOUND,
	OK
} from "../../../utils/constants";
import AppError from "../../../lib/app-error";
import lang from "../../lang";
import _ from "lodash";
import Response from "../response/response.model";
import mongoose from "mongoose";

/**
 *  SurveyController
 */
class SurveyController extends AppController {
	/**
	 * @param {Model} model The default model object
	 * for the controller. Will be required to create
	 * an instance of the controller¬
	 */
	constructor(model) {
		super(model);
		this.removeQuestion = this.removeQuestion.bind(this);
		this.addOrUpdateQuestion = this.addOrUpdateQuestion.bind(this);
		this.response = this.response.bind(this);
		this.results = this.results.bind(this);
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async addOrUpdateQuestion(req, res, next) {
		const obj = req.body;
		try {
			const validate = await this.model.getValidator().addOrUpdateQuestion(obj);
			if (!validate.passed) {
				return next(
					new AppError(lang.get("error").inputs, BAD_REQUEST, validate.errors)
				);
			}
			let questionObject = {
				..._.pick(obj, ["_id", "label", "options", "description"])
			};
			let survey = req.object;
			let existingQuestionIndex = survey.questions.findIndex(
				e => String(e._id) === String(questionObject["_id"])
			);
			if (existingQuestionIndex > -1) {
				survey.questions[existingQuestionIndex] = questionObject;
			} else {
				survey.questions.push(questionObject);
			}
			survey = await survey.save();
			req.response = {
				model: this.model,
				code: OK,
				message: this.lang.updated,
				value: survey
			};
			return next();
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async removeQuestion(req, res, next) {
		const obj = req.params;
		try {
			let survey = req.object;
			let existingQuestionIndex =
				survey.questions && survey.questions.length
					? survey.questions.findIndex(
							e => String(e._id) === String(obj["questionId"])
					  )
					: -1;
			if (existingQuestionIndex < 0) {
				return next(
					new AppError(lang.get("surveys").question_not_found, NOT_FOUND)
				);
			}
			survey.questions.splice(existingQuestionIndex, 1);
			survey = await survey.save();
			req.response = {
				model: this.model,
				code: OK,
				message: this.lang.updated,
				value: survey
			};
			return next();
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async response(req, res, next) {
		let session = null;
		try {
			session = await mongoose.startSession();
			await session.startTransaction();
			const processor = this.model.getProcessor(this.model);
			const obj = await processor.prepareBodyObject(req);
			const validate = await this.model.getValidator().response(obj);
			if (!validate.passed) {
				return next(
					new AppError(lang.get("error").inputs, BAD_REQUEST, validate.errors)
				);
			}
			let survey = req.object;
			const invalidQuestionId = obj.results.some(
				result =>
					survey.questions.findIndex(
						e => String(e._id) === String(result["question"])
					) <= -1
			);
			if (invalidQuestionId) {
				return next(
					new AppError(lang.get("surveys").question_not_found, NOT_FOUND)
				);
			}
			const invalidValue = obj.results.every(result => {
				const qIndex = survey.questions.findIndex(
					e => String(e._id) === String(result["question"])
				);
				return survey.questions[qIndex].options.some(
					o => o.value === result.value
				);
			});
			if (!invalidValue) {
				return next(
					new AppError(lang.get("surveys").response_value_invalid, FORBIDDEN)
				);
			}
			console.log("obj.results ::::: ", obj.results);
			const value = await Response.findOneAndUpdate(
				{ user: req.authId, survey: survey._id },
				{
					results: obj.results,
					$setOnInsert: {
						user: req.authId,
						survey: survey._id
					}
				},
				{ new: true, upsert: true, setDefaultsOnInsert: true, session }
			);
			survey.responseCount = await Response.find({
				survey: survey._id
			}).countDocuments();
			await survey.save();
			req.response = {
				model: this.model,
				code: OK,
				message: this.lang.updated,
				value: value
			};
			await session.commitTransaction();
			return next();
		} catch (err) {
			await session.abortTransaction();
			return next(err);
		}
	}

	/**
	 * @param {Object} req The request object
	 * @param {Object} res The response object
	 * @param {Function} next The callback to the next program handler
	 * @return {Object} res The response object
	 */
	async results(req, res, next) {
		try {
			let survey = req.object;
			let responses = await Response.find({ survey: survey._id }).lean();
			responses = _.flatten(responses.map(r => r.results));
			let group = _.groupBy(responses, r => r.question);
			let results = {};
			for (let key in group) {
				if (group.hasOwnProperty(key)) {
					results[key] = _.groupBy(group[key], r => r.value);
					for (let k in results[key]) {
						if (results[key].hasOwnProperty(k)) {
							results[key][k] = results[key][k].length;
						}
					}
				}
			}
			req.response = {
				model: this.model,
				code: OK,
				message: this.lang.updated,
				value: results
			};
			return next();
		} catch (err) {
			return next(err);
		}
	}
}

export default SurveyController;
