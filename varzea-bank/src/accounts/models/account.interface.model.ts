import { AccountType } from '../enums/accountType.enum';

export interface Account {
  overdraftLimit(overdraftLimit: any): unknown;
  idAccount: number;
  idClient: number;
  idManager: number;
  balance: number;
  type: AccountType;
}
