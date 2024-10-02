import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AccountType } from "../domain/enums/accountType.enum";
import { Manager } from "src/managers/domain/manager.model";
import { Transaction } from "src/transactions/domain/models/transaction.model";
import { ClientEntity } from "src/clients/entity/client.entity";
import { ManagerEntity } from "src/managers/entity/manager.entity";
import { Client } from "src/clients/domain/client.model";
import { TransactionEntity } from "src/transactions/domain/entities/transaction.entity";

@Entity({ name: 'accounts' })
export class AccountEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'balance', nullable: false })
    balance: number;

    @Column({ name: 'type', type: 'enum', enum: AccountType, nullable: false })
    type: AccountType;

    // Adiciona a coluna clientId para a chave estrangeira
    @ManyToOne(() => ClientEntity, (client) => client.accounts, { nullable: false, onDelete: 'CASCADE' })
    client: ClientEntity;

    // Adiciona a coluna managerId para a chave estrangeira
    @ManyToOne(() => ManagerEntity, (manager) => manager.accounts, { nullable: false, onDelete: 'CASCADE'})
    manager: ManagerEntity;

    @OneToMany(() => TransactionEntity, (transaction) => transaction.account, {
        cascade: true,
        eager: true
    })
    transactions: TransactionEntity[];

    @Column({ name: 'rate', nullable: true })
    rate: number;

    @Column({ name: 'overdraft_limit', nullable: true })
    overDraftLimit: number;
}

