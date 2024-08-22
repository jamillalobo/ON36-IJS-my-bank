import { Client } from 'src/clients/model/client.model';
import { AccountType } from '../enums/accountType.enum';
import { Manager } from 'src/managers/model/manager.model';

export interface Account {
  idAccount: number;
  idClient: Client["id"];
  idManager: Manager["id"];
  balance: number;
  type: AccountType;

  getBalance(): number;
  deposit(value: number): void;
  withdraw(value: number): void;
  transfer(destiny: Account, value: number): void;
}
