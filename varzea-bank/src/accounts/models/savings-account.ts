import { AccountType } from "../enums/accountType.enum";
import { Account } from "./account.interface.model";

export class SavingsAccount implements Account {
    type = AccountType.SAVINGS
    constructor(
        public idAccount: number,
        public idClient: number,
        public idManager: number,
        public balance: number,
        public overDraftLimit: number
    ){}
}