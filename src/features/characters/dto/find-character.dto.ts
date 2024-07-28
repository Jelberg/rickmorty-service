import { IsOptional, IsString } from 'class-validator';

export class FindCharacterDto {
  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  specie?: string;
}
