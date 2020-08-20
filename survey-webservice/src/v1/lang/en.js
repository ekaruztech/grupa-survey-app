export default {
	auth: {
		AUTH100: 'No authorization token provided',
		credential_incorrect: 'Email or password is not correct',
		authentication_failed: 'Authentication Failed! Wrong email or password',
		email_exist: 'Email already exist',
		incorrect_verify_code: 'Incorrect verification code!',
		verification_successful: 'verification successful!',
		verify_unauthorized: 'You are not authorized to perform verification',
		password_reset_unauthorized:
			'You are not authorized to perform password reset',
		password_reset_link_expired:
			'Your reset link and code has expired, please request a new one',
		account_does_not_exist: 'An account with this email does not exist',
		verify_expired:
			'Your verification link and code has expired, please request a new one',
		account_verified: 'Your account has been verified',
		social_error: 'Sorry we cannot verify your social account at the moment',
		verify_email_sent: 'An email has been sent to you',
		incorrect_password: 'Operation failed, incorrect password!',
		email_does_not_exist: 'Email does not exist'
	},
	error: {
		server: 'Error in setup interaction',
		resource_not_found: 'Resource not found!',
		profile_not_found: 'Profile not found!',
		resource_already_exist: 'Duplicate record is not allowed',
		inputs: 'There are problems with your input',
		un_authorized: 'Not authorized',
		not_auth_token: 'No authorization token provided',
		not_found: 'Resource not found',
		no_update_input: 'Nothing to update'
	},
	users: {
		created: 'User successfully created',
		updated: 'User successfully updated',
		deleted: 'User successfully deleted',
		not_found: 'User not found',
		cannot_delete_user: 'Not authorized to delete a regular main',
		avatar: 'User avatar updated',
		username_does_not_exist: 'Username does not exist'
	},
	file: {
		uploaded: 'File successfully uploaded',
		no_file_uploaded: 'No file uploaded'
	},
	surveys: {
		created: 'Survey successfully created',
		updated: 'Survey successfully updated',
		deleted: 'Survey successfully deleted',
		not_found: 'Survey not found',
		question_not_found: 'Some question id invalid',
		response_value_invalid: 'Some response value is invalid'
	},
	responses: {
		created: 'Response successfully created',
		updated: 'Response successfully updated',
		deleted: 'Response successfully deleted',
		not_found: 'Response not found'
	}
};
