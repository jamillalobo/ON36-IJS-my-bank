import { AccountType } from '../enums/accountType.enum';
import { Account } from './account.interface.model';

export class CurrentAccount implements Account {
  type = AccountType.CURRENT;

  constructor(
    public idAccount: number,
    public idClient: number,
    public idManager: number,
    public balance: number,
    public rate: number,
  ) {}
}
