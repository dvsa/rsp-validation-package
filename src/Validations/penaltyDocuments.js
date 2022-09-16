import Joi from 'joi';
import penaltyDocumentValidation from '../ValidationModels/penaltyValidation';

export default (data) => {
	const schema = Joi.object(penaltyDocumentValidation.request);
	const validationResult = schema.validate(data);
	if (validationResult.error) {
		return {
			valid: false,
			error: {
				message: 'Invalid Input',
			},
		};
	}

	// additional validations
	if (data.Value.penaltyType !== 'IM' && data.ID !== `${data.Value.referenceNo}_${data.Value.penaltyType}`) {
		const errMsg = 'ID does not match referenceNo and penaltyType';
		return { valid: false, error: { message: errMsg } };
	}

	if (data.Value.penaltyType !== 'IM' && data.Value.referenceNo.length < 12) {
		const errMsg = 'ReferenceNo is too short';
		return { valid: false, error: { message: errMsg } };
	}

	if (data.Value.penaltyType !== 'IM' && data.Value.referenceNo.length > 13) {
		const errMsg = 'ReferenceNo is too long';
		return { valid: false, error: { message: errMsg } };
	}

	if (data.Value.penaltyType === 'IM') {

		if (!data.Value.referenceNo.match(/^[0-9]{1,6}-[0-9]-[0-9]{1,6}-IM$/)) {
			const errMsg = 'ReferenceNo should be 999999-9-999999-IM format';
			return { valid: false, error: { message: errMsg } };
		}

		const matches = data.Value.referenceNo.match(/^([0-9]{1,6})-([0-1])-([0-9]{1,6})-IM$/);
		if (matches && matches.length > 3) {
			const initialSegment = Number(matches[1]);
			const middleSegment = Number(matches[2]);
			const lastSegment = Number(matches[3]);

			if ((initialSegment === 0 || lastSegment === 0)
			|| (middleSegment !== 0 && middleSegment !== 1)) {
				const errMsg = 'Invalid referenceNo';
				return { valid: false, error: { message: errMsg } };
			}
			const idMatches = data.ID.match(/^([0-9]{6})([0-1])([0-9]{6})_IM$/);

			if (idMatches && idMatches.length > 3) {
				const idInitialSegment = Number(idMatches[1]);
				const idMiddleSegment = Number(idMatches[2]);
				const idLastSegment = Number(idMatches[3]);

				if (idInitialSegment !== initialSegment
					|| idLastSegment !== lastSegment
					|| idMiddleSegment !== middleSegment) {
					const errMsg = 'ID does not match referenceNo and penaltyType';
					return { valid: false, error: { message: errMsg } };
				}
			} else {
				const errMsg = 'Invalid ID';
				return { valid: false, error: { message: errMsg } };
			}
		} else {
			const errMsg = 'Invalid reference No';
			return { valid: false, error: { message: errMsg } };
		}
	}
	return { valid: true, error: {} };

};
