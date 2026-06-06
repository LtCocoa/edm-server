import { Test, TestingModule } from '@nestjs/testing';
import { DocumentExportService } from './document-export.service';

describe('DocumentExportService', () => {
  let service: DocumentExportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentExportService],
    }).compile();

    service = module.get<DocumentExportService>(DocumentExportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
