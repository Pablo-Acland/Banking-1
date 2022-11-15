
export class ProtoClientDto {
  
    firstName:string
    lastName:string;
    phoneNumber:string;
    idDocuments:ClientDocumentDTO;
    email:string;
    gender: string;
    addresses: AddressDTO;
    preferredLanguage:string;
    _personalizados : _personalizados;
  

}

export class AddressDTO{
    

    parentKey: string;

    encodedKey: string;
   
    line1: string;

    line2: string;

    city: string;

    region: string;

    postcode: string;

    country: string;

    indexInList: number;

 }


 export class ClientDocumentDTO {

  clientKey: string;

  encodedKey: string;

  documentType: string;

  documentId: string;

  issuingAuthority: string;

  indexInList: number;
}

export class _personalizados {

  External_ID: string;
}


