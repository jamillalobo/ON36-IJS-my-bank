export enum TransactionType {
  DEBIT = 'debit',
  CREDIT = 'credit',
  LOAN = 'loan',
}

export class Transaction {
  constructor(
    public id: string,
    public idAccount: string,
    public amount: number,
    public type: TransactionType,
    public date: Date,
  ) {}
}
