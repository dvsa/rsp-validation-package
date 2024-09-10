import Joi from 'joi';
import PenaltyValidation from './penaltyValidation';

export default {
	request: Joi.object().keys({
		Offset: Joi.number().required(),
		Timestamp: Joi.number().required(),
		Location: Joi.string().required(),
		SiteCode: Joi.number().required(),
		VehicleRegistration: Joi.string().required().regex(/^[A-Z0-9a-z]{1,21}$/),
		Penalties: Joi.array().items(PenaltyValidation.request).required(),
		fpnPaymentStartTime: Joi.number(),
		imPaymentStartTime: Joi.number(),
		cdnPaymentStartTime: Joi.number(),
	}),
};
