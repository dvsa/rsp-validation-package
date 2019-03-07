import Joi from 'joi';

const pendingTransactionSchema = {
	ReceiptTimestamp: Joi.number(),
};

const regNoValidation = Joi.string().min(1).max(10)
	.regex(/^[A-Z0-9a-z]{1,10}$/);

const driverSchema = {
	name: Joi.string(),
	address: Joi.string(),
	licenceNumber: Joi.string(),
};

const vehicleSchema = {
	regNo: regNoValidation.required(),
	make: Joi.string(),
	nationality: Joi.string(),
};

const trailerSchema = {
	number1: Joi.string(),
	number2: Joi.string(),
};

const valueSchema = {
	penaltyType: Joi.string().regex(/^(IM|CDN|FPN)$/).required(),
	paymentStatus: Joi.string().valid(['PAID', 'UNPAID']),
	paymentAuthCode: Joi.string().alphanum(),
	// .when('paymentStatus', { is: 'PAID', then: Joi.required() }),
	paymentDate: Joi.number().integer(),
	// .when('paymentStatus', { is: 'PAID', then: Joi.required() }),
	paymentToken: Joi.string().alphanum().required(),
	referenceNo: Joi.string().required().regex(/^[0-9-A-Z]*$/).min(8)
		.max(18),
	driverDetails: Joi.object(driverSchema),
	vehicleDetails: Joi.object(vehicleSchema).required(),
	trailerDetails: Joi.object(trailerSchema),
	nonEndorsableOffence: Joi.array().items(Joi.string()),
	penaltyAmount: Joi.number().integer().required().min(10)
		.max(9999),
	paymentDueDate: Joi.number().integer(),
	officerName: Joi.string().required(),
	dateTime: Joi.number().integer().required(),
	paymentCodeDateTime: Joi.number().integer(),
	placeWhereIssued: Joi.string(),
	officerID: Joi.string().regex(/^[a-zA-Z0-9_-]*$/).required(),
	siteCode: Joi.number().integer().required(),
	inPenaltyGroup: Joi.boolean().required(),
};

export default {
	request: Joi.object().keys({
		ID: Joi.string().token().required(),
		Hash: Joi.string().required().alphanum(),
		Enabled: Joi.boolean().required(),
		Offset: Joi.number(),
		Value: Joi.object(valueSchema),
		Origin: Joi.string().regex(/^[A-Z]*$/),
		VehicleRegistration: regNoValidation,
		PendingTransactions: Joi.object().pattern(/[0-9-A-Z]/, Joi.object(pendingTransactionSchema)).optional(),
	}),
};
