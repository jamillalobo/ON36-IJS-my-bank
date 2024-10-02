import { forwardRef, Module } from '@nestjs/common';
import { AccountsController } from './adapters/http/accounts.controller';
import { AccountsService } from './application/outboundPorts/accounts.service';
import { AccountFactory } from './domain/factories/account.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { ManagersModule } from 'src/managers/managers.module';
import { TransactionModule } from 'src/transactions/transaction.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    ClientsModule,
    ManagersModule,
    forwardRef(() => TransactionModule), // Use forwardRef no AccountsModule também
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}