import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { PrismaService } from 'src/prisma/services/prisma.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('CharactersService', () => {
  let service: CharactersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        {
          provide: PrismaService,
          useValue: {
            characters: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
              update: jest.fn(),
              count: jest.fn(),
            },
            subc_char_epis: {
              create: jest.fn(),
              update: jest.fn(),
              findMany: jest.fn(),
            },
            type_stat: {
              findFirst: jest.fn(),
            },
            subcategories: {
              findFirst: jest.fn(),
              findMany: jest.fn(),
            },
            categories: {
              findFirst: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a new character successfully', async () => {
      const dto = {
        name: 'Rick',
        type: 'Scientist',
        specie: 'Human',
        status_char: 'Active',
      };
      const mockCharacter = { id: 1, ...dto };
      const mockTypeStat = { id: 1 };
      const mockSubcategory = { id: 1 };

      jest.spyOn(prisma, 'getTypeStat').mockResolvedValue(mockTypeStat);
      jest
        .spyOn(prisma, 'getSubcategoryByNameAndCategory')
        .mockResolvedValue(mockSubcategory);
      jest.spyOn(prisma.characters, 'create').mockResolvedValue(mockCharacter);
      jest.spyOn(prisma.subc_char_epis, 'create').mockResolvedValue({});

      const result = await service.create(dto);
      expect(result).toEqual(mockCharacter);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      const dto = { name: 'Rick', type: 'Scientist', specie: 'Human' };
      jest
        .spyOn(prisma.characters, 'create')
        .mockRejectedValue(new Error('Error'));

      await expect(service.create(dto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findAll', () => {
    it('should return a paginated list of characters', async () => {
      const mockCharacters = [
        {
          id: 1,
          name: 'Rick',
          type: 'Scientist',
          type_stat: {},
          subc_char_epis: [],
        },
      ];
      jest
        .spyOn(prisma.characters, 'findMany')
        .mockResolvedValue(mockCharacters);
      jest.spyOn(prisma.characters, 'count').mockResolvedValue(1);

      const result = await service.findAll({ page: 1, pageSize: 5 });
      expect(result.data).toEqual(
        mockCharacters.map((character) => ({
          id: character.id,
          name: character.name,
          type: character.type,
          type_stat: mapTypeStat(character.type_stat),
          subc_char_epis: mapSubcCharEpis(character.subc_char_epis),
        })),
      );
      expect(result.info).toEqual({ count: 1, pages: 1 });
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest
        .spyOn(prisma.characters, 'findMany')
        .mockRejectedValue(new Error('Error'));

      await expect(service.findAll({ page: 1, pageSize: 5 })).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single character', async () => {
      const mockCharacter = {
        id: 1,
        name: 'Rick',
        type: 'Scientist',
        type_stat: {},
        subc_char_epis: [],
      };
      jest
        .spyOn(prisma.characters, 'findFirst')
        .mockResolvedValue(mockCharacter);

      const result = await service.findOne(1);
      expect(result).toEqual({
        id: mockCharacter.id,
        name: mockCharacter.name,
        type: mockCharacter.type,
        type_stat: mapTypeStat(mockCharacter.type_stat),
        subc_char_epis: mapSubcCharEpis(mockCharacter.subc_char_epis),
      });
    });

    it('should throw a NotFoundException if character not found', async () => {
      jest.spyOn(prisma.characters, 'findFirst').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a character successfully', async () => {
      const dto = { name: 'Rick', type: 'Scientist', specie: 'Human' };
      const mockCharacter = {
        id: 1,
        name: 'Rick',
        type: 'Scientist',
        type_stat: {},
        subc_char_epis: [],
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(mockCharacter);
      jest
        .spyOn(prisma.characters, 'update')
        .mockResolvedValue({ ...mockCharacter, ...dto });

      const result = await service.update(1, dto);
      expect(result).toEqual({ ...mockCharacter, ...dto });
    });

    it('should throw an InternalServerErrorException on error', async () => {
      const dto = { name: 'Rick', type: 'Scientist' };
      jest.spyOn(service, 'findOne').mockResolvedValue({});
      jest
        .spyOn(prisma.characters, 'update')
        .mockRejectedValue(new Error('Error'));

      await expect(service.update(1, dto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('deleteCharacter', () => {
    it('should delete a character by updating its status', async () => {
      const mockTypeStatus = { id: 1 };
      jest.spyOn(prisma, 'getTypeStat').mockResolvedValue(mockTypeStatus);
      jest
        .spyOn(prisma.characters, 'update')
        .mockResolvedValue({ id: 1, fk_typestat: mockTypeStatus.id });

      const result = await service.deleteCharacter({ where: { id: 1 } });
      expect(result).toEqual({ id: 1, fk_typestat: mockTypeStatus.id });
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest.spyOn(prisma.getTypeStat).mockRejectedValue(new Error('Error'));

      await expect(
        service.deleteCharacter({ where: { id: 1 } }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('find', () => {
    it('should return a list of characters filtered by species and type', async () => {
      const mockCharacters = [
        { id: 1, name: 'Rick', type: 'Scientist', subc_char_epis: [] },
      ];
      jest
        .spyOn(prisma.characters, 'findMany')
        .mockResolvedValue(mockCharacters);

      const result = await service.find('Human', 'Scientist');
      expect(result).toEqual(
        mockCharacters.map((character) => ({
          id: character.id,
          name: character.name,
          type: character.type,
          categories: CATEGORIES.SPECIE,
          subcategories: mapSubcCharEpis(character.subc_char_epis),
        })),
      );
    });

    it('should throw an InternalServerErrorException on error', async () => {
      jest
        .spyOn(prisma.characters, 'findMany')
        .mockRejectedValue(new Error('Error'));

      await expect(service.find('Human')).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  // Puedes agregar más pruebas para las funciones restantes
});
