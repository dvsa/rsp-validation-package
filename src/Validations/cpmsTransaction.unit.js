import expect from 'expect';

import cpmsTransactionValidation from './cpmsTransaction';
import cpmsPayloadSampleCard from '../../test/data/cpmsPayloads/cpmsPayloadSampleCard';
import cpmsPayloadSampleCardSingleIm from '../../test/data/cpmsPayloads/cpmsPayloadSampleCardSingleIm';
import cpmsPayloadSampleCardNotPresent from '../../test/data/cpmsPayloads/cpmsPayloadSampleCardNotPresent';
import cpmsPayloadSampleCash from '../../test/data/cpmsPayloads/cpmsPayloadSampleCash';
import cpmsPayloadSampleCheque from '../../test/data/cpmsPayloads/cpmsPayloadSampleCheque';
import cpmsPayloadSamplePostal from '../../test/data/cpmsPayloads/cpmsPayloadSamplePostal';

describe('cpmsTransactionValidation', () => {

	context('given exceptional input values are being validated', () => {
		describe('when a blank object is passed for validation', () => {
			it('should return valid set to false', () => {
				const validationResult = cpmsTransactionValidation({});
				expect(validationResult.valid).toBe(false);
			});
		});

		describe('when null is passed for validation', () => {
			it('should return valid set to false', () => {
				const validationResult = cpmsTransactionValidation(null);
				expect(validationResult.valid).toBe(false);
			});
		});
	});

	context('given a card payment object is being validated', () => {
		let cardPaymentObject;

		beforeEach(() => {
			cardPaymentObject = { ...cpmsPayloadSampleCard };
		});

		describe('when a valid payment object is passed for validation', () => {
			it('should return valid set to true', () => {
				const validationResult = cpmsTransactionValidation(cardPaymentObject);
				expect(validationResult.error.message).toBeUndefined();
				expect(validationResult.valid).toBe(true);
			});
		});

		describe('when included payment item doesn\'t match payment item schema', () => {
			it('should return valid set to false', () => {
				delete cardPaymentObject.payment_data[0].sales_reference;
				const validationResult = cpmsTransactionValidation(cardPaymentObject);
				expect(validationResult.valid).toBe(false);
				expect(validationResult.error.message).toContain('sales_reference');
			});
		});

		describe('when payment object array is empty', () => {
			it('should return valid set to false', () => {
				cardPaymentObject.payment_data = [];
				const validationResult = cpmsTransactionValidation(cardPaymentObject);
				expect(validationResult.valid).toBe(false);
			});
		});

		describe('when card payment object has property from cash payment object', () => {
			it('should return valid set to false', () => {
				cardPaymentObject.slip_number = 'test';
				const validationResult = cpmsTransactionValidation(cardPaymentObject);
				expect(validationResult.valid).toBe(false);
				expect(validationResult.error.message).toContain('slip_number');
			});
		});
	});

	context('given a payment containing an immobilisation is being taken', () => {
		let immobCardPaymentObj;
		beforeEach(() => {
			immobCardPaymentObj = { ...cpmsPayloadSampleCardSingleIm };
		});

		describe('when a valid payment object is passed for validation', () => {
			it('should return with valid set to true', () => {
				const validationResult = cpmsTransactionValidation(immobCardPaymentObj);
				expect(validationResult.error.message).toBeUndefined();
				expect(validationResult.valid).toBe(true);
			});
		});
	});

	context('given a card not present payment object is being validated', () => {
		let cardNotPresentPaymentObject;

		beforeEach(() => {
			cardNotPresentPaymentObject = { ...cpmsPayloadSampleCardNotPresent };
		});
		describe('when a valid payment object is passed for validation', () => {
			it('should return valid set to true', () => {
				const validationResult = cpmsTransactionValidation(cardNotPresentPaymentObject);
				expect(validationResult.error.message).toBeUndefined();
				expect(validationResult.valid).toBe(true);
			});
		});
	});

	context('given a cash payment object is being validated', () => {
		let cashPaymentObject;

		beforeEach(() => {
			cashPaymentObject = { ...cpmsPayloadSampleCash };
		});
		describe('when a valid payment object is passed for validation', () => {
			it('should return valid set to true', () => {
				const validationResult = cpmsTransactionValidation(cashPaymentObject);
				expect(validationResult.error.message).toBeUndefined();
				expect(validationResult.valid).toBe(true);
			});
		});
	});

	context('given a cheque payment object is  being validated', () => {
		let chequePaymentObject;

		beforeEach(() => {
			chequePaymentObject = { ...cpmsPayloadSampleCheque };
		});
		describe('when a valid cheque payment object is passed for validation', () => {
			it('should return valid set to true', () => {
				const validationResult = cpmsTransactionValidation(chequePaymentObject);
				expect(validationResult.error.message).toBeUndefined();
				expect(validationResult.valid).toBe(true);
			});
		});
	});

	context('given a postal order payment object is being validated', () => {
		let postalOrderPaymentObject;

		beforeEach(() => {
			postalOrderPaymentObject = { ...cpmsPayloadSamplePostal };
		});
		describe('when a valid postal order payment obejct is passed for validation', () => {
			it('should return valid set to true', () => {
				const validationResult = cpmsTransactionValidation(postalOrderPaymentObject);
				expect(validationResult.error.message).toBeUndefined();
				expect(validationResult.valid).toBe(true);
			});
		});
	});
});
