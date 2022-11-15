import { IsOptional } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { ExternalID } from '../entitys/external_ID.entities';
import { AddressDTO, ClientDocumentDTO} from './protocClient.dto';

export class ClienteDto {

    firstName: string;

    id: string;

    encodedKey: string;

    lastName: string;

    mobilePhone: string;

    emailAddress: string;

    gender: string;

    @IsOptional()
    addresses: AddressDTO[];

    @IsOptional()
    idDocuments: ClientDocumentDTO[];

    @IsOptional()
    _personalizados: ExternalID;

  constructor(data?: any) {
    this.id = data?.id ?? '';
    this.encodedKey = data?.encodedKey ?? uuidv4();
    this.firstName = data?.firstName ?? '';
    this.lastName = data?.lastName ?? '';
    this.mobilePhone = data?.mobilePhone ?? '';
    this.emailAddress = data?.emailAddress ?? '';
    this.gender = data?.gender ?? '';
  }
}
