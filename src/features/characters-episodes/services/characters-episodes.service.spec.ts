import { Test, TestingModule } from '@nestjs/testing';
import { CharactersEpisodesService } from './characters-episodes.service';

describe('CharactersEpisodesService', () => {
  let service: CharactersEpisodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersEpisodesService],
    }).compile();

    service = module.get<CharactersEpisodesService>(CharactersEpisodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
