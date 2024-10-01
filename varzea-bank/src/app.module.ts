import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { ManagersModule } from './managers/managers.module';
import { ClientsModule } from './clients/clients.module';
import { TransactionModule } from './transactions/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm'; 

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    port: 6543,
    username:'postgres.keayxzddqngmykidpcby',
    password: 'postgres12345@',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
    retryAttempts: 5,                  
    retryDelay: 3000,  
    logging: true,
  }), 
    TransactionModule, AccountsModule, ManagersModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
