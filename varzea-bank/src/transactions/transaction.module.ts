import { Module } from '@nestjs/common';
import { TransactionController } from './adapters/http/transaction.controller';
import { TransactionService } from './application/outbounfPorts/transaction.service';
import { AccountEntity } from '../accounts/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './domain/entities/transaction.entity';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity, AccountEntity]), AccountsModule],
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
