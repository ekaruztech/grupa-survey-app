import Auth from '../../../../src/v1/api/auth/auth.model';
// Require the dev-dependencies
import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import { after, before, describe } from 'mocha';
import { SOCIAL_AUTH_URL, TEST_API_KEY } from '../../routes';
import { getUserObject } from '../../../_seeds/user.seed';
import { BAD_REQUEST, FORBIDDEN, OK } from '../../../../src/utils/constants';
import { EmptyAuthCollections } from '../../../util';

let should = chai.should();
let server;
let accessToken = process.env.FB_ACCESS_TOKEN;
let email = process.env.FB_EMAIL;
let socialId = process.env.FB_ID;
let loginSocialFacebookUrl = SOCIAL_AUTH_URL + '/facebook';

// Our parent block
describe('Setup For Facebook Sign in Code Test', () => {
	before(async () => {
		server = supertest(await app);
		await EmptyAuthCollections();
	});
	after(async () => {
		await EmptyAuthCollections();
	});
	/*
	 * Test main login /auth/login route
	 */
	describe('Social Auth Endpoint Test ' + SOCIAL_AUTH_URL, () => {
		it('Should test facebook social login with incorrect payload', async () => {
			const response = await server.post(loginSocialFacebookUrl)
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
		it('Should test facebook social login with invalid access token', async () => {
			const response = await server.post(loginSocialFacebookUrl)
				.send({
					socialId: '1872322169710599',
					email: 'test@gmail.com',
					accessToken: 'jhsdbfvkjsdbvjhjdbvkjscbvnkjsdc'
				})
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.expect(FORBIDDEN);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
			response.body.meta.error.should.be.instanceOf(Object);
		});
		it('Should test facebook social login with inconsistent identity', async () => {
			const response = await server.post(loginSocialFacebookUrl)
				.send({
					socialId: '1872322169710599',
					email,
					accessToken,
				})
				.set('x-api-key', TEST_API_KEY)
				.expect('Content-type', /json/)
				.expect(FORBIDDEN);
			response.body.should.be.instanceOf(Object);
			response.body.should.have.property('meta');
			response.body.meta.should.have.property('status_code');
			response.body.meta.should.have.property('error');
			response.body.meta.error.should.be.instanceOf(Object);
		});
		it('Should test facebook social login with valid details', async () => {
			const response = await server.post(loginSocialFacebookUrl)
				.send({
					socialId,
					email,
					accessToken,
				})
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
