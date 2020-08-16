// Require the dev-dependencies
import Auth from '../../../../src/v1/api/auth/auth.model';
import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import { after, before, describe } from 'mocha';
import { getUserObject } from '../../../_seeds/user.seed';
import { TEST_API_KEY, VERIFY_URL } from '../../routes';
import { BAD_REQUEST, FORBIDDEN, OK, UNAUTHORIZED } from '../../../../src/utils/constants';
import AuthProcessor from '../../../../src/v1/api/auth/auth.processor';
import { EmptyAuthCollections } from '../../../util';

let should = chai.should();
let server;
let auth;
let token;
// Our parent block
describe('Setup For Verify Code Test', () => {
	before(async () => {
		server = supertest(await app);
		await EmptyAuthCollections();
		auth = await (new Auth({ ...getUserObject(), verificationCode: '1234', accountVerified: false }).save());
		token = await AuthProcessor.signToken({ auth });
	});
	after(async () => {
		await EmptyAuthCollections();
	});
	describe('Verify Code Endpoint Test ' + VERIFY_URL, () => {
		it('Should test verification of a main with unauthorized token', async () => {
			const response = await server.post(VERIFY_URL)
				.send({ verificationCode: 145321 })
				.set('x-api-key', TEST_API_KEY)
				.set('x-access-token', token + '90')
				.expect('Content-type', /json/)
				.expect(UNAUTHORIZED);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
			response.body.meta.error.should.be.instanceOf(Object);
		});
		it('Should test verification of a main with invalid verification code', async () => {
			const response = await server.post(VERIFY_URL)
				.send({ verificationCode: 145321 })
				.set('x-api-key', TEST_API_KEY)
				.set('x-access-token', token)
				.expect('Content-type', /json/)
				.expect(FORBIDDEN);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
			response.body.meta.error.should.be.instanceOf(Object);
		});
		it('Should test verification of a main with invalid payload', async () => {
			const response = await server.post(VERIFY_URL)
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
		it('Should test verification of a main with valid verification request payload', async () => {
			const response = await server.post(VERIFY_URL)
				.send({ verificationCode: auth.verificationCode, email: auth.email })
				.set('x-api-key', TEST_API_KEY)
				.set('x-access-token', token)
				.expect('Content-type', /json/)
				.expect(OK);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.should.have.property('data');
			response.body.data.should.have.property('accountVerified');
			response.body.data.accountVerified.should.be.true;
		});
	});
});
