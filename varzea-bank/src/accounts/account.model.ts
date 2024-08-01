export enum AccountType {
  SAVINGS = 'savings',
  CURRENT = 'current',
}

export class Account {
  constructor(
    public id: number,
    public idClient: number,
    public idManager: number,
    public balance: number,
    public type: AccountType,
  ) {}
}
