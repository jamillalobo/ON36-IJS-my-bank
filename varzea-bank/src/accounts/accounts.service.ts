import { CurrentAccount } from './models/current-account';
import { AccountRepository } from './repository/account.repository';
import { AccountFactory } from './factories/account.factory';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './models/account.interface.model';
import * as path from 'path';
import * as fs from 'fs';
import { AccountType } from './enums/accountType.enum';
import { SavingsAccount } from './models/savings-account';

@Injectable()
export class AccountsService {
  idCounter: number;

  constructor(
    // private readonly AccountFactory: AccountFactory,
    private readonly AccountRepository: AccountRepository,
  ) {
    const accounts = this.AccountRepository.readAccounts();
    this.idCounter = accounts.length > 0 ? accounts[accounts.length - 1].idAccount + 1 : 1;
  }

  createAccount(
    balance: number,
    idClient: number,
    idManager: number,
    type: AccountType,
    rate?: number,
    overDraftLimit?: number
  ): SavingsAccount | CurrentAccount {
    const accounts = this.AccountRepository.readAccounts();
    let newAccount: SavingsAccount | CurrentAccount;

    if (type === AccountType.CURRENT) {
      newAccount = AccountFactory.createAccount(
        type,
        this.idCounter,
        idClient,
        idManager,
        balance,
        rate,
      ) as CurrentAccount;
    } else if (type === AccountType.SAVINGS) {
      newAccount = AccountFactory.createAccount(
        type,
        this.idCounter,
        idClient,
        idManager,
        balance,
        overDraftLimit
      ) as SavingsAccount;
    }
  
    if (newAccount) {
      accounts.push(newAccount);
      this.AccountRepository.writeAccounts(accounts);
    }
  
    return newAccount;
  }

  getAccounts(): Account[] {
    return this.AccountRepository.readAccounts();
  }

  getAccountById(id: number): Account {
    const accounts = this.AccountRepository.readAccounts();
    const account = accounts.find((account) => account.idAccount === id)

    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    return account    
  }

  updateAccountType(id: number, newType: AccountType): void {
    const accounts = this.AccountRepository.readAccounts();
    const accountIndex = accounts.findIndex(
      (account) => account.idAccount === Number(id),
    );

    if (accountIndex !== -1) {
      accounts[accountIndex].type = newType;
      this.AccountRepository.writeAccounts(accounts);
    } else {
      console.error(`Account with ID ${id} not found.`);
    }
  }

  deleteAccount(id: number): void {
    const accounts = this.AccountRepository.readAccounts();
    const accountIndex = accounts.findIndex(
      (account) => account.idAccount === Number(id),
    );

    if (accountIndex === -1) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    accounts.splice(accountIndex, 1);

    this.AccountRepository.writeAccounts(accounts);
  }
}
