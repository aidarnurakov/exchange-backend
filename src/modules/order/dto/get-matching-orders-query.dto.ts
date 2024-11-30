import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class GetMatchingOrdersDto {
  @IsString()
  tokenA?: string;

  @IsString()
  tokenB?: string;

  @IsNumber()
  amountA?: number;

  @IsNumber()
  amountB?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => value && +value)
  page?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => value && +value)
  limit?: number;
}
