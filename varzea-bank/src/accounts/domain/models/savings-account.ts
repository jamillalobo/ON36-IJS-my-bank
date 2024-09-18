import { AccountType } from "../enums/accountType.enum";
import { Account } from "./account.model";
import { AccountEntity } from "../../entities/account.entity";
import { Transaction } from "src/transactions/domain/models/transaction.model";
import { Manager } from '../../../managers/domain/manager.model';
import { Client } from "src/clients/domain/client.model";

export class SavingsAccount extends AccountEntity {
    type = AccountType.SAVINGS

    constructor(
        public idAccount: string,
        public client: Client,
        public manager: Manager,
        public balance: number,
        public overDraftLimit: number,
        public transactions: Transaction[]
    ){
      super();
    }

    // getBalance(): number {
    //     return this.balance + this.overDraftLimit;
    //   }
      
    //   deposit(value: number): void {
    //     this.balance += value;
    //   }
    
    //   withdraw(value: number): void {
    //     if (value <= this.balance){
    //       this.balance -= value;
    //       return;
    //     };
    //     throw new Error('Saldo insuficiente para saque');
    //   }
    
    //   transfer(destiny: Account, value: number): void {
    //     if (value <= this.getBalance()) {
    //       this.withdraw(value);
    //       destiny.deposit(value);
    //       return;
    //     }
    //     throw new Error('Saldo insuficiente para transferencia');
    //   }
}