import { Body, Controller, Get, Param, Post, Res, HttpStatus } from '@nestjs/common';
import { TransactionService } from 'src/transactions/application/outbounfPorts/transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post()
    async transfer(
        @Res() response,
        @Body() idAccount: string,
        @Body() amount: string,
        @Body() IdAccountDestiny: string,
    ) {
        try {
            const transfer = await this.transactionService.transfer(idAccount, Number(amount), IdAccountDestiny);
            return response.status(HttpStatus.OK).json({
                message: 'Transfer completed successfully',
                transfer});
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Transfer not completed!',
                error: 'Bad Request'
            });
        }
    }

    @Post()
    async deposit(
        @Body() response,
        @Body() idAccount: string,
        @Body() amount: string,
    ) {
        try {
            const deposit = await this.transactionService.deposit(idAccount, Number(amount));
            return response.status(HttpStatus.OK).json({
                message: 'Deposit completed successfully',
                deposit});
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Deposit not completed!',
                error: 'Bad Request'
            });
        }
    }

    @Post()
    async withdraw(
        @Body() response,
        @Body() idAccount: string,
        @Body() amount: string,
    ) {
        try {
            const withdraw = await this.transactionService.withdraw(idAccount, Number(amount));
            return response.status(HttpStatus.OK).json({
                message: 'Withdraw completed successfully',
                withdraw});
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Withdraw not completed!',
                error: 'Bad Request'
            });
        }
    }

    @Get(':id')
    async getTransactionByAccount(
        @Res() response,
        @Param() id: string,
    ) {
        try {
            const transactions = await this.transactionService.getTransactionByAccount(id);
            return response.status(HttpStatus.OK).json({
                message: 'All transactions found successfully',
                transactions});
        } catch (error) {
            return response.status(error.status).json(error.response);
        }
    }
}
