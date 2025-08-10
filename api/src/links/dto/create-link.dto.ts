import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateLinkDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  position: number;
}

