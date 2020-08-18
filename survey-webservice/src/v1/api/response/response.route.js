import { Router } from 'express';
import Response from './response.model';
import response from '../../../middleware/response';
import auth from '../../middleware/auth';
import ResponseController from './response.controller';
import isCoordinator from '../../middleware/is-coordinator';

const router = Router();

const responseCtrl = new ResponseController(Response);

router.route('/responses')
	.get(auth, isCoordinator, responseCtrl.find, response);

router.param('id', responseCtrl.id, response);
router.route('/responses/:id')
	.get(auth, isCoordinator, responseCtrl.findOne, response);

export default router;
