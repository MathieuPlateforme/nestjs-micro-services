// src/create-order.dto.ts

import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, IsObject } from 'class-validator';


import { Type } from 'class-transformer';

class CreateLigneCommandeDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  currency: string;
}

class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

export class CreateOrderDto {
    @IsNumber()
  @IsNotEmpty()
  clientIdUser: number;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLigneCommandeDto)
  lines: CreateLigneCommandeDto[];
}