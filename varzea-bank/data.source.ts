import { ManagerEntity } from "src/managers/entity/manager.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [ManagerEntity],
    migrations: ['./src/migration/*.ts'],
    synchronize: true, //auto reinicia o banco toda vez que roda a aplicação
});