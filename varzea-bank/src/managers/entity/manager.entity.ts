import { Account } from "src/accounts/domain/models/account.model";
import { AccountEntity } from "src/accounts/entities/account.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'managers' })
export class ManagerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false })
    name: string;

    @OneToMany(() => AccountEntity, (account) => account.manager, {
        cascade: true,
        eager: true, 
    })
    accounts: AccountEntity[];
}
