import { IsString, IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateLigneCommandeDto {
  @IsString()
  @IsOptional()
  productId?: string;

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  currency?: string;
}

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  status?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateLigneCommandeDto)
  @IsOptional()
  lines?: UpdateLigneCommandeDto[];
}