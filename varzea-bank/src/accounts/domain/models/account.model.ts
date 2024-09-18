import { Transaction } from './../../../transactions/domain/models/transaction.model';
import { Client } from '../../../clients/domain/client.model';
import { AccountType } from '../enums/accountType.enum';
import { Manager } from '../../../managers/domain/manager.model';

export class Account {
  id: string;
  balance: number;
  type: AccountType;
  client: Client; 
  manager: Manager; 
  transactions: Transaction[];

  // getBalance(): void {};
  // deposit(value: number): void {};
  // withdraw(value: number): void  {};
  // transfer(destiny: Account, value: number): void {};
}
