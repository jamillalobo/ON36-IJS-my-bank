import { Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import { Account } from "../../domain/models/account.interface.model";

@Injectable()
export class AccountRepository {

    private readonly filePath = path.resolve('src/accounts/data/accounts.json');
    
    public readAccounts(): Account[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Account[];
      }
    
    public writeAccounts(accounts: Account[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(accounts, null, 2), 'utf8');
      }

    

    // public saveAccount(account: Account): Promise<Account>;



    // public listAccounts(): Promise<Account[]>;
}