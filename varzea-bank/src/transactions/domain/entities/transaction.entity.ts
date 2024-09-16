import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TransactionType } from "../enums/transactionType.enum";

@Entity({ name: 'transactions' })
export class TransactionEntity {
    @PrimaryGeneratedColumn('uuid')
    idTransaction: string;

    @Column({ name: 'id_account', nullable: false})
    idAccount: string

    @Column({ name: 'amount', nullable: false})
    amount: number;

    @Column({ name: 'type', type: 'enum', enum: TransactionType, nullable: false})
    type: TransactionType;

    @Column({ name: 'date_transaction', type: 'date', nullable: false})
    date: Date;

}


