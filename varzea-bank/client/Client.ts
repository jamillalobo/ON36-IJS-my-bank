class Client {
  name: string;
  idClient: string;
  address: string;
  phone: string;
  account: Account[];

  constructor(name: string, idClient: string, address: string, phone: string) {
    this.name = name;
    this.idClient = idClient;
    this.address = address;
    this.phone = phone;
    this.account = [];
  }

  addAccount(account: Account): void {
    this.account.push(account);
  }
}
