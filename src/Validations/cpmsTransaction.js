import Joi from 'joi';
import cpmsTransactionValidation from '../ValidationModels/cpmsTransactionValidation';

export default (data) => {
	const schema = Joi.object(cpmsTransactionValidation.request);
	const joiResult = schema.validate(data);
	if (joiResult.error) {
		return {
			valid: false,
			error: {
				message: `Invalid Input: ${joiResult.error.message}`,
			},
		};
	}
	return { valid: true, error: {} };
};
