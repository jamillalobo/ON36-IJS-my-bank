import {
  Controller,
  Param,
  Patch,
  Body,
  Post,
  Delete,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account } from '../../application/domain/models/account.interface.model';
import { AccountType } from '../../application/domain/enums/accountType.enum';
import { SavingsAccount } from '../../application/domain/models/savings-account';
import { CurrentAccount } from '../../application/domain/models/current-account';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  createAccount(
    @Body('id_client') idClient: number,
    @Body('id_manager') idManager: number,
    @Body('balance') balance: number,
    @Body('type') type: AccountType,
    @Body('rate') rate?: number,
    @Body('overDraftLimit') overDraftLimit?: number
  ): SavingsAccount | CurrentAccount {
    
    return this.accountsService.createAccount(
      idClient,
      idManager,
      balance,
      type,
      rate,
      overDraftLimit
    );
  }

  @Get()
  findAllAccounts(): Account[] {
    return this.accountsService.getAccounts();
  }

  @Get(':id')
  findClientById(@Param('id', ParseIntPipe) id: number): Account {
    return this.accountsService.getAccountById(id);
  }

  @Patch(':id/update-type-account')
  updateAccountType(
    @Param('id', ParseIntPipe) id: number,
    @Body('newType') newType: AccountType,
  ): void {
    return this.accountsService.updateAccountType(id, newType);
  }

  @Delete(':id')
  deleteManager(@Param('id', ParseIntPipe) id: number): void {
    return this.accountsService.deleteAccount(id);
  }
}
