import { Client } from '../../../clients/domain/client.model';
import { AccountType } from '../enums/accountType.enum';
import { Manager } from '../../../managers/domain/manager.model';

export interface Account {
  idAccount: number;
  idClient: Client["id"]; // verificar depois se é string ou client(id)
  idManager: Manager["id"]; // verificar depois se é string ou manager(id)
  balance: number;
  type: AccountType;

  getBalance(): number;
  deposit(value: number): void;
  withdraw(value: number): void;
  transfer(destiny: Account, value: number): void;
}
