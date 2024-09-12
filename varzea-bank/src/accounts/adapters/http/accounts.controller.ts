// import {
//   Controller,
//   Param,
//   Patch,
//   Body,
//   Post,
//   Delete,
//   ParseIntPipe,
//   Get,
//   Res,
//   HttpStatus,

// } from '@nestjs/common';
// import { AccountsService } from '../../application/outboundPorts/accounts.service';
// import { Account } from '../../domain/models/account.interface.model';
// import { AccountType } from '../../domain/enums/accountType.enum';
// import { SavingsAccount } from '../../domain/models/savings-account';
// import { CurrentAccount } from '../../domain/models/current-account';
// import { CreateAccountDto } from './dto/create-account.dto';

// @Controller('accounts')
// export class AccountsController {
//   constructor(private readonly accountsService: AccountsService) {}

//   @Post()
//   async createAccount(
//     @Res() response, 
//     @Body() createAccountDto: CreateAccountDto,
//   ) {
//     const newAccount = await this.accountsService.createAccount(createAccountDto);
//     return response.status(HttpStatus.CREATED).json({
//       message: 'Product has been created successfully',
//       newAccount});
//   }

//   @Get()
//   findAllAccounts(): Account[] {
//     return this.accountsService.getAccounts();
//   }

//   @Get(':id')
//   findClientById(@Param('id', ParseIntPipe) id: number): Account {
//     return this.accountsService.getAccountById(id);
//   }

//   @Patch(':id/update-type-account')
//   updateAccountType(
//     @Param('id', ParseIntPipe) id: number,
//     @Body('newType') newType: AccountType,
//   ): void {
//     return this.accountsService.updateAccountType(id, newType);
//   }

//   @Delete(':id')
//   deleteManager(@Param('id', ParseIntPipe) id: number): void {
//     return this.accountsService.deleteAccount(id);
//   }
// }
