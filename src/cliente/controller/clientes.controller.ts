import { Body, Controller, Get, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { ClientesService } from 'src/service/clientes.service';
import { MambuService } from 'src/service/mambu.service';
import { ClienteDto } from '../dto/cliente.dto';
import { DisbursmentDto } from '../dto/loan/disbursment.dto';
import { LoanDto } from '../dto/loan/loan.dto';
import { RepaymentDto } from '../dto/loan/repayment.dto';
import { ProtoClientDto } from '../dto/protocClient.dto';


@Controller()
export class ClientesController {
  constructor(
    private readonly clienteService: ClientesService,
    private readonly mambuService: MambuService,
  ) {}

  @Get('/mambu/client/todos')
  findAll() {
    return this.mambuService.findAllClientes();
  }

  @Get('/mambu/client/:id')
  findClienteById(@Param('id') id: string) {
    return this.mambuService.findClienteById(id);
  }

  @Get("/mambu/products")
    async getProducts() {
        return this.mambuService.getProducts()
    }

  @Post('/mambu/save')
  async saveCliente(@Body() cliente: ClienteDto){
    const createClientMambu = await this.mambuService.saveCliente(cliente);
    //const saveClientSQL = await this.clienteService.save(createClientMambu.id, createClientMambu);
    return createClientMambu;

  }



  @Post("/mambu/createLoans")
    createLoans(@Body() loanDto: LoanDto) {
        return this.mambuService.createLoans(loanDto);
    }

    @Post("/mambu/approveLoansAccount/:loanAccountId")
    approveLoansAccount(@Param('loanAccountId') loanAccountId: string) {
        return this.mambuService.approveLoansAccount(loanAccountId);
    }

    @Post("/mambu/disbursementTransaction/:loanAccountId")
    disbursementTransaction(@Param('loanAccountId') loanAccountId: string, @Body() disburment: DisbursmentDto) {
        return this.mambuService.disbursementTransactions(loanAccountId, disburment);
    }

    @Post("/mambu/rpaymentTransactions/:loanAccountId")
    async rpaymentTransactions(@Param('loanAccountId') loanAccountId: string, @Body() repayment: RepaymentDto) {
        return await this.mambuService.rpaymentTransactions(loanAccountId, repayment);
    }

  @Patch("/mambu/approveClient/:clientId")
  approveClient(@Param('clientId') clientId: string) {
      this.mambuService.approveClient(clientId);

      return {
          message: "State Updated successfully"
      }
  }

}
