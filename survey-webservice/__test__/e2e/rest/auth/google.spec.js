// Require the dev-dependencies
import chai from 'chai';
import request from 'request-promise';
import supertest from 'supertest';
import app from '../../../app';
import { after, before, describe } from 'mocha';
import { SOCIAL_AUTH_URL, TEST_API_KEY } from '../../routes';
import { BAD_REQUEST, FORBIDDEN, OK } from '../../../../src/utils/constants';
import { EmptyAuthCollections } from '../../../util';

let should = chai.should();
let server;
let socialId = process.env.GOOGLE_ID;
let loginSocialGoogleUrl = SOCIAL_AUTH_URL + '/google';

// Our parent block
describe('Setup For Google Sign in Code Test', () => {
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
	describe('Google social authentication /POST socialAuth/google', () => {
		it('Should test social login with incorrect payload', async () => {
			const response = await server.post(loginSocialGoogleUrl)
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
		it('Should test social login with invalid access token', async () => {
			const response = await server.post(loginSocialGoogleUrl)
				.send({
					email: 'test@gmail.com',
					socialId,
					accessToken: 'jhsdbfvkjsdbvjhjdbvkjscbvnkjsdc',
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
		it('Should test social login with inconsistent identity', async () => {
			const gRes = await request.post({
				headers: { 'content-type': 'application/x-www-form-urlencoded' },
				url: 'https://www.googleapis.com/oauth2/v4/token',
				body: `client_secret=${process.env.GOOGLE_SECRET}&client_id=${process.env.GOOGLE_CLIENT_ID}&refresh_token=${process.env.GOOGLE_REFRESH_TOKEN}&grant_type=refresh_token`
			});
			const googleAuthBody = JSON.parse(gRes);
			googleAuthBody.should.be.instanceOf(Object);
			googleAuthBody.should.have.property('access_token');
			googleAuthBody.should.have.property('id_token');
			const response = await server.post(loginSocialGoogleUrl)
				.send({
					socialId: '1001010010101',
					email: 'test@gmail.com',
					accessToken: googleAuthBody.id_token,
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
		it('Should test google social login with valid details', async () => {
			const gRes = await request.post({
				headers: { 'content-type': 'application/x-www-form-urlencoded' },
				url: 'https://www.googleapis.com/oauth2/v4/token',
				body: `client_secret=${process.env.GOOGLE_SECRET}&client_id=${process.env.GOOGLE_CLIENT_ID}&refresh_token=${process.env.GOOGLE_REFRESH_TOKEN}&grant_type=refresh_token`
			});
			const googleAuthBody = JSON.parse(gRes);
			googleAuthBody.should.be.instanceOf(Object);
			googleAuthBody.should.have.property('access_token');
			googleAuthBody.should.have.property('id_token');
			const response = await server.post(loginSocialGoogleUrl)
				.send({
					socialId,
					email: 'ekaruztest@gmail.com',
					accessToken: googleAuthBody.id_token,
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
