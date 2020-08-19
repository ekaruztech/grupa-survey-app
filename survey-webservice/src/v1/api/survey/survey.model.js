/**
 * User Schema
 */
import mongoose, { Schema } from "mongoose";
import SurveyProcessor from "./survey.processor";
import SurveyValidation from "./survey.validation";
import AppSchema from "../_core/app.model";

const SurveyModel = new AppSchema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User"
		},
		name: {
			type: String,
			required: true
		},
		responseCount: {
			type: Number,
			default: 0
		},
		questions: [
			{
				questionType: {
					type: String,
					enum: ["select_radio"],
					required: true,
					default: "select_radio"
				},
				label: {
					type: String,
					required: true
				},
				description: String,
				options: [
					{
						value: String,
						label: String
					}
				]
			}
		],
		active: {
			type: Boolean,
			default: true
		},
		deleted: {
			type: Boolean,
			default: false,
			select: false
		}
	},
	{
		autoCreate: true,
		timestamps: true,
		toJSON: { virtuals: true }
	}
);

SurveyModel.statics.fillables = ["name"];

SurveyModel.statics.updateFillables = ["name"];

/**
 * @return {Object} The validator object with the specified rules.
 */
SurveyModel.statics.getValidator = () => {
	return new SurveyValidation();
};

/**
 * @param {Model} model required for response
 * @return {Object} The processor class instance object
 */
SurveyModel.statics.getProcessor = model => {
	return new SurveyProcessor(model);
};
/**
 * @typedef SurveyModel
 */
export default mongoose.model("Survey", SurveyModel);
