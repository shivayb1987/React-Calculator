import CalculatorPanel from '../src/panels/CalculatorPanel';
var calculator = new CalculatorPanel();
import { expect } from 'chai';

describe('when dividing 2 non-zero numbers', () => {
	it('should divide and return the result', () => {
		expect(calculator.divide(4, 2)).to.equal(2);
	});

	it('should return undefined', () => {
		expect(calculator.divide(4, 0)).to.equal(undefined);
	})
});

describe('when multiplying 2 non-zero numbers', () => {
	it('should multiply and return the result', () => {
		expect(calculator.multiply(4, 2)).to.equal(8);
	})
});

describe('when subtracting 2 non-zero numbers', () => {
	it('should subtract and return the result', () => {
		expect(calculator.subtract(4, 2)).to.equal(2);
	})
});

describe('when adding 2 non-zero numbers', () => {
	it('should add and return the result', () => {
		expect(calculator.add(4, 2)).to.equal(6);
	})
});