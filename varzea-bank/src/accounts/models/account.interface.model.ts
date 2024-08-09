import { AccountType } from '../enums/accountType.enum';

export interface Account {
  idAccount: number;
  idClient: number;
  idManager: number;
  balance: number;
  type: AccountType;
}
