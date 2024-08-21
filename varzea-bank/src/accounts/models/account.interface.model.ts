import { AccountType } from '../enums/accountType.enum';

export interface Account {
  idAccount: number;
  idClient: number;
  idManager: number;
  balance: number;
  type: AccountType;

  getBalance(): number;
  deposit(value: number): void;
  withdraw(value: number): void;
  transfer(destine: Account, value: number): void;
}
