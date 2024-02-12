import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

describe('BankAccount', () => {
  const initialBalance = 1000;
  let bankAccount = getBankAccount(initialBalance);
  let destinationAccount = getBankAccount(initialBalance);

  beforeAll(() => {
    bankAccount = getBankAccount(initialBalance);
    destinationAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(initialBalance + 1000)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      bankAccount.transfer(initialBalance + 1000, destinationAccount),
    ).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      bankAccount.transfer(initialBalance - 500, bankAccount),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const deposit = 500;
    const currentBalance = bankAccount.getBalance();
    expect(bankAccount.deposit(deposit).getBalance()).toBe(
      currentBalance + deposit,
    );
  });

  test('should withdraw money', () => {
    const withdraw = 200;
    const currentBalance = bankAccount.getBalance();
    expect(bankAccount.withdraw(withdraw).getBalance()).toBe(
      currentBalance - withdraw,
    );
  });

  test('should transfer money', () => {
    const transfer = 200;
    const currentBalance = bankAccount.getBalance();
    expect(
      bankAccount.transfer(transfer, destinationAccount).getBalance(),
    ).toBe(currentBalance - transfer);

    expect(destinationAccount.getBalance()).toBe(initialBalance + transfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockedValue = 400;
    jest.spyOn(lodash, 'random').mockReturnValue(mockedValue);

    const result = await bankAccount.fetchBalance();
    expect(result).toBe(mockedValue);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockedValue = 400;
    jest.spyOn(lodash, 'random').mockReturnValue(mockedValue);

    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(mockedValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mockedValue = 0;
    jest.spyOn(lodash, 'random').mockReturnValue(mockedValue);

    expect(bankAccount.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
