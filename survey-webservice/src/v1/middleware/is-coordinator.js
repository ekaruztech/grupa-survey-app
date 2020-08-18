import User from '../api/user/user.model';
import AppError from '../../lib/app-error';
import { FORBIDDEN } from '../../utils/constants';

export default async (req, res, next) => {
	const user = await User.findOne({ _id: req.authId });
	if (user.role !== 'coordinator') {
		return next(new AppError('Only coordinators are allowed to perform this function', FORBIDDEN));
	}
	return next();
	// decode token
};
