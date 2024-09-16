import { Module } from '@nestjs/common';
import { TransactionController } from './adapters/http/transaction.controller';
import { TransactionService } from './application/outbounfPorts/transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService]
})
export class TransactionModule {}
