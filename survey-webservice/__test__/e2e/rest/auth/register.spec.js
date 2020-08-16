// Require the dev-dependencies
import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import { after, before, describe } from 'mocha';
import { getUserObject } from '../../../_seeds/user.seed';
import { REGISTER_URL, TEST_API_KEY } from '../../routes';
import { BAD_REQUEST, CONFLICT, OK } from '../../../../src/utils/constants';
import { EmptyAuthCollections } from '../../../util';

let should = chai.should();
let server;

// Our parent block
describe('Setup For Register Test', () => {
	before(async () => {
		server = supertest(await app);
		await EmptyAuthCollections();
	});
	/*
	 * Function to run after test is complete
	 */
	after(async () => { // Before each test we empty the database
		await EmptyAuthCollections();
	});
	/*
	 * Test a new main registration /auth/register route
	 */
	describe('Register Endpoint Test' + REGISTER_URL, () => {
		it('Should test creating a main with invalid payload', async () => {
			const response = await server.post(REGISTER_URL)
				.send({ email: 'test' })
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.expect(BAD_REQUEST);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
			response.body.meta.error.should.be.instanceOf(Object);
		});
		it('Should test creating a main with the expected details', async () => {
			const response = await server.post(REGISTER_URL)
				.send({ ...getUserObject() })
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.expect(OK);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.should.have.property('data');
			response.body.meta.should.have.property('token');
			response.body.data.should.have.property('verificationCode');
			response.body.data.verificationCode.should.be.a('string');
			response.body.meta.token.should.be.a('string');
		});
		it('Should test creating a main that already exist', async () => {
			const response = await server.post(REGISTER_URL)
				.send({ ...getUserObject() })
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.expect(CONFLICT);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
			response.body.meta.error.should.be.instanceOf(Object);
		});
	});
});
