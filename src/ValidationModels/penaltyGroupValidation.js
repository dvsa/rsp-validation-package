import Joi from 'joi';
import PenaltyValidation from './penaltyValidation';

const receiptSchema = {
	ReceiptReference: Joi.string().regex(/^[0-9-A-Z]*$/),
	PenaltyType: Joi.string().valid(['FPN', 'CDN', 'IM']),
	StatusUpdateTime: Joi.number(),
};

export default {
	request: Joi.object().keys({
		Offset: Joi.number().required(),
		Timestamp: Joi.number().required(),
		Location: Joi.string().required(),
		SiteCode: Joi.number().required(),
		VehicleRegistration: Joi.string().required().regex(/^[0-9A-Z,]*$/),
		Penalties: Joi.array().items(PenaltyValidation.request).required(),
		PendingTransactions: Joi.array().items(receiptSchema),
	}),
};
