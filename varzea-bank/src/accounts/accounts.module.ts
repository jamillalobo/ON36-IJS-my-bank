import { Module } from '@nestjs/common';
// import { AccountsController } from './adapters/http/accounts.controller';
// import { AccountsService } from './application/outboundPorts/accounts.service';
// import { AccountFactory } from '../accounts/domain/factories/account.factory';

@Module({
  // controllers: [AccountsController],
  providers: [/*AccountsService, AccountFactory*/],
  exports: [/*AccountsService, AccountFactory*/],
})
export class AccountsModule {}
