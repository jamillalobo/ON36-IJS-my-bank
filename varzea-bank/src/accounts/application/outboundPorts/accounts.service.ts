// import { CurrentAccount } from '../../domain/models/current-account';
// import { AccountRepository } from '../inboundPorts/account.repository';
// import { AccountFactory } from '../../domain/factories/account.factory';
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { Account } from '../../domain/models/account.interface.model';
// import { AccountType } from '../../domain/enums/accountType.enum';
// import { SavingsAccount } from '../../domain/models/savings-account';
// import { Repository } from 'typeorm';

// @Injectable()
// export class AccountsService {
//   constructor(
//     private readonly accountRepository: Repository<Account>,
//   ) {  }

//   createAccount(
//     balance: number,
//     idClient: number,
//     idManager: number,
//     type: AccountType,
//     rate?: number,
//     overDraftLimit?: number
//   ): SavingsAccount | CurrentAccount {
//     const accounts = this.accountRepository.readAccounts();
//     let newAccount: SavingsAccount | CurrentAccount;

//     if (type === AccountType.CURRENT) {
//       newAccount = AccountFactory.createAccount(
//         type,
//         idClient,
//         idManager,
//         balance,
        
//       ) as CurrentAccount;
//     } 
    
//     if (type === AccountType.SAVINGS) {
//       newAccount = AccountFactory.createAccount(
//         type,
//         this.idCounter,
//         idClient,
//         idManager,
//         balance,
//         overDraftLimit, 
//       ) as SavingsAccount;
//     }
  
//     if (newAccount) {
//       accounts.push(newAccount);
//       this.accountRepository.writeAccounts(accounts); // Save the new account
//     }
  
//     return newAccount;
//   }
//   // validacoes da criacao de negocio

//   getAccounts(): Account[] {
//     return this.accountRepository.readAccounts();
//   }

//   getAccountById(id: number): Account {
//     const accounts = this.accountRepository.readAccounts();
//     const account = accounts.find((account) => account.idAccount === id)

//     if (!account) {
//       throw new NotFoundException(`Account with id ${id} not found`);
//     }
//     return account    
//   }

//   //metodo atualizar permanece no service por questoes de validacao
//   updateAccountType(id: number, newType: AccountType): void {
//     const accounts = this.accountRepository.readAccounts();
//     const accountIndex = accounts.findIndex(
//       (account) => account.idAccount === Number(id),
//     );

//     if (accountIndex !== -1) {
//       accounts[accountIndex].type = newType;
//       this.accountRepository.writeAccounts(accounts);
//     } else {
//       console.error(`Account with ID ${id} not found.`);
//     }
//   }
  
//   deleteAccount(id: number): void {
//     const accounts = this.accountRepository.readAccounts();
//     const accountIndex = accounts.findIndex(
//       (account) => account.idAccount === Number(id),
//     );

//     if (accountIndex === -1) {
//       throw new NotFoundException(`Account with id ${id} not found`);
//     }

//     accounts.splice(accountIndex, 1);

//     this.accountRepository.writeAccounts(accounts);
//   }
// }

// descomentar e resolver a account service 