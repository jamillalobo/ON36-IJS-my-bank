import { Injectable } from "@nestjs/common";
import { TransactionType } from "../enums/transactionType.enum";
import { TransactionEntity } from "../entities/transaction.entity";
import { AccountEntity } from "src/accounts/domain/entities/account.entity";

@Injectable()
export class TransactionFactory {
    static createTransaction(
        account: AccountEntity,
        amount: number
    ): TransactionEntity {
        const newTransaction = new TransactionEntity();
        newTransaction.idAccount = account.id;
        newTransaction.amount = amount;
        newTransaction.type = TransactionType.DEBIT;
        newTransaction.date = new Date();
        return newTransaction;
    }

}