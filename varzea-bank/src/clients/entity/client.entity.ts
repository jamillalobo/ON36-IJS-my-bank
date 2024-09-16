import { Client } from './../domain/client.model';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'clients'})
export class ClientEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false})
    name: string;

    @Column({ name: 'cpf', nullable: false, unique: true })
    cpf: string;
    
    @Column({ name: 'account', nullable: false}) // account one to many
    account: number[];

    @Column({ name: 'cep', nullable: false})
    cep: string;

    @Column({ name: 'phone', nullable: false})
    phone: string;

}