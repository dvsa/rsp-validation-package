import expect from 'expect';

import paymentValidation from './payments';

let examplePayment;

describe('paymentValidation', () => {
	beforeEach(() => {
		examplePayment = {
			PenaltyReference: '1234567890123',
			PenaltyStatus: 'PAID',
			PenaltyType: 'FPN',
			PaymentDetail: {
				PaymentRef: 'RJF12345',
				AuthCode: '1234TBD',
				PaymentAmount: 455,
				PaymentDate: 1519300376667,
				PaymentMethod: 'CASH',
			},
		};
	});

	describe('when a valid FPN payment is passed for validation', () => {
		it('should return valid set to true', () => {
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(true);
		});
	});

	describe('when a valid IM payment is passed for validation', () => {
		it('should return valid set to true', () => {
			examplePayment.PenaltyReference = '1234561123456';
			examplePayment.PenaltyType = 'IM';
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(true);
		});
	});

	describe('when an empty payment is passed for validation', () => {
		const payment = {};
		it('should return a fail with message', () => {
			const retObj = paymentValidation(payment);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid Input');
		});
	});

	describe('when PaymentAmount is <10', () => {
		it('should return a fail with message', () => {
			examplePayment.PaymentDetail.PaymentAmount = 9;
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid Input');
		});
	});

	describe('when PaymentAmount is >9999', () => {
		it('should return a fail with message', () => {
			examplePayment.PaymentDetail.PaymentAmount = 10000;
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid Input');
		});
	});

	describe('when PaymentType is not IM, CDN or FPN', () => {
		it('should return a fail with message', () => {
			examplePayment.PenaltyType = 'FPX';
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid Input');
		});
	});

	describe('when PenaltyStatus is not PAID or UNPAID', () => {
		it('should return a fail with message', () => {
			examplePayment.PenaltyType = 'PENDING';
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid Input');
		});
	});

	describe('when PenaltyReference contains anything other than numbers', () => {
		it('should return a fail with message', () => {
			examplePayment.PenaltyReference = 'ABC-123!XYZ-123';
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid Input');
		});
	});

	describe('when PenaltyReference less than 12 characters', () => {
		it('should return a fail with message', () => {
			examplePayment.PenaltyReference = '12345678901';
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid Input');
		});
	});
	describe('when PenaltyReference greater than 13', () => {
		it('should return a fail with message', () => {
			examplePayment.PenaltyReference = '12345678901234';
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid Input');
		});
	});

	describe('when IM 7th number must be 1 or 0', () => {
		it('should return a fail with message', () => {
			examplePayment.PenaltyReference = '1234567123456';
			examplePayment.PenaltyType = 'IM';
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid Payment Reference');
		});
	});

	describe('when UNPAID PenaltyStatus and payment details not {}', () => {
		it('should return a fail with message', () => {
			examplePayment.PenaltyStatus = 'UNPAID';
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('PaymentDetail must be empty {} when status is UNPAID');
		});
	});

	describe('when PAID PenaltyStatus and payment details {}', () => {
		it('should return a fail with message', () => {
			examplePayment.PenaltyStatus = 'PAID';
			examplePayment.PaymentDetail = {};
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('PaymentDetail must be populated when status is PAID');
		});
	});

	describe('when UNPAID PenaltyStatus and payment details are {}', () => {
		it('should return as valid', () => {
			examplePayment.PenaltyStatus = 'UNPAID';
			examplePayment.PaymentDetail = {};
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(true);
		});
	});

	describe('when PAID and no payment method', () => {
		it('should return valid set to false', () => {
			examplePayment.PaymentDetail.PaymentMethod = '';
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid Input');
		});
	});

	describe('when PAID and payment method CASH', () => {
		it('should return valid set to true', () => {
			examplePayment.PaymentDetail.PaymentMethod = 'CASH';
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(true);
		});
	});

	describe('when PAID and payment method CHEQUE', () => {
		it('should return valid set to true', () => {
			examplePayment.PaymentDetail.PaymentMethod = 'CHEQUE';
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(true);
		});
	});

	describe('when PAID and payment method CARD', () => {
		it('should return valid set to true', () => {
			examplePayment.PaymentDetail.PaymentMethod = 'CARD';
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(true);
		});
	});

	describe('when PAID and payment method POSTAL', () => {
		it('should return valid set to true', () => {
			examplePayment.PaymentDetail.PaymentMethod = 'POSTAL';
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(true);
		});
	});

	describe('when PAID and payment method Not one of the options', () => {
		it('should return valid set to false', () => {
			examplePayment.PaymentDetail.PaymentMethod = 'NONSENSE';
			const retObj = paymentValidation(examplePayment);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid Input');
		});
	});

	describe('when PaymentRef contains hyphens', () => {
		it('should return valid set to true', () => {
			examplePayment.PaymentDetail.PaymentRef = 'ECMS-01-20190131-151909-F38F9FC5';
			const { valid } = paymentValidation(examplePayment);
			expect(valid).toBe(true);
		});
	});

	describe('when PaymentRef is invalid', () => {
		it('should return valid set to false', () => {
			examplePayment.PaymentDetail.PaymentRef = 'ecms-01-20190131-151909-f38f9fc5';
			const { valid, error } = paymentValidation(examplePayment);
			expect(valid).toBe(false);
			expect(error.message).toBe('Invalid Input');
		});
	});

	describe('when auth code is invalid', () => {
		it('should return valid set to false', () => {
			examplePayment.PaymentDetail.AuthCode = '<invalid />';
			const { valid, error } = paymentValidation(examplePayment);
			expect(valid).toBe(false);
			expect(error.message).toBe('Invalid Input');
		});
	});
});
