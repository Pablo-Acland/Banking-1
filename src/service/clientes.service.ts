import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { ClienteDto } from 'src/cliente/dto/cliente.dto';
import { AddressDTO, ClientDocumentDTO } from 'src/cliente/dto/protocClient.dto';
import { Address } from 'src/cliente/entitys/address.entity';
import { Cliente } from 'src/cliente/entitys/cliente.entity';
import { IdDocuments } from 'src/cliente/entitys/idDocuments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientesService {

  private logger = new Logger('ClientService')

  constructor(
    @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
        @InjectRepository(Address)
        private readonly addressRepository: Repository<Address>,
        @InjectRepository(IdDocuments)
        private readonly idDocumentRepository: Repository<IdDocuments>,
  ) {}


  async findClientBy(encodedKey: string) {
    let client: Cliente;

    if (isUUID(encodedKey)) {
        client = await this.clienteRepository.findOneBy({ encodedKey: encodedKey })
    }
    if (!client) {
        throw new NotFoundException(`Cliente con id: ${encodedKey} no existe`)
    }
    return client
}

  async save(id: string, clientDto: ClienteDto) {
    let exist: Cliente;
    exist = await this.clienteRepository.findOneBy({ id: id })
    if (exist) {
        throw new BadRequestException(`Cliente con id: ${id} existe en la BD`)
    }
    if (!exist) {

        const documentsDtoList = clientDto.idDocuments.map(document => {

            const documentDTO = new ClientDocumentDTO();
            documentDTO.clientKey = document.clientKey;
            documentDTO.encodedKey = document.encodedKey;
            documentDTO.documentType = document.documentType;
            documentDTO.documentId = document.documentId;
            documentDTO.issuingAuthority = document.issuingAuthority;
            documentDTO.indexInList = document.indexInList;


            this.idDocumentRepository.save(documentDTO)
            return documentDTO;
        });

        const addressDtoList = clientDto.addresses.map(address => {

            const addressDTO = new AddressDTO()
            addressDTO.parentKey = address.parentKey;
            addressDTO.encodedKey = address.encodedKey;
            addressDTO.line1 = address.line1;
            addressDTO.line2 = address.line2;
            addressDTO.city = address.city;
            addressDTO.region = address.region;
            addressDTO.postcode = address.postcode;
            addressDTO.country = address.country;
            addressDTO.indexInList = address.indexInList;


            this.addressRepository.save(addressDTO)
            return addressDTO
        })
        clientDto.addresses = addressDtoList;
        clientDto.idDocuments = documentsDtoList;

        return this.clienteRepository.save(clientDto);
    }
}

async update(encodedKey: string, updateClientDto: ClienteDto) {

  const client = await this.clienteRepository.preload({
      encodedKey: encodedKey,
      ...updateClientDto
  })

  if (!client) throw new NotFoundException(`Cliente con id: ${encodedKey} no esxiste`)

  try {

      await this.clienteRepository.save(client)
      return client

  } catch (error) {
      this.handleDBExceptions(error)
  }
}

async delete(encodedKey: string) {
  const client = await this.findClientBy(encodedKey)
  if (client) {
      await this.clienteRepository.remove(client)
      return `Cliente Eliminado `
  }
}

private handleDBExceptions(error: any) {
  if (error.code === '23505')
      throw new BadRequestException(error.detail)

  this.logger.error(error)

  throw new InternalServerErrorException("unexpected error, check server logs")
}
  
}
