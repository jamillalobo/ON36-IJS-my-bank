import { Client } from '../../../clients/domain/client.model';
import { AccountType } from '../enums/accountType.enum';
import { Account } from './account.model';
import { Manager } from '../../../managers/domain/manager.model';
import { AccountEntity } from '../../entities/account.entity';
import { Transaction } from 'src/transactions/domain/models/transaction.model';

export class CurrentAccount extends AccountEntity {
  type = AccountType.CURRENT;

  constructor(
    public idAccount: string,
    public client: Client,
    public manager: Manager,
    public balance: number,
    public rate: number,
    public transactions: Transaction[]
  ) {
    super();
  }

  // getBalance(): number {
  //   return this.balance
  // }
  
  // deposit(value: number): void {
  //   this.balance += value;
  // }

  // withdraw(value: number): void {
  //   if (value <= this.balance){
  //     this.balance -= value
  //     return;
  //   };
  //   throw new Error('Saldo insuficiente para saque');
  // }

  // transfer(destiny: Account, value: number): void {
  //   if (value <= this.balance) {
  //     this.withdraw(value);
  //     destiny.deposit(value);
  //     return;
  //   }
  //   throw new Error('Saldo insuficiente para transferencia');
  // }
}
