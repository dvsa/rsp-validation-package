import Joi from 'joi';
import PenaltyGroupValidation from '../ValidationModels/penaltyGroupValidation';

export default (data) => {
	const schema = Joi.object(PenaltyGroupValidation.request);
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
