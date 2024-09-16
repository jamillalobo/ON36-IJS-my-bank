import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransactionEntity } from 'src/transactions/domain/entities/transaction.entity';
import { TransactionFactory } from 'src/transactions/domain/factories/transaction.factory';
import { AccountsService } from '../../../accounts/application/outboundPorts/accounts.service';


@Injectable()
export class TransactionService {
    constructor(
        private readonly transactionRepository: Repository<TransactionEntity>,
        private readonly accountService: AccountsService,
    ) {}

    async createTransaction(idAccount: string, amount: number): Promise<TransactionEntity> {
        const account = await await this.accountService.findAccountById(idAccount);

        const newTransaction = TransactionFactory.createTransaction(account, amount);

        if(newTransaction) {   
            this.transactionRepository.save(newTransaction);
            return newTransaction;
        }
    }

    async transfer(idAccount: string, amount: number, idAccountDestiny: string) {
        const accountOrigin = await this.accountService.findAccountById(idAccount);
        const accountDestiny = await this.accountService.findAccountById(idAccountDestiny);

        if (accountOrigin.balance < amount) {
            throw new Error('Insufficient funds');
        }

        accountOrigin.balance -= amount;
        accountDestiny.balance += amount;

        await this.accountService.updateAccount(idAccount, accountOrigin);
        await this.accountService.updateAccount(idAccountDestiny, accountDestiny);

        this.createTransaction(accountOrigin.id, amount);
        this.createTransaction(accountDestiny.id, amount);
    }

    async deposit(idAccount: string, amount: number) {
        const account = await this.accountService.findAccountById(idAccount);

        account.balance += amount;

        await this.accountService.updateAccount(idAccount, account);

        this.createTransaction(account.id, amount);
    }

    async withdraw(idAccount: string, amount: number) {
        const account = await this.accountService.findAccountById(idAccount);

        if (account.balance < amount) {
            throw new Error('Insufficient funds')
        }

        account.balance -= amount

        this.accountService.updateAccount(idAccount, account)

        this.createTransaction(account.id, amount)
    }
}
