import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { ManagersModule } from './managers/managers.module';
import { ClientsModule } from './clients/clients.module';
import { TransactionModule } from './transactions/transaction.module';

@Module({
  imports: [TransactionModule, AccountsModule, ManagersModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
