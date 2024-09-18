import {
    Controller,
    Param,
    Body,
    Post,
    Delete,
    ParseIntPipe,
    Get,
    Res,
    HttpStatus,
    Put,

} from '@nestjs/common';
import { AccountsService } from '../../application/outboundPorts/accounts.service';
import { AccountType } from '../../domain/enums/accountType.enum';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Post()
    async createAccount(
        @Res() response, 
        @Body() createAccountDto: CreateAccountDto,
    ) {
        try {
            const newAccount = await this.accountsService.createAccount(createAccountDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Account has been created successfully',
                newAccount});
            
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    async findAllAccounts(@Res() response) {
        try {
            return await this.accountsService.findAllAccounts();        
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get(':id')
    async findClientById(@Res() response, @Param('id', ParseIntPipe) id: string) {
        try {
            return await this.accountsService.findAccountById(id);       
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Put(':id')
    async updateAccountType(
        @Res() response,
        @Param('id') id: string,
        @Body() updateAccountDto: UpdateAccountDto,
    ) {
        try {
            const updateAccount = await this.accountsService.updateAccount(id, updateAccountDto);
            return response.status(200).json({
                message:'Product has been successfully updated',
                updateAccount
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete(':id')
    async deleteProduct(@Res() response, @Param('id') id: string) {
        try {
        const deletedProduct = await this.accountsService.deleteAccount(id);
        return response.status(HttpStatus.OK).json({
            message: 'Account deleted successfully',
            deletedProduct});
        } catch (err) {
        return response.status(err.status).json(err.response);
        }
    }
}
