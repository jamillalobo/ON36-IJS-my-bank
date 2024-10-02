import { Module } from '@nestjs/common';
import { ManagersController } from './adapters/http/managers.controller';
import { ManagersService } from './application/outboundPorts/managers.service';
import { AccountsModule } from 'src/accounts/accounts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from './entity/manager.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ManagerEntity]),
  ],
  controllers: [ManagersController],
  providers: [ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}
