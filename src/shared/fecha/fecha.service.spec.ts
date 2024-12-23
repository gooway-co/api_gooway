import { Test, TestingModule } from '@nestjs/testing';
import { FechaService } from './fecha.service';

describe('FechaService', () => {
  let service: FechaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FechaService],
    }).compile();

    service = module.get<FechaService>(FechaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
