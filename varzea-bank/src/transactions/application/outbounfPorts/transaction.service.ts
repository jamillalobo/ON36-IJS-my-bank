import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransactionEntity } from 'src/transactions/domain/entities/transaction.entity';
import { TransactionFactory } from 'src/transactions/domain/factories/transaction.factory';
import { AccountsService } from '../../../accounts/application/outboundPorts/accounts.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionEntity) private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly accountService: AccountsService,
  ) {}

  async createTransaction(idAccount: string, amount: number): Promise<TransactionEntity> {
    const account = await this.accountService.findAccountById(idAccount);
    const newTransaction = TransactionFactory.createTransaction(account, amount);
    await this.transactionRepository.save(newTransaction);
    return newTransaction;
  }

  async getTransactionByAccount(id: string): Promise<TransactionEntity[]> {
    const transactionsByAccount = await this.transactionRepository.find({ where: { account: { id } } });
    
    if (transactionsByAccount.length < 1) {
      throw new NotFoundException('No transactions found for this account');
    }

    return transactionsByAccount;
  }

  async transfer(idAccount: string, amount: number, idAccountDestiny: string) {
    const accountOrigin = await this.accountService.findAccountById(idAccount);
    const accountDestiny = await this.accountService.findAccountById(idAccountDestiny);

    if (accountOrigin.balance < amount) {
      throw new BadRequestException('Insufficient funds');
    }

    accountOrigin.balance -= amount;
    accountDestiny.balance += amount;

    await this.accountService.updateAccount(idAccount, accountOrigin);
    await this.accountService.updateAccount(idAccountDestiny, accountDestiny);

    await this.createTransaction(accountOrigin.id, -amount); 
    await this.createTransaction(accountDestiny.id, amount); 
  }

  async deposit(idAccount: string, amount: number) {
    const account = await this.accountService.findAccountById(idAccount);
    account.balance += amount;

    await this.createTransaction(account.id, amount);
  }

  async withdraw(idAccount: string, amount: number) {
    const account = await this.accountService.findAccountById(idAccount);

    if (account.balance < amount) {
      throw new BadRequestException('Insufficient funds');
    }

    account.balance -= amount;
    await this.accountService.updateAccount(idAccount, account);
    await this.createTransaction(account.id, -amount); // valor negativo para saques
  }
}
