import { Column, Entity, Index, JoinTable, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { ExternalID } from "./external_ID.entities";
import { IdDocuments } from "./idDocuments.entity";


@Entity({ name: 'cliente' })
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  encodedKey: string;

  @Column('text')
  id: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  state: string;

  @Column('text')
  mobilePhone: string;

  @Column()
  @Index({unique:true})
  emailAddress: string;

  @Column('text')
  gender: string;


  @OneToMany(() => Address, (address) => address.cliente)
  @JoinTable()
    addresses: Address[];

  @OneToMany(() => IdDocuments, (idDocuments) => idDocuments.cliente)
  @JoinTable()
  idDocuments: IdDocuments[];

  @OneToOne(() => ExternalID, (external) => external.external_ID)
    @JoinTable()
    _personalizados: ExternalID;
}