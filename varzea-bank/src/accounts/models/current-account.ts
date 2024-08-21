import { AccountType } from '../enums/accountType.enum';
import { Account } from './account.interface.model';

export class CurrentAccount implements Account {
  type = AccountType.CURRENT;

  constructor(
    public idAccount: number,
    public idClient: number,
    public idManager: number,
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
    throw new Error('Saldo insuficiente');
  }

  transfer(destiny: Account, value: number): void {
    
  }
}
