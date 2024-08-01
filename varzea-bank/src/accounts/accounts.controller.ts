import {
  Controller,
  Param,
  Patch,
  Body,
  Post,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account, AccountType } from './account.model';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  createAccount(
    @Body('id_client') idClient: number,
    @Body('id_manager') idManager: number,
    @Body('balance') balance: number,
    @Body('type') type: AccountType,
  ): Account {
    return this.accountsService.createAccount(
      idClient,
      idManager,
      balance,
      type,
    );
  }

  @Patch(':id/updateAccount')
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
