import { Test, TestingModule } from '@nestjs/testing';
import { CharactersEpisodesController } from './characters-episodes.controller';
import { CharactersEpisodesService } from './characters-episodes.service';

describe('CharactersEpisodesController', () => {
  let controller: CharactersEpisodesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersEpisodesController],
      providers: [CharactersEpisodesService],
    }).compile();

    controller = module.get<CharactersEpisodesController>(CharactersEpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
