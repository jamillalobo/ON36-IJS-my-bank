import { Client } from '../../../clients/domain/client.model';
import { AccountType } from '../enums/accountType.enum';
import { Manager } from '../../../managers/domain/manager.model';

export class Account {
  idAccount: string;
  idClient: string; 
  idManager: string; 
  balance: number;
  type: AccountType;

  getBalance(): void {};
  deposit(value: number): void {};
  withdraw(value: number): void  {};
  transfer(destiny: Account, value: number): void {};
}
