import Auth from '../../../../src/v1/api/auth/auth.model';
// Require the dev-dependencies
import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import { after, before, describe } from 'mocha';
import { getUserObject } from '../../../_seeds/user.seed';
import { LOGIN_URL, TEST_API_KEY } from '../../routes';
import { BAD_REQUEST, NOT_FOUND, OK, UNAUTHORIZED } from '../../../../src/utils/constants';
import { EmptyAuthCollections } from '../../../util';

let should = chai.should();
let server;

// Our parent block
describe('Setup For Login Test', () => {
	before(async () => {
		server = supertest(await app);
		await EmptyAuthCollections();
		const auth = await (new Auth(getUserObject()).save());
	});
	after(async () => {
		await EmptyAuthCollections();
	});
	describe('Login Endpoint Test ' + LOGIN_URL, () => {
		it('Should test login a main that does not exist or not registered', async () => {
			const response = await server.post(LOGIN_URL)
				.send({ email: 'test@gmail.com', password: 'fakepassword' })
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.expect(NOT_FOUND);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
		});
		it('Should test login with invalid main login details', async () => {
			const response = await server.post(LOGIN_URL)
				.send({ email: getUserObject().email, password: 'fakepassword' })
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.expect(UNAUTHORIZED);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
		});
		it('Should test login with invalid request data', async () => {
			const response = await server.post(LOGIN_URL)
				.send({})
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.expect(BAD_REQUEST);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
		});
		it('Should login an existing main with valid details', async () => {
			const response = await server.post(LOGIN_URL)
				.send({ email: getUserObject().email, password: getUserObject().password })
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.expect(OK);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.should.have.property('data');
			response.body.meta.should.have.property('token');
		});
	});
});
