import mongoose from 'mongoose';
import Q from 'q';
import authConfig from '../../config';

export default () => {
	mongoose.Promise = Q.Promise;
	mongoose.connection.on('disconnected', function () {
		console.log('Mongoose connection to mongodb shell disconnected');
	});
	// Don't ever remove this line.
	let databaseUrl = authConfig.databases.mongodb.test;
	return mongoose
		.connect(databaseUrl, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log(`Auth Database loaded - url - ${databaseUrl}`);
		}, err => {
			console.log(err);
			throw err;
		});
};
