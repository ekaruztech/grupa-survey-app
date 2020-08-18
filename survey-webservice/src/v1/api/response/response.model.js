/**
 * User Schema
 */
import mongoose from 'mongoose';
import AppSchema from '../_core/app.model';

const ResponseSchema = new AppSchema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	survey: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Survey',
		required: true
	},
	question: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	value: {
		type: String
	}
}, {
	autoCreate: true,
	timestamps: true,
	toJSON: { virtuals: true }
});

ResponseSchema.statics.fillables = [
	'value'
];
/**
 * @typedef ResponseSchema
 */
export default mongoose.model('Response', ResponseSchema);
