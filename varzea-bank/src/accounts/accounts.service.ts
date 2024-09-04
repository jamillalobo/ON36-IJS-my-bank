import { AccountFactory } from './factories/account.factory';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './models/account.interface';
import * as path from 'path';
import * as fs from 'fs';
import { AccountType } from './enums/accountType.enum';

@Injectable()
export class AccountsService {
  private readonly filePath = path.resolve('src/accounts/data/accounts.json');
  idCounter: number;

  constructor(
    private readonly AccountFactory: AccountFactory,
  ) {
    const accounts = this.readAccounts();
    this.idCounter = accounts.length > 0 ? accounts[accounts.length - 1].id + 1 : 1;
  }

  public readAccounts(): Account[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Account[];
  }

  public writeAccounts(accounts: Account[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8');
  }

  createAccount(
    balance: number,
    idClient: number,
    idManager: number,
    type: AccountType,
    rate?: number,
    overDraftLimit?: number
  ): Account {
    const accounts = this.readAccounts();
    let newAccount: Account;

    if (type === AccountType.CURRENT) {
      newAccount = this.AccountFactory.createAccount(
        type,
        this.idCounter,
        idClient,
        idManager,
        balance,
        rate
      );
    } else if (type === AccountType.SAVINGS) {
      newAccount = this.AccountFactory.createAccount(
        type,
        this.idCounter,
        idClient,
        idManager,
        balance,
        overDraftLimit
      );
    }
  
    if (newAccount) {
      accounts.push(newAccount);
      this.writeAccounts(accounts);
    }
  
    return newAccount;
  }

  getAccounts(): Account[] {
    return this.readAccounts();
  }

  getAccountById(id: number): Account {
    const accounts = this.readAccounts();
    const account = accounts.find((account) => account.id === id)

    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    return account    
  }

  updateAccountType(id: number, newType: AccountType): void {
    const accounts = this.readAccounts();
    const accountIndex = accounts.findIndex(
      (account) => account.id === Number(id),
    );

    if (accountIndex !== -1) {
      accounts[accountIndex].type = newType;
      this.writeAccounts(accounts);
    } else {
      console.error(`Account with ID ${id} not found.`);
    }
  }

  deleteAccount(id: number): void {
    const accounts = this.readAccounts();
    const accountIndex = accounts.findIndex(
      (account) => account.id === Number(id),
    );

    accounts.splice(accountIndex, 1);
  }
}
