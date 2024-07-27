import { Injectable } from '@nestjs/common';
import { Account, AccountType } from './account.model';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AccountsService {
  private readonly filePath = path.resolve('src/accounts/accounts.json');

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
  ): Account {
    const accounts = this.readAccounts();
    const newAccount: Account = {
      id:
        accounts.length > 0 ? Number(accounts[accounts.length - 1].id) + 1 : 1,
      idClient,
      idManager,
      balance,
      type,
    };

    accounts.push(newAccount);
    this.writeAccounts(accounts);
    return newAccount;
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
