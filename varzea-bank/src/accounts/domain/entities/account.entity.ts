import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AccountType } from "../enums/accountType.enum";

@Entity({ name: 'accounts'})
export class AccountEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'balance', nullable: false})
    balance: number;

    @Column({name: 'type', type: 'enum', enum: AccountType, nullable: false})
    type: AccountType;
    
    @Column({ name: 'id_client', nullable: false})
    idClient: string;

    @Column({ name: 'id_manager', nullable: false})
    idManager: string;

    @Column({ name: 'rate', nullable: true})
    rate: number;

    @Column({ name: 'overdraft_limit', nullable: true})
    overDraftLimit: number;
}

// faco uma entidade para o current account e 
// outra para o savings account ? 
// coloqui nulable para os campos que nao sao obrigatorios