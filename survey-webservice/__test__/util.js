import Auth from '../src/v1/api/auth/auth.model';

/**
 * Empty collections
 */
export const EmptyAuthCollections = async () => {
	await Auth.remove({});
};
