import Auth from '../../../../src/v1/api/auth/auth.model';
// Require the dev-dependencies
import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import { after, before, describe } from 'mocha';
import { SEND_VERIFICATION_URL, TEST_API_KEY, VERIFY_LINK_URL } from '../../routes';
import { getUserObject } from '../../../_seeds/user.seed';
import AuthProcessor from '../../../../src/v1/api/auth/auth.processor';
import { BAD_REQUEST, OK, UNAUTHORIZED } from '../../../../src/utils/constants';
import { EmptyAuthCollections } from '../../../util';

let should = chai.should();
let server;
let user;
let token;
// Our parent block
describe('Setup For Send Verification Test', () => {
	before(async () => {
		server = supertest(await app);
		await EmptyAuthCollections();
		const auth = await (new Auth({ ...getUserObject(), verificationCode: '1234', accountVerified: false }).save());
		token = await AuthProcessor.signToken({ auth });
	});
	after(async () => {
		await EmptyAuthCollections();
	});
	
	describe('Send Verification Endpoint Test ' + SEND_VERIFICATION_URL, () => {
		it('Should test send verification with invalid payload', async () => {
			const response = await server.post(VERIFY_LINK_URL)
				.send({})
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.set('x-access-token', token)
				.expect(BAD_REQUEST);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
			response.body.meta.error.should.be.instanceOf(Object);
		});
		it('Should test send verification  of an invalid main and token', async () => {
			const response = await server.post(SEND_VERIFICATION_URL)
				.send({ verifyRedirectUrl: 'http://localhost:4200/auth/verify-link' })
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.set('x-access-token', token + '0')
				.expect(UNAUTHORIZED);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
			response.body.meta.error.should.be.instanceOf(Object);
		});
		it('Should test verification of a main with invalid verification hash gotten from verification link', async () => {
			const response = await server.post(SEND_VERIFICATION_URL)
				.send({ verifyRedirectUrl: 'http://localhost:4200/auth/verify-link' })
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.set('x-access-token', token)
				.expect(OK);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.should.have.property('data');
		});
	});
});
