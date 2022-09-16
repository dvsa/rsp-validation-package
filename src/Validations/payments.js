/* eslint no-restricted-syntax: 0 */
/* eslint no-prototype-builtins: 0 */
import Joi from 'joi';
import paymentValidation from '../ValidationModels/paymentValidation';

export default (data) => {
	const schema = Joi.object(paymentValidation.request);
	const validationResult = schema.validate(data);
	if (validationResult.error) {
		return {
			valid: false,
			error: {
				message: 'Invalid Input',
			},
		};
	}

	if (data.PenaltyStatus === 'UNPAID' && !isEmpty(data.PaymentDetail)) {
		return { valid: false, error: { message: 'PaymentDetail must be empty {} when status is UNPAID' } };
	}

	if (data.PenaltyStatus === 'PAID' && isEmpty(data.PaymentDetail)) {
		return { valid: false, error: { message: 'PaymentDetail must be populated when status is PAID' } };
	}

	if (data.PenaltyStatus === 'PAID' && !data.PaymentDetail) {
		return { valid: false, error: { message: 'PaymentMethod must be populated when status is PAID' } };
	}

	if (!validatePaymentRef(data.PenaltyReference, data.PenaltyType)) {
		return { valid: false, error: { message: 'Invalid Payment Reference' } };
	}

	return { valid: true, error: {} };
};

function validatePaymentRef(penaltyReference, penaltyType) {
	if (typeof penaltyReference === 'undefined' || typeof penaltyType === 'undefined') {
		return false;
	}
	if (penaltyType === 'IM') {
		const matches = penaltyReference.match(/^([0-9]{6})([0-1])([0-9]{6})$/);

		let initialSegment = 0;
		let lastSegment = 0;

		if (matches && matches.length > 3) {
			initialSegment = Number(matches[1]);
			lastSegment = Number(matches[3]);
			if (initialSegment === 0 || lastSegment === 0) {
				return false;
			}
			return true;
		}
		return false;

	} if (penaltyType === 'CDN' || penaltyType === 'FPN') {
		const matches = penaltyReference.match(/^([0-9]{12,13})$/);
		if (matches === null) {
			return false;
		}
		return true;
	}

	return false;
}

function isEmpty(obj) {
	for (const prop in obj) {
		if (obj.hasOwnProperty(prop)) { return false; }
	}

	return JSON.stringify(obj) === JSON.stringify({});
}
