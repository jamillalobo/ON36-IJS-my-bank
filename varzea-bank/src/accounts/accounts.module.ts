import { Module } from '@nestjs/common';
import { AccountsController } from './adapters/http/accounts.controller';
import { AccountsService } from './application/outboundPorts/accounts.service';
import { AccountFactory } from './domain/factories/account.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService, AccountFactory],
  exports: [AccountsService, AccountFactory],
})
export class AccountsModule {}
