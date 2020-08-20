import User from '../api/user/user.model';
import _ from 'lodash';
import Response from '../api/response/response.model';

export default async (req, res, next) => {
	const user = await User.findOne({ _id: req.authId });
	if (user.role !== 'coordinator' && req.authId) {
		let surveys = (_.isArray(req.response.value)) ? req.response.value : [req.response.value];
		if (surveys.length) {
			const surveyIds = surveys.map(s => s._id);
			const responses = await Response.find({
				user: req.authId,
				survey: { $in: surveyIds }
			}).select('user survey').lean();
			if (responses.length) {
				surveys = [...surveys.map(s => s.toJSON())];
				responses.forEach(response => {
					const surveyIndex = surveys.findIndex(survey => String(survey._id) === String(response.survey));
					surveys[surveyIndex].hasResponded = true;
				});
			}
			req.response = Object.assign(req.response, { value: (_.isArray(req.response.value)) ? surveys : surveys[0] });
		}
	}
	return next();
};
