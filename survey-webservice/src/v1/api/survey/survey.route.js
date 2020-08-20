import { Router } from 'express';
import Survey from './survey.model';
import response from '../../../middleware/response';
import auth from '../../middleware/auth';
import attachTakenSurvey from '../../middleware/attach-taken-survey';
import isCoordinator from '../../middleware/is-coordinator';
import SurveyController from './survey.controller';

const router = Router();

const surveyCtrl = new SurveyController(Survey);

router.put(
	'/surveys/:id/addOrUpdateQuestion',
	auth,
	isCoordinator,
	surveyCtrl.addOrUpdateQuestion,
	response
);
router.delete(
	'/surveys/:id/removeQuestion/:questionId',
	auth,
	isCoordinator,
	surveyCtrl.removeQuestion,
	response
);
router.put('/surveys/:id/response', auth, surveyCtrl.response, response);
router.get('/surveys/:id/results', auth, surveyCtrl.results, response);

router
	.route('/surveys')
	.get(auth, surveyCtrl.find, attachTakenSurvey, response)
	.post(auth, isCoordinator, surveyCtrl.create, response);

router.param('id', surveyCtrl.id, response);
router
	.route('/surveys/:id')
	.get(auth, surveyCtrl.findOne, attachTakenSurvey, response)
	.put(auth, isCoordinator, surveyCtrl.update, response)
	.delete(auth, isCoordinator, surveyCtrl.delete, response);

export default router;
