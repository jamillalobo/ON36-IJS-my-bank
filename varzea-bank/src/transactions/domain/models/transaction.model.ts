import { TransactionType } from "../enums/transactionType.enum";

export class Transaction {
  constructor(
    public idTransaction: string,
    public idAccount: string,
    public amount: number,
    public type: TransactionType,
    public date: Date,
  ) {}
}
