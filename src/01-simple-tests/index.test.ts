// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Add })).toBe(5);
    expect(simpleCalculator({ a: -2, b: -3, action: Action.Add })).toBe(-5);
    expect(simpleCalculator({ a: -5, b: 3, action: Action.Add })).toBe(-2);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Subtract })).toBe(-1);
    expect(simpleCalculator({ a: -2, b: -3, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: 5, b: 3, action: Action.Subtract })).toBe(2);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Multiply })).toBe(6);
    expect(simpleCalculator({ a: -2, b: -3, action: Action.Multiply })).toBe(6);
    expect(simpleCalculator({ a: -2, b: 3, action: Action.Multiply })).toBe(-6);
    expect(simpleCalculator({ a: -2, b: 0, action: Action.Multiply })).toBe(-0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 2, action: Action.Divide })).toBe(3);
    expect(simpleCalculator({ a: -6, b: 2, action: Action.Divide })).toBe(-3);
    expect(simpleCalculator({ a: -6, b: -2, action: Action.Divide })).toBe(3);
    expect(simpleCalculator({ a: -6, b: 0, action: Action.Divide })).toBe(
      Number.NEGATIVE_INFINITY,
    );
    expect(simpleCalculator({ a: 6, b: 4, action: Action.Divide })).toBe(1.5);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate })).toBe(
      4,
    );
    expect(simpleCalculator({ a: -2, b: 2, action: Action.Exponentiate })).toBe(
      4,
    );
    expect(simpleCalculator({ a: -2, b: 3, action: Action.Exponentiate })).toBe(
      -8,
    );
    expect(simpleCalculator({ a: 6, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(simpleCalculator({ a: -6, b: 0, action: Action.Exponentiate })).toBe(
      1,
    );
    expect(
      simpleCalculator({ a: 9, b: 0.5, action: Action.Exponentiate }),
    ).toBe(3);
    expect(simpleCalculator({ a: 2, b: -1, action: Action.Exponentiate })).toBe(
      0.5,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 6, b: 0, action: 'lg' })).toBe(null);
    expect(simpleCalculator({ a: 6, b: 0, action: 5 })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '6', b: 2, action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: 6, b: '2', action: Action.Add })).toBe(null);
  });
});
