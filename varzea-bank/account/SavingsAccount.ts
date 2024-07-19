class SavingsAccount extends Account {
  rate: number;

  constructor(rate: number) {
    super();
    this.rate = rate;
  }

  withdraw(value: number): void {
    if (this.balance < value) {
      console.log("Insufficient funds");
      return;
    }
    this.balance -= value;
  }

  deposit(value: number): void {
    this.balance += value;
  }

  transfer(value: number, account: Account): void {
    if (this.balance < value) {
      console.log("Insufficient funds");
      return;
    }

    this.balance -= value;
    account.balance += value;
  }

  updateBalance(): void {
    this.balance += this.balance * this.rate;
  }
}
