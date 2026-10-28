import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsNumber,
  IsInt,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  @IsUUID()
  shopId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock: number;

  @IsNotEmpty()
  @IsString()
  condition: string;

  @IsString()
  description: string;
}