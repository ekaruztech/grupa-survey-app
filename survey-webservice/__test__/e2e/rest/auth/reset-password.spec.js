import Auth from '../../../../src/v1/api/auth/auth.model';
// Require the dev-dependencies
import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import { after, before, describe } from 'mocha';
import { getUserObject } from '../../../_seeds/user.seed';
import { addHourToDate } from '../../../../src/utils/helpers';
import { RESET_PASSWORD_URL, TEST_API_KEY } from '../../routes';
import { BAD_REQUEST, OK, UNAUTHORIZED } from '../../../../src/utils/constants';
import { EmptyAuthCollections } from '../../../util';

let should = chai.should();
let server;
let auth;
// Our parent block
describe('Setup For Update Password Test', () => {
	before(async () => {
		server = supertest(await app);
		await EmptyAuthCollections();
		auth = await (new Auth({
			...getUserObject(), passwordResetCode: '1234',
			resetCodeExpiration: addHourToDate(1), accountVerified: true
		}).save());
	});
	
	after(async () => {
		await EmptyAuthCollections();
	});
	describe('Update password  Code Endpoint Test ' + RESET_PASSWORD_URL, () => {
		it('Should try update password of a main with invalid payload', async () => {
			const response = await server.post(RESET_PASSWORD_URL)
				.send({})
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.expect(BAD_REQUEST);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
			response.body.meta.error.should.be.instanceOf(Object);
		});
		it('Should try update password of a user with invalid update hash gotten from update password link', async () => {
			const response = await server.post(RESET_PASSWORD_URL)
				.send({
					email: getUserObject().email,
					passwordResetCode: '6372',
					password: 'password',
				})
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.expect(UNAUTHORIZED);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
			response.body.meta.error.should.be.instanceOf(Object);
		});
		it('Should update user with valid update password request payload', async () => {
			const response = await server.post(RESET_PASSWORD_URL)
				.send({
					email: getUserObject().email,
					passwordResetCode: auth.passwordResetCode,
					password: 'password',
				})
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.expect(OK);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.should.have.property('data');
			console.log('response.body.data.success : ', response.body.data.success);
			response.body.data.success.should.be.true;
		});
	});
});
