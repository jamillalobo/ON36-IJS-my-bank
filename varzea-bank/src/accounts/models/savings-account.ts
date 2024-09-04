import { AccountType } from "../enums/accountType.enum";
import { Account } from "./account.interface";

export class SavingsAccount implements Account {
    type = AccountType.SAVINGS
    constructor(
        public id: number,
        public idClient: number,
        public idManager: number,
        public balance: number,
        public overDraftLimit: number
    ){}
}