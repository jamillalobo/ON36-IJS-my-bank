import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'managers'})
export class ManagerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false})
    name: string;
    
    @Column({ name: 'accounts', nullable: false}) // account one to many ou nullable: true
    accounts: number[];
}