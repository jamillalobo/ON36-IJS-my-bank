import { Account } from '../domain/models/account.interface.model';
import { AccountRepository } from '../inboundPorts/account.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from './accounts.service';
import { AccountFactory } from '../domain/factories/account.factory';
import { CurrentAccount } from '../domain/models/current-account';
import { AccountType } from '../domain/enums/accountType.enum';
import { SavingsAccount } from '../domain/models/savings-account';

const mockedAccount = new SavingsAccount(12, 2, 3, 1000, 0.2);

describe('AccountsService', () => {
  test('should create an account', () => {

  const accountRepository = new AccountRepository();
  const accountService = new AccountsService(accountRepository);

  const esperado = new CurrentAccount(3, 1, 2, 1000, 0.2);

  const resultado = accountService.createAccount(1000, 1, 2, AccountType.CURRENT, 0.2)

  expect(resultado).toStrictEqual(esperado);
  })

  test('should find accounts', () => {
    const accountRepository = new AccountRepository();
    const accountService = new AccountsService(accountRepository);

    const esperado = accountRepository.readAccounts();

    const resultado = accountService.getAccounts();

    expect(resultado).toStrictEqual(esperado);
  })

  test('should find account by id', () => {
    const accountRepository = new AccountRepository();
    jest.spyOn(accountRepository, 'readAccounts').mockReturnValue([mockedAccount]);
  
    const accountService = new AccountsService(accountRepository);
  
    const esperado = mockedAccount;
    
    const resultado = accountService.getAccountById(12);
  
    expect(resultado).toStrictEqual(esperado);
  })

  test('should delete an account', () => {

    const accountRepository = new AccountRepository();
    jest.spyOn(accountRepository, 'readAccounts').mockReturnValue([mockedAccount]);

    const esperado = jest.spyOn(accountRepository, 'writeAccounts').mockImplementation((accounts) => {
      expect(accounts).not.toContain(mockedAccount); 
    });

    const accountService = new AccountsService(accountRepository);

    accountService.deleteAccount(12);

    expect(esperado).toHaveBeenCalledWith([])
  })

});
