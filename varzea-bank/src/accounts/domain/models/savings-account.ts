import { AccountType } from "../enums/accountType.enum";
import { Account } from "./account.model";
import { AccountEntity } from "../entities/account.entity";

export class SavingsAccount extends AccountEntity {
    type = AccountType.SAVINGS

    constructor(
        public idAccount: string,
        public idClient: string,
        public idManager: string,
        public balance: number,
        public overDraftLimit: number,
    ){
      super();
    }

    getBalance(): number {
        return this.balance + this.overDraftLimit;
      }
      
      deposit(value: number): void {
        this.balance += value;
      }
    
      withdraw(value: number): void {
        if (value <= this.balance){
          this.balance -= value;
          return;
        };
        throw new Error('Saldo insuficiente para saque');
      }
    
      transfer(destiny: Account, value: number): void {
        if (value <= this.getBalance()) {
          this.withdraw(value);
          destiny.deposit(value);
          return;
        }
        throw new Error('Saldo insuficiente para transferencia');
      }
}