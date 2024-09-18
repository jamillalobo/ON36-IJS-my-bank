import { Injectable } from "@nestjs/common";
import { TransactionType } from "../enums/transactionType.enum";
import { TransactionEntity } from "../entities/transaction.entity";
import { Account } from "src/accounts/domain/models/account.model";
import { AccountEntity } from "src/accounts/entities/account.entity";

@Injectable()
export class TransactionFactory {
    static createTransaction(
        account: AccountEntity,
        amount: number
    ): TransactionEntity {
        const newTransaction = new TransactionEntity();
        newTransaction.account = account;
        newTransaction.amount = amount;
        newTransaction.type = TransactionType.DEBIT;
        newTransaction.date = new Date();
        return newTransaction;
    }

}