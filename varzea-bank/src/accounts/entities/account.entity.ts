import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AccountType } from "../domain/enums/accountType.enum";
import { Manager } from "src/managers/domain/manager.model";
import { Transaction } from "src/transactions/domain/models/transaction.model";
import { ClientEntity } from "src/clients/entity/client.entity";
import { ManagerEntity } from "src/managers/entity/manager.entity";
import { Client } from "src/clients/domain/client.model";
import { TransactionEntity } from "src/transactions/domain/entities/transaction.entity";

@Entity({ name: 'accounts'})
export class AccountEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'balance', nullable: false})
    balance: number;

    @Column({name: 'type', type: 'enum', enum: AccountType, nullable: false})
    type: AccountType;
    
    @ManyToOne(() => ClientEntity, (client) => client.account)
    client: Client;

    @ManyToOne(() => ManagerEntity, (manager) => manager.accounts)
    manager: Manager;

    @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
    transactions: Transaction[];

    @Column({ name: 'rate', nullable: true})
    rate: number;

    @Column({ name: 'overdraft_limit', nullable: true})
    overDraftLimit: number;
}

// faco uma entidade para o current account e 
// outra para o savings account ? 
// coloqui nulable para os campos que nao sao obrigatorios