import { Module } from '@nestjs/common';
import { ClientsController } from './adapters/http/clients.controller';
import { ClientsService } from './application/outboundPorts/clients.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
