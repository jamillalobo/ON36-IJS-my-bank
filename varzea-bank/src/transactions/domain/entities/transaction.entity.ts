import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { TransactionType } from "../enums/transactionType.enum";
import { Account } from "src/accounts/domain/models/account.model";
import { AccountEntity } from "src/accounts/entities/account.entity";

@Entity({ name: 'transactions' })
export class TransactionEntity {
    @PrimaryGeneratedColumn('uuid')
    idTransaction: string;

    @ManyToOne(() => AccountEntity, (account) => account.transactions)
    account: AccountEntity;

    @Column({ name: 'amount', nullable: false})
    amount: number;

    @Column({ name: 'type', type: 'enum', enum: TransactionType, nullable: false})
    type: TransactionType;

    @Column({ name: 'date_transaction', type: 'date', nullable: false})
    date: Date;
}


