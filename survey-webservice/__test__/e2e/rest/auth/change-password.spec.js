import Auth from '../../../../src/v1/api/auth/auth.model';
// Require the dev-dependencies
import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import { after, before, describe } from 'mocha';
import { getUserObject } from '../../../_seeds/user.seed';
import { CHANGE_PASSWORD_URL, TEST_API_KEY } from '../../routes';
import AuthProcessor from '../../../../src/v1/api/auth/auth.processor';
import { BAD_REQUEST, NOT_FOUND, OK } from '../../../../src/utils/constants';
import { EmptyAuthCollections } from '../../../util';

let should = chai.should();
let server;
let token = '';

// Our parent block
describe('Setup For Change Password Code Test', () => {
	before(async () => {
		server = supertest(await app);
		await EmptyAuthCollections();
		const auth = await (new Auth({ ...getUserObject(), verificationCode: '1234', accountVerified: false }).save());
		token = await AuthProcessor.signToken({ auth });
	});
	after(async () => {
		await EmptyAuthCollections();
	});
	/*
	 * Test change password endpoint
	 */
	describe('Reset Password Endpoint Test ' + CHANGE_PASSWORD_URL, () => {
		it('Should test change password with incorrect payload', async () => {
			const response = await server.post(CHANGE_PASSWORD_URL)
				.send({})
				.set('x-api-key', TEST_API_KEY)
				.set('x-access-token', token)
				.expect('Content-type', /json/)
				.expect(BAD_REQUEST);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
			response.body.meta.error.should.be.instanceOf(Object);
		});
		it('Should test change password with incorrect previous password', async () => {
			const response = await server.post(CHANGE_PASSWORD_URL)
				.send({ currentPassword: 'wrongpass', password: 'password', })
				.set('x-api-key', TEST_API_KEY)
				.set('x-access-token', token)
				.expect('Content-type', /json/)
				.expect(NOT_FOUND);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
			response.body.meta.error.should.be.instanceOf(Object);
		});
		it('Should test change password with an authorized main and valid previous password', async () => {
			const response = await server.post(CHANGE_PASSWORD_URL)
				.send({ currentPassword: getUserObject().password, password: 'newpassword' })
				.set('x-api-key', TEST_API_KEY)
				.set('x-access-token', token)
				.expect('Content-type', /json/)
				.expect(OK);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.should.have.property('data');
		});
	});
});
