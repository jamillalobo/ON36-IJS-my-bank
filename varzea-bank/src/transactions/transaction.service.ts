// import { Injectable } from '@nestjs/common';
// import * as path from 'path';
// import * as fs from 'fs';
// import { TransactionFactory } from './factories/transaction.factory';
// import { AccountsService } from 'src/accounts/accounts.service';
// import { Transaction } from './models/transaction.model';

// @Injectable()
// export class TransactionService {
//     private readonly filePath = path.resolve('src/accounts/data/transaction.json');
//     idCounter: number;

//     constructor(
//         private readonly AccountDervice: AccountsService,
//     ) {}

//     private readTransactions() : Transaction[] {
//         const data = fs.readFileSync(this.filePath, 'utf8');
//         return JSON.parse(data) as Transaction[];
//     }

//     private writeTransaction(transactions: Transaction[]): void {
//         fs.writeFileSync(this.filePath, JSON.stringify(transactions, null, 2), 'utf8');
//     }

//     transfer() {}

//     deposit() {}

//     withdraw() {}

// }
