import { IsNotEmpty, IsUUID, IsString } from 'class-validator';

export class CreateShopDto {
  @IsNotEmpty()
  @IsUUID()
  sellerId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;
}