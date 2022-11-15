import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entitys/cliente.entity';
import { Address } from './entitys/address.entity';
import { MambuService } from '../service/mambu.service';
import { ClientesController } from './controller/clientes.controller';
import { ClientesService } from 'src/service/clientes.service';
import { IdDocuments } from './entitys/idDocuments.entity';
import { ExternalID } from './entitys/external_ID.entities';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([Cliente, Address, IdDocuments, ExternalID]),
  ],
  controllers: [ClientesController],
  providers: [ClientesService,  MambuService],
})
export class ClientsModule {}
