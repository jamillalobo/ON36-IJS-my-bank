import { Module } from '@nestjs/common';
import { ManagersController } from './adapters/http/managers.controller';
import { ManagersService } from './application/outboundPorts/managers.service';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [AccountsModule],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
