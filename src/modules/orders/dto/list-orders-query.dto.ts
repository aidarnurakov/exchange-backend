import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ListOrdersQueryDto {
  @IsOptional()
  @IsString()
  tokenA: string;

  @IsOptional()
  @IsString()
  tokenB: string;

  @IsOptional()
  @IsString()
  user: string;

  @IsOptional()
  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => value && +value)
  page: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => value && +value)
  limit: number;
}
