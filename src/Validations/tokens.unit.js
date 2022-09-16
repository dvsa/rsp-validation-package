import expect from 'expect';

import tokenValidation from './tokens';

let exampleToken;

describe('tokenValidation', () => {
	beforeEach(() => {
		exampleToken = {
			checkBits: '0000',
			paymentAmount: '50',
			docType: 0,
			parsedRef: '1234567890123',
			formattedRef: '1234567890123',
		};
	});

	describe('when a valid  token is passed for validation', () => {
		it('should return valid set to true', () => {
			const retObj = tokenValidation(exampleToken);
			expect(retObj.valid).toBe(true);
		});
	});

	describe('when checkbits are not all zero', () => {
		it('should return a fail with message', () => {
			exampleToken.checkBits = '0101';
			const retObj = tokenValidation(exampleToken);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('check bits not zero');
		});
	});

	describe('when paymentAmount is less than 10', () => {
		it('should return a fail with message', () => {
			exampleToken.paymentAmount = 9;
			const retObj = tokenValidation(exampleToken);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Payment amount must be between 10 and 9999');
		});
	});

	describe('when paymentAmount is greater than 9999', () => {
		it('should return a fail with message', () => {
			exampleToken.paymentAmount = 9;
			const retObj = tokenValidation(exampleToken);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Payment amount must be between 10 and 9999');
		});
	});

	describe('when docType is not 0,1 or 2', () => {
		it('should return a fail with message', () => {
			exampleToken.docType = 3;
			const retObj = tokenValidation(exampleToken);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid docType value');
		});
	});

	describe('when docType is 0 or 2 and parsedRef length less than 12', () => {
		it('should return a fail with message', () => {
			exampleToken.parsedRef = '12345678';
			const retObj = tokenValidation(exampleToken);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid reference length');
		});
	});

	describe('when docType is 0 or 2 and parsedRef length greater than 13', () => {
		it('should return a fail with message', () => {
			exampleToken.parsedRef = '12345678901234';
			const retObj = tokenValidation(exampleToken);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid reference length');
		});
	});

	describe('when docType is 1 and formattedRef is not correct', () => {
		it('should return a fail with message', () => {
			exampleToken.formattedRef = '123456-2-123456-IM';
			exampleToken.docType = 1;
			const retObj = tokenValidation(exampleToken);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid reference');
		});
	});
});
