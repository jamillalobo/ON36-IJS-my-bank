import { Test, TestingModule } from '@nestjs/testing';
import { BusinessRulesService } from './business-rules.service';

describe('BusinessRulesService', () => {
  let service: BusinessRulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessRulesService],
    }).compile();

    service = module.get<BusinessRulesService>(BusinessRulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
