import { Module } from '@nestjs/common';
import { ClientsController } from './adapters/http/clients.controller';
import { ClientsService } from './application/outboundPorts/clients.service';
import { CepRepository } from 'src/utils/cep.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './entity/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService, CepRepository],
})
export class ClientsModule {}
