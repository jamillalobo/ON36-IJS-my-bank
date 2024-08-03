import { AccountType } from '../enums/accountType.enum';
import { Account } from './account.interface';

export class CurrentAccount implements Account {
  type = AccountType.CURRENT;

  constructor(
    public id: number,
    public idClient: number,
    public idManager: number,
    public balance: number,

    public rate: number,
  ) {}
}
