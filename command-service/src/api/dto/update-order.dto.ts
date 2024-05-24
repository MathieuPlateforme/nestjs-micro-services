// src/api/dto/update-order.dto.ts
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

class UpdateAddressDto {
    @IsString()
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    street?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    zipCode?: string;

    @IsString()
    @IsOptional()
    country?: string;
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


    @ValidateNested()
    @Type(() => UpdateAddressDto)
    @IsOptional()
    address?: UpdateAddressDto;
}
