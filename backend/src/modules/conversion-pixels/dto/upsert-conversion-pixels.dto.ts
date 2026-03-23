import { IsArray, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

const PLATFORMS = ['facebook', 'google_ads', 'google_analytics', 'tiktok', 'kwai', 'pinterest'] as const;

export class ConversionPixelDto {
  @IsIn(PLATFORMS)
  platform!: (typeof PLATFORMS)[number];

  @IsString()
  pixel_id!: string;

  @IsOptional()
  @IsString()
  domain?: string;

  @IsBoolean()
  purchase_pix_enabled!: boolean;

  @IsInt()
  @Min(0)
  @Max(999)
  pix_conversion_value!: number;

  @IsBoolean()
  purchase_boleto_enabled!: boolean;

  @IsInt()
  @Min(0)
  @Max(999)
  boleto_conversion_value!: number;

  @IsBoolean()
  disable_order_bumps!: boolean;
}

export class UpsertConversionPixelsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConversionPixelDto)
  pixels!: ConversionPixelDto[];
}

