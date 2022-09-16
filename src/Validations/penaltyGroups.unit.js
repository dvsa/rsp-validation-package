import expect from 'expect';

import penaltyGroupValidation from './penaltyGroups';
import penaltyGroupSubmissionSample from '../../test/data/penaltyGroupSubmissionSample';

describe('penaltyGroupValidation', () => {
	let penaltyGroup;

	beforeEach(() => {
		penaltyGroup = JSON.parse(JSON.stringify(penaltyGroupSubmissionSample));
	});

	describe('when a valid penalty group passed for validation', () => {
		it('should return valid set to true', () => {
			const validationResult = penaltyGroupValidation(penaltyGroup);
			expect(validationResult.error.message).toBeUndefined();
			expect(validationResult.valid).toBe(true);
		});
	});

	describe('when a blank object passed for validation', () => {
		it('should return valid set to false', () => {
			const validationResult = penaltyGroupValidation({});
			expect(validationResult.valid).toBe(false);
		});
	});

	describe('when null passed for validation', () => {
		it('should return valid set to false', () => {
			const validationResult = penaltyGroupValidation(null);
			expect(validationResult.valid).toBe(false);
		});
	});

	describe('when included penalty doesn\'t match penalty document schema', () => {
		it('should return valid set to false', () => {
			delete penaltyGroup.Penalties[0].ID;
			const validationResult = penaltyGroupValidation(penaltyGroup);
			expect(validationResult.valid).toBe(false);
		});
	});

	describe('when vehicle registration is invalid', () => {
		it('should return valid set to false', () => {
			penaltyGroup.VehicleRegistration = 'FHB, FHBGH';
			const { valid } = penaltyGroupValidation(penaltyGroup);
			expect(valid).toBe(false);
		});
	});

	describe('when paymentStartTime is valid', () => {
		it('should pass validation', () => {
			penaltyGroup.fpnPaymentStartTime = 1559572341.039;
			penaltyGroup.imPaymentStartTime = 1559572341.039;
			penaltyGroup.cdnPaymentStartTime = 1559572341.039;
			const retObj = penaltyGroupValidation(penaltyGroup);
			expect(retObj.valid).toBe(true);
		});
	});
});
