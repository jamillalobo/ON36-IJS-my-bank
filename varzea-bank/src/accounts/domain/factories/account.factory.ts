import { CreateAccountDto } from './../../adapters/http/dto/create-account.dto';
import { Injectable } from "@nestjs/common";
import { AccountType } from "../enums/accountType.enum";
import { Account } from "../models/account.model";
import { CurrentAccount } from "../models/current-account";
import { SavingsAccount } from "../models/savings-account";
import { Client } from "../../../clients/domain/client.model";
import { Manager } from "../../../managers/domain/manager.model";
import { AccountEntity } from '../../entities/account.entity';


@Injectable()
export class AccountFactory {
    static createAccount(
        account: AccountEntity,
    ): CurrentAccount | SavingsAccount {
        switch (account.type) {
            case AccountType.SAVINGS:
                return new SavingsAccount(
                    account.id,
                    account.client,
                    account.manager,
                    account.balance,
                    1000, // overdraftLimit
                    account.transactions
                );
            case AccountType.CURRENT:
                return new CurrentAccount(
                    account.id,
                    account.client,
                    account.manager,
                    account.balance,
                    0.05, // rate
                    account.transactions
                );
            default:
                throw new Error('Invalid account type');
        }
    }
    
}