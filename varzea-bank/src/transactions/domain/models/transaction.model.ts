import { Account } from "src/accounts/domain/models/account.model";
import { TransactionType } from "../enums/transactionType.enum";

export class Transaction {
  constructor(
    public idTransaction: string,
    public accounts: Account[],
    public amount: number,
    public type: TransactionType,
    public date: Date,
  ) {}
}
