import { Router } from 'express';

import auth from './api/auth/auth.route';
import user from './api/user/user.route';
import survey from './api/survey/survey.route';
import response from './api/response/response.route';

const router = Router();

router.use(auth);
router.use(user);
router.use(survey);
router.use(response);

export default router;
