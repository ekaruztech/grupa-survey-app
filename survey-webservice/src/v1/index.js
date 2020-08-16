import { Router } from 'express';

import auth from './api/auth/auth.route';
import user from './api/user/user.route';

const router = Router();

router.use(auth);
router.use(user);

export default router;
