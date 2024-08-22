import { Client } from "src/clients/model/client.model";
import { AccountType } from "../enums/accountType.enum";
import { Account } from "./account.interface.model";
import { Manager } from "src/managers/model/manager.model";

export class SavingsAccount implements Account {
    type = AccountType.SAVINGS

    constructor(
        public idAccount: number,
        public idClient: Client["id"],
        public idManager: Manager["id"],
        public balance: number,
        public overDraftLimit: number,
    ){}

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