import { CreateAccountDto } from './../../adapters/http/dto/create-account.dto';
import { CurrentAccount } from '../../domain/models/current-account';
import { AccountRepository } from '../inboundPorts/account.repository';
import { AccountFactory } from '../../domain/factories/account.factory';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from '../../domain/models/account.model';
import { AccountType } from '../../domain/enums/accountType.enum';
import { SavingsAccount } from '../../domain/models/savings-account';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/accounts/domain/entities/account.entity';
import { ManagerEntity } from 'src/managers/entity/manager.entity';
import { UpdateAccountDto } from 'src/accounts/adapters/http/dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    private readonly accountRepository: Repository<AccountEntity>,
    private readonly managerRepository: Repository<ManagerEntity>,
  ) {  }

  // validacoes da criacao de negocio

  async createAccount(createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    const account = await this.accountRepository.create(createAccountDto) as AccountEntity;

    let newAccount: SavingsAccount | CurrentAccount;

    if (account.type === 'savings') {
        newAccount = AccountFactory.createAccount(
            account,
        ) as SavingsAccount;
    }

    if (account.type === 'current') {
        newAccount = AccountFactory.createAccount(
            account,
        ) as CurrentAccount;
    }

    if (newAccount) {
        this.accountRepository.save(newAccount);
        return newAccount;
    }
}


  async findAllAccounts(): Promise<AccountEntity[]> {
    const accounts = await this.accountRepository.find();

    if (accounts.length === 0 || !accounts) {
      throw new NotFoundException('No accounts found');
    }

    return accounts;
  }

  async findAccountById(id: string): Promise<AccountEntity> {
    const account = this.accountRepository.findOne({ where: {id}});

    if (!account) {
      throw new NotFoundException(`Account not found`);
    }
    return account    
  }

  //metodo atualizar permanece no service por questoes de validacao
  async updateAccount(id: string, updateAccountDto: UpdateAccountDto): Promise<AccountEntity> {
    const updateAccount = await this.accountRepository.update(id, updateAccountDto);

    if (!updateAccount) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    const account = await this.accountRepository.findOne({ where: { id } });

    return account;
  }
  
  deleteAccount(id: string): Promise<AccountEntity> {
    const account = this.accountRepository.findOne({ where: { id } });

    if (!account) {
      throw new NotFoundException(`Account not found`);
    }

    this.accountRepository.delete(id);

    return account;
  }
}
