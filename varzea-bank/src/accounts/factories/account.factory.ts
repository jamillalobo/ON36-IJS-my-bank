import { Injectable } from "@nestjs/common";
import { AccountType } from "../enums/accountType.enum";
import { Account } from "../models/account.interface";
import { CurrentAccount } from "../models/current-account";
import { SavingsAccount } from "../models/savings-account";


@Injectable()
export class AccountFactory {
    createAccount(
        type: AccountType, 
        id: number,
        idClient: number,
        idManager: number,
        balance: number,
        rate?: number,
        overDraftLimit?: number
    ): Account {
        switch (type) {
            case AccountType.CURRENT:
                return new CurrentAccount(id, idClient, idManager,balance, rate);
            case AccountType.SAVINGS:
                return new SavingsAccount(id, idClient, idManager,balance, overDraftLimit);
            default:
                throw new Error('Invalid account type');
        }
    }
}