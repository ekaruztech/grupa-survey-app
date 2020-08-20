import AppProcessor from '../_core/app.processor';
import _ from 'lodash';

/**
 * The ModuleProcessor class
 */
class SurveyProcessor extends AppProcessor {
	/**
	 * @param {Object} pagination The pagination object
	 * @param {Object} queryParser The query parser
	 * @return {Object}
	 */
	async buildModelQueryObject(pagination, queryParser = null) {
		const omitKeys = ['hasQuestion'];
		let obj = queryParser.query;
		if (obj.hasQuestion) {
			queryParser.query['questions'] = { $exists: true, $ne: [] };
		}
		queryParser.query = _.omit(queryParser.query, ...omitKeys);
		return super.buildModelQueryObject(pagination, queryParser);
	}
}

export default SurveyProcessor;
