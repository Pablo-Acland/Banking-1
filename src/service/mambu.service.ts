import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, lastValueFrom, map } from 'rxjs';
import { ClienteDto } from 'src/cliente/dto/cliente.dto';
import { DisbursmentDto } from 'src/cliente/dto/loan/disbursment.dto';
import { LoanDto } from 'src/cliente/dto/loan/loan.dto';
import { RepaymentDto } from 'src/cliente/dto/loan/repayment.dto';
import { ProtoClientDto } from 'src/cliente/dto/protocClient.dto';

@Injectable()
export class MambuService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  private headers = {

      Accept: this.config.get<string>('ACEPT'),
      apikey: this.config.get<string>('API_KEY'),
  };

  //-------------------------------------------------------------------------------------------

  async findAllClientes(): Promise<ClienteDto[]> {
    const urlmambu = this.config.get<string>('URL_MAMBU');

    const response = await this.httpService
      .get(
        `${urlmambu}/clients?offset=0&limit=10&paginationDetails=OFF&detailsLevel=FULL`,
        {headers: this.headers,}
       
      )
      .pipe(
        map((res) => {
          return res.data.map((data) => {
            return new ClienteDto(data);
          });
        }),
      );

    return firstValueFrom(response);
  }

  async findClienteById(id: string): Promise<ClienteDto>{
    const urlmambu = this.config.get<string>('URL_MAMBU');
    
    const response = await this.httpService
      .get(
        `${urlmambu}/clients/${id}?detailsLevel=FULL`,
        {headers: this.headers,}
      )
      .pipe(
        map((res) => {
            return new ClienteDto(res.data);
        }),
      );

    return firstValueFrom(response);
  }

  async saveCliente(protocClient: ClienteDto){

    const urlmambu = this.config.get<string>('URL_MAMBU');
    const { data } = await firstValueFrom(
      this.httpService
          .post(`${urlmambu}/clients`, protocClient,{
            headers: this.headers,
          }),
    );
      return data;
  }

  async approveClient(clientId: string) {

    const body = [
      {
          op: 'REPLACE',
          path: 'state',
          value: 'PENDING_APPROVAL'
      },
  ];

    const urlmambu = this.config.get<string>('URL_MAMBU');
    

    const { response } = await lastValueFrom(
        this.httpService.patch(`${urlmambu}/clients/${clientId}`, body, { headers: this.headers })
            .pipe(map(resp => resp.data))
    )


    return response;
}

//------------------------------------------------------------------------------------------


async createLoans(loanDto: LoanDto) {

  const urlmambu = this.config.get<string>('URL_MAMBU');

  const response = await lastValueFrom(
      this.httpService.post(`${urlmambu}/loans/`, loanDto, { headers: this.headers})
          .pipe(map(resp => resp.data))
  )
  return response;
}


async approveLoansAccount(loanAccountId: string) {

  const body = {
      action: 'APPROVE',
      notes: 'Se aprobòel prestamo',
  };

  const urlmambu = this.config.get<string>('URL_MAMBU');
  
  const response = await lastValueFrom(
      this.httpService.post(`${urlmambu}/loans/${loanAccountId}:changeState`,
       body, { headers: this.headers })
          .pipe(map(resp => resp.data))

  )
  return response;
}

async disbursementTransactions(loanAccountId: string, disbursment: DisbursmentDto) {

  const urlmambu = this.config.get<string>('URL_MAMBU');

  const response = await firstValueFrom(
      this.httpService.post(`${urlmambu}/loans/${loanAccountId}/disbursement-transactions`,
       disbursment, { headers: this.headers })
          .pipe(map((res) => res.data))
  );
  return response;
}

async rpaymentTransactions(loanAccountId: string, repayment: RepaymentDto) {

  const urlmambu = this.config.get<string>('URL_MAMBU');

  const response = await lastValueFrom(
      this.httpService.post(`${urlmambu}/loans/${loanAccountId}/repayment-transactions`,
       repayment, { headers: this.headers })
          .pipe(map(resp => resp.data))
  )
  return response;
}

//-----------------------------------------------------------------------------------------------------------

async getProducts() {

  const urlmambu = this.config.get<string>('URL_MAMBU');
  const response = await lastValueFrom(
      this.httpService.get(`${urlmambu}/loanproducts/1077001?detailsLevel=FULL`,
       { headers: this.headers })
          .pipe(map(resp => resp.data))
  )
  return response;
}
  
}
