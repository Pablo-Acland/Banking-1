import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./cliente.entity";




@Entity({ name: 'iddocuments' })
export class IdDocuments {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  encodedKey: string;
  @Column()
  clientKey: string;
  @Column()
  documentType: string;
  @Column()
  documentId: string;
  @Column()
  issuingAuthority: string;
  @Column()
  indexInList: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.idDocuments)
  cliente: Cliente;
}