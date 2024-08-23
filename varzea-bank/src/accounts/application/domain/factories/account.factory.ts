import { Injectable } from "@nestjs/common";
import { AccountType } from "../enums/accountType.enum";
import { Account } from "../models/account.interface.model";
import { CurrentAccount } from "../models/current-account";
import { SavingsAccount } from "../models/savings-account";
import { Client } from "src/clients/application/domain/client.model";
import { Manager } from "src/managers/application/domain/model/manager.model";


@Injectable()
export class AccountFactory {
    static createAccount(
        type: AccountType, 
        idAccount: number, 
        idClient: number, 
        idManager: number,
        balance: number, 
        specificParam: number, 
    ): CurrentAccount | SavingsAccount {
        switch (type) {
            case AccountType.SAVINGS:
                return new SavingsAccount(idAccount, idClient, idManager, balance, specificParam);
            case AccountType.CURRENT:
                return new CurrentAccount(idAccount, idClient, idManager, balance, specificParam);
            default:
                throw new Error('Invalid account type');
        }
    }
    
}