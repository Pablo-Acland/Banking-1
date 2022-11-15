import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./cliente.entity";


@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  encodedKey: string;
  @Column()
  line1: string;
  @Column()
  line2: string;
  @Column()
  city: string;
  @Column()
  country: string;
  @Column()
  postcode: string;
  @Column()
  region: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.addresses)
  cliente: Cliente;
}