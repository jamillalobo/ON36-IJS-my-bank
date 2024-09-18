"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const account_entity_1 = require("./src/accounts/domain/entities/account.entity");
const client_entity_1 = require("./src/clients/entity/client.entity");
const manager_entity_1 = require("./src/managers/entity/manager.entity");
const transaction_entity_1 = require("./src/transactions/domain/entities/transaction.entity");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [manager_entity_1.ManagerEntity, account_entity_1.AccountEntity, client_entity_1.ClientEntity, transaction_entity_1.TransactionEntity],
    migrations: ['./src/migration/*.ts'],
    synchronize: true,
});
//# sourceMappingURL=data.source.js.map