class CurrentAccount extends Account {
  overdraftLimit: number;

  constructor(overdraftLimit: number) {
    super();
    this.overdraftLimit = overdraftLimit;
  }

  transfer(value: number, account: Account): void {
    if (this.balance - value < -this.overdraftLimit) {
      console.log("Insufficient funds");
      return;
    }
    this.balance -= value;
    account.balance += value;
  }

  withdraw(value: number): void {
    if (this.balance - value < -this.overdraftLimit) {
      console.log("Insufficient funds");
      return;
    }
    this.balance -= value;
  }

  deposit(value: number): void {
    this.balance += value;
  }

  updateBalance(): void {
    this.balance += this.balance * this.overdraftLimit;
  }
}
