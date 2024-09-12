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
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
  }), 
    TransactionModule, AccountsModule, ManagersModule, ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
