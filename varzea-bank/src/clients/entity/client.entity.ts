import { Account } from 'src/accounts/domain/models/account.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AccountEntity } from 'src/accounts/entities/account.entity';

@Entity({ name: 'clients' })
export class ClientEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'cpf', nullable: false, unique: true })
    cpf: string;

    @OneToMany(() => AccountEntity, (account) => account.client, {
        cascade: true,
        eager: true, 
    })
    accounts: AccountEntity[];
    

    @Column({ name: 'cep', nullable: false })
    cep: string;

    @Column({ name: 'phone', nullable: false })
    phone: string;
}
