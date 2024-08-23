import { Client } from 'src/clients/application/domain/model/client.model';
import { AccountType } from '../enums/accountType.enum';
import { Account } from './account.interface.model';
import { Manager } from 'src/managers/application/domain/model/manager.model';

export class CurrentAccount implements Account {
  type = AccountType.CURRENT;

  constructor(
    public idAccount: number,
    public idClient: Client["id"],
    public idManager: Manager["id"],
    public balance: number,
    public rate: number,
  ) {}

  getBalance(): number {
    return this.balance
  }
  
  deposit(value: number): void {
    this.balance += value;
  }

  withdraw(value: number): void {
    if (value <= this.balance){
      this.balance -= value
      return;
    };
    throw new Error('Saldo insuficiente para saque');
  }

  transfer(destiny: Account, value: number): void {
    if (value <= this.balance) {
      this.withdraw(value);
      destiny.deposit(value);
      return;
    }
    throw new Error('Saldo insuficiente para transferencia');
  }
}
