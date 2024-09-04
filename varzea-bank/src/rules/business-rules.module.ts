import { Module } from '@nestjs/common';
import { BusinessRulesService } from './business-rules.service';

@Module({
  providers: [BusinessRulesService]
})
export class BusinessRulesModule {}
