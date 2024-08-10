import { Injectable } from "@nestjs/common";
import { AccountType } from "../enums/accountType.enum";
import { Account } from "../models/account.interface.model";
import { CurrentAccount } from "../models/current-account";
import { SavingsAccount } from "../models/savings-account";


@Injectable()
export class AccountFactory {
    static createAccount(
        type: AccountType, 
        idAccount: number,
        idClient: number,
        idManager: number,
        balance: number,
        rate?: number,
        overDraftLimit?: number
    ): CurrentAccount | SavingsAccount {
        switch (type) {
            case AccountType.CURRENT:
                return new CurrentAccount(idAccount, idClient, idManager, balance, rate);
            case AccountType.SAVINGS:
                return new SavingsAccount(idAccount, idClient, idManager, balance, overDraftLimit);
            default:
                throw new Error('Invalid account type');
        }
    }
    
}