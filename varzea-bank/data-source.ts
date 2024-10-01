import { AccountEntity } from "src/accounts/entities/account.entity";
import { ClientEntity } from "src/clients/entity/client.entity";
import { ManagerEntity } from "src/managers/entity/manager.entity";
import { TransactionEntity } from "src/transactions/domain/entities/transaction.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'aws-0-sa-east-1.pooler.supabase.com',
    port: 6543,
    username:'postgres.keayxzddqngmykidpcby',
    password: 'postgres12345@',
    database: 'postgres',
    entities: [ManagerEntity, AccountEntity, ClientEntity, TransactionEntity],
    migrations: ['./src/migration/*.ts'],
    synchronize: true, //auto reinicia o banco toda vez que roda a aplicação
});