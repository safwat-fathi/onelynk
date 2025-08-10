import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreatePortfolioDto {
  @ApiProperty({ description: 'Portfolio image URL' })
  @IsUrl()
  @IsNotEmpty()
  image_url: string;

  @ApiProperty({ description: 'Portfolio title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Portfolio description' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
