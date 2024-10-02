import { Body, Controller, Get, Param, Post, Res, HttpStatus } from '@nestjs/common';
import { TransactionService } from 'src/transactions/application/outbounfPorts/transaction.service';
import { TransferDto } from './dto/transfer.dto';
import { TransactionDto } from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @Post('/transfer')
    async transfer(
        @Res() response,
        @Body() transferDto: TransferDto,
    ) {
        try {
            const { account, amount, accountDestiny } = transferDto
            const transfer = await this.transactionService.transfer(account, amount, accountDestiny);
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

    @Post('/deposit')
    async deposit(
        @Res() response,
        @Body() transactionDto: TransactionDto,
    ) {
        try {
            const { account, amount } = transactionDto;
            const deposit = await this.transactionService.deposit(account, amount);
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

    @Post('/withdraw')
    async withdraw(
        @Res() response,
        @Body() transactionDto: TransactionDto,

    ) {
        try {
            const { account, amount } = transactionDto;
            const withdraw = await this.transactionService.withdraw(account, amount);
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

    @Get('/:id')
    async getTransactionByAccount(
        @Res() response,
        @Param('id') id: string,
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
