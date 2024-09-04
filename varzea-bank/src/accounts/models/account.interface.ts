import { AccountType } from '../enums/accountType.enum';

export interface Account {
  id: number;
  idClient: number;
  idManager: number;
  balance: number;
  type: AccountType;
}
