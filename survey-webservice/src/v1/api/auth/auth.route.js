import { Router } from 'express';
import auth from '../../middleware/auth';
import Auth from './auth.controller';

const router = Router();

router.post('/socialAuth/:social', Auth.socialSignIn);
router.post('/signIn', Auth.signIn);
router.post('/signUp', Auth.signUp);
router.post('/verifyCode', auth, Auth.verifyCode);
router.post('/verifyLink', Auth.verifyLink);
router.post('/sendVerification', auth, Auth.sendVerification);
router.post('/changePassword', auth, Auth.changePassword);
router.post('/sendResetPasswordCodeLink', Auth.sendResetPasswordCodeLink);
router.post('/resetPassword', Auth.resetPassword);

router.get('/findByEmail/:email', Auth.findByEmail);

export default router;

