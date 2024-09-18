import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransactionService } from 'src/transactions/application/outbounfPorts/transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    async transfer(
        @Body() idAccount: string,
        @Body() amount: string,
        @Body() IdAccountDestiny: string,
) {
        return this.transactionService.transfer(idAccount, Number(amount), IdAccountDestiny);
    }

    @Post()
    async deposit(
        @Body() idAccount: string,
        @Body() amount: string,
    ) {
        return this.transactionService.deposit(idAccount, Number(amount));
    }

    @Post()
    async withdraw(
        @Body() idAccount: string,
        @Body() amount: string,
    ) {
        return this.transactionService.withdraw(idAccount, Number(amount));
    }

    @Get(':id')
    async getTransactionByAccount(
        @Param() id: string,
    ) {
        return this.transactionService.getTransactionByAccount(id);
    }
}
