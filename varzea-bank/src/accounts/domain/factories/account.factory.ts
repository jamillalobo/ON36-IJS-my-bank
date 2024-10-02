import { Injectable } from "@nestjs/common";
import { AccountType } from "../enums/accountType.enum";
import { CurrentAccount } from "../models/current-account";
import { SavingsAccount } from "../models/savings-account";
import { AccountEntity } from '../../entities/account.entity';
import { ClientEntity } from 'src/clients/entity/client.entity';
import { ManagerEntity } from 'src/managers/entity/manager.entity';
import { TransactionEntity } from "src/transactions/domain/entities/transaction.entity";


@Injectable()
export class AccountFactory {
    static createAccount(
        account: AccountEntity,
        client: ClientEntity,
        manager: ManagerEntity,
    ): CurrentAccount | SavingsAccount {
        switch (account.type) {
            case AccountType.SAVINGS:
                return new SavingsAccount(
                    account.id,
                    client,
                    manager,
                    account.balance,
                    1000, // overdraftLimit
                    []
                );
            case AccountType.CURRENT:
                return new CurrentAccount(
                    account.id,
                    client,
                    manager,
                    account.balance,
                    0.05, // rate
                    []
                );
            default:
                throw new Error('Invalid account type');
        }
    }
    
}