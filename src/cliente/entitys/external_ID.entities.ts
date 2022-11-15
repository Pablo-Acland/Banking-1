import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, OneToMany, ManyToOne } from 'typeorm';
import { Cliente } from './cliente.entity';


@Entity({ name: 'externalid' })
export class ExternalID {

    @PrimaryGeneratedColumn('uuid')
    external_ID: string;

    @OneToOne(() => Cliente, (cliente) => cliente._personalizados)
    client: Cliente;

    
}


