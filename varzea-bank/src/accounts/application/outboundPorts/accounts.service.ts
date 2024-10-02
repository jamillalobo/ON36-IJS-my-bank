import { CreateAccountDto } from './../../adapters/http/dto/create-account.dto';
import { CurrentAccount } from '../../domain/models/current-account';
import { AccountFactory } from '../../domain/factories/account.factory';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from '../../domain/models/account.model';
import { AccountType } from '../../domain/enums/accountType.enum';
import { SavingsAccount } from '../../domain/models/savings-account';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/accounts/entities/account.entity';
import { ManagerEntity } from 'src/managers/entity/manager.entity';
import { UpdateAccountDto } from 'src/accounts/adapters/http/dto/update-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagersService } from 'src/managers/application/outboundPorts/managers.service';
import { ClientsService } from 'src/clients/application/outboundPorts/clients.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>,
    private readonly managerService: ManagersService,
    private readonly clientService: ClientsService,
  ) { }

  async createAccount(createAccountDto: CreateAccountDto): Promise<AccountEntity> {
    // Criar o objeto da conta
    const account = this.accountRepository.create(createAccountDto) as AccountEntity;

    // Buscar cliente e gerente pelo ID
    const client = await this.clientService.findClientById(createAccountDto.idClient);
    const manager = await this.managerService.findManagerById(createAccountDto.idManager);


    // Garantir que os IDs de cliente e gerente estão sendo atribuídos
    account.client = client;
    account.manager = manager;

    let newAccount: SavingsAccount | CurrentAccount;

    // Criar a nova conta com base no tipo
    if (account.type === 'savings') {
      newAccount = AccountFactory.createAccount(account, client, manager) as SavingsAccount;
    }

    if (account.type === 'current') {
      newAccount = AccountFactory.createAccount(account, client, manager) as CurrentAccount;
    }

    if (newAccount) {
      // Salvar a nova conta no banco de dados
      const newAccountEntity = await this.accountRepository.save(account);
      return newAccountEntity;
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
    const account = await this.accountRepository.findOne({ 
      where: { id }, 
      relations: ['transactions'], 
    });
  
    if (!account) {
      throw new NotFoundException('Account not found');
    }
  
    return account;
  }

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
