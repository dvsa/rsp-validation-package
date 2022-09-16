import expect from 'expect';

import penaltyValidation from './penaltyDocuments';

let exampleDocument;

const assertInvalidPenaltyDocument = (doc) => {
	const { valid, error } = penaltyValidation(doc);
	expect(valid).toBe(false);
	expect(error.message).toBe('Invalid Input');
};

describe('penaltyValidation', () => {
	beforeEach(() => {
		exampleDocument = {
			Enabled: true,
			ID: '2514563246555_FPN',
			Offset: 1519310362.891,
			Value: {
				dateTime: 1519257600,
				paymentCodeDateTime: 1519257600,
				siteCode: 5,
				vehicleDetails: {
					regNo: '12212121X',
				},
				referenceNo: '2514563246555',
				nonEndorsableOffence: [],
				penaltyType: 'FPN',
				paymentAuthCode: '1234TBD',
				paymentToken: '750e811603fe2aaf',
				placeWhereIssued: 'Badbury (M4 J15 - Swindon)',
				officerName: 'dvsa.officerfpns@bjss.com',
				penaltyAmount: 2138,
				paymentDate: 1518480000,
				officerID: 'Z7F6yxnw--6DJf4sLsxjg_S-3Gvrl5MxV-1iY7RRNiA',
				paymentStatus: 'PAID',
				inPenaltyGroup: false,
			},
			Hash: 'c3c7581adeec5585e953e2a613c26986ce35a733f17947921cb828749c1aaf22',
			VehicleRegistration: '12212121X',
		};
	});

	describe('when a valid document is passed for validation', () => {
		it('should return valid set to true', () => {
			const retObj = penaltyValidation(exampleDocument);
			expect(retObj.valid).toBe(true);
		});
	});

	describe('when an empty object is passed for validation', () => {
		const penaltyDocument = {};
		it('should return a fail with message', () => {
			assertInvalidPenaltyDocument(penaltyDocument);
		});
	});

	describe('when ID is missing', () => {
		it('should return a fail with message', () => {
			delete exampleDocument.ID;
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when ID is invalid', () => {
		it('should return a fail with message', () => {
			exampleDocument.Value.ID = '56789012387612-FPN';
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when Origin is valid', () => {
		it('should return valid set to true', () => {
			exampleDocument.Origin = 'APP';
			const { valid } = penaltyValidation(exampleDocument);
			expect(valid).toBe(true);
		});
	});

	describe('when Origin is invalid', () => {
		it('should return a fail with message', () => {
			exampleDocument.Origin = 'APP1';
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when Hash is missing', () => {
		it('should return a fail with message', () => {
			delete exampleDocument.Hash;
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when Hash is invalid', () => {
		it('should return a fail with message', () => {
			exampleDocument.Hash = '.invalid.';
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when penaltyType not FPN, CDN or IM', () => {
		it('should return a fail with message', () => {
			exampleDocument.Value.penaltyType = 'XCV';
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when paymentToken is missing', () => {
		it('should return a fail with message', () => {
			delete exampleDocument.Value.paymentToken;
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when paymentToken is invalid', () => {
		it('should return a fail with message', () => {
			exampleDocument.Value.paymentToken = '<invalid />';
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when referenceNo is missing', () => {
		it('should return a fail with message', () => {
			delete exampleDocument.Value.referenceNo;
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when referenceNo is invalid', () => {
		it('should return a fail with message', () => {
			exampleDocument.Value.referenceNo = '<invalid/>';
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when vehicleDetails is missing', () => {
		it('should return a fail with message', () => {
			delete exampleDocument.Value.vehicleDetails;
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});
	describe('when penaltyAmount is missing', () => {
		it('should return a fail with message', () => {
			delete exampleDocument.Value.penaltyAmount;
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});
	describe('when penaltyAmount is <10', () => {
		it('should return a fail with message', () => {
			exampleDocument.Value.penaltyAmount = 9;
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});
	describe('when penaltyAmount is >9999', () => {
		it('should return a fail with message', () => {
			exampleDocument.Value.penaltyAmount = 10000;
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});
	describe('when officerName is missing', () => {
		it('should return a fail with message', () => {
			delete exampleDocument.Value.officerName;
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});
	describe('when officerID is missing', () => {
		it('should return a fail with message', () => {
			delete exampleDocument.Value.officerID;
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when officerID is invalid', () => {
		it('should return a fail with message', () => {
			exampleDocument.Value.officerID = 'inva/id';
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when dateTime is missing', () => {
		it('should return a fail with message', () => {
			delete exampleDocument.Value.dateTime;
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});
	describe('when siteCode is missing', () => {
		it('should return a fail with message', () => {
			delete exampleDocument.Value.siteCode;
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});
	describe('when regNo is missing', () => {
		it('should return a fail with message', () => {
			delete exampleDocument.Value.vehicleDetails.regNo;
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});
	describe('when regNo is greater than 10 characters', () => {
		it('should return a fail with message', () => {
			exampleDocument.Value.vehicleDetails.regNo = 'ABC123DEF45';
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});
	describe('when regNo contains special characters', () => {
		it('should return a fail with message', () => {
			exampleDocument.Value.vehicleDetails.regNo = 'ABC123!';
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});
	describe('when VehicleRegistration is missing', () => {
		it('should return valid set to true', () => {
			delete exampleDocument.VehicleRegistration;
			const { valid } = penaltyValidation(exampleDocument);
			expect(valid).toBe(true);
		});
	});
	describe('when VehicleRegistration is greater than 10 characters', () => {
		it('should return a fail with message', () => {
			exampleDocument.VehicleRegistration = 'ABC123DEF45';
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});
	describe('when VehicleRegistration contains special characters', () => {
		it('should return a fail with message', () => {
			exampleDocument.VehicleRegistration = 'ABC123!';
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when type not IM and  ID does not match referenceNo and penaltyType', () => {
		it('should return a fail with message', () => {
			exampleDocument.ID = '1514563246555_FPN';
			const retObj = penaltyValidation(exampleDocument);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('ID does not match referenceNo and penaltyType');
		});
	});

	describe('when type is  IM and  ID does not match referenceNo and penaltyType', () => {
		it('should return a fail with message', () => {
			exampleDocument.ID = '0000121000012_IM';
			exampleDocument.Value.referenceNo = '13-1-12-IM';
			exampleDocument.Value.penaltyType = 'IM';
			const retObj = penaltyValidation(exampleDocument);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('ID does not match referenceNo and penaltyType');
		});
	});

	describe('when ID is too long', () => {
		it('should return a fail with message', () => {
			exampleDocument.ID = '25145632465558_FPN';
			exampleDocument.Value.referenceNo = '25145632465558';
			const retObj = penaltyValidation(exampleDocument);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('ReferenceNo is too long');
		});
	});

	describe('when type is IM and referenceNo not in correct format', () => {
		it('should return a fail with message', () => {
			exampleDocument.ID = '0000121000012_IM';
			exampleDocument.Value.referenceNo = '121-12-IM';
			exampleDocument.Value.penaltyType = 'IM';
			const retObj = penaltyValidation(exampleDocument);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('ReferenceNo should be 999999-9-999999-IM format');
		});
	});
	describe('when type is IM, format is ok but invalid middle segment', () => {
		it('should return a fail with message', () => {
			exampleDocument.ID = '000012300012_IM';
			exampleDocument.Value.referenceNo = '000012-3-000012-IM';
			exampleDocument.Value.penaltyType = 'IM';
			const retObj = penaltyValidation(exampleDocument);
			expect(retObj.valid).toBe(false);
			expect(retObj.error.message).toBe('Invalid reference No');
		});
	});

	describe('when payment status is invalid', () => {
		it('should return a fail with message', () => {
			exampleDocument.Value.paymentStatus = 'PAYED';
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when payment auth code is invalid', () => {
		it('should return a fail with message', () => {
			exampleDocument.Value.paymentAuthCode = '>123<';
			assertInvalidPenaltyDocument(exampleDocument);
		});
	});

	describe('when paymentStartTime is valid', () => {
		it('should pass validation', () => {
			exampleDocument.Value.paymentStartTime = 1559572341.039;
			const retObj = penaltyValidation(exampleDocument);
			expect(retObj.valid).toBe(true);
		});
	});
});
