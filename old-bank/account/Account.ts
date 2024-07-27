class Account {
  idAccount: string;
  balance: number; //saldo
  value: number; //valor a inserir

  transfer(value: number, account: Account): void {}

  withdraw(value: number): void {}

  deposit(value: number): void {}
}
