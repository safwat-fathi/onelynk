import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Link } from './entities/link.entity';
import CONSTANTS from 'src/common/constants';

@ApiTags('links')
@Controller('links')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth(CONSTANTS.ACCESS_TOKEN)
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new link' })
  @ApiResponse({
    status: 201,
    description: 'The link has been successfully created.',
    type: Link,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Body() createLinkDto: CreateLinkDto,
    @GetUser() user: User,
  ): Promise<Link> {
    return this.linksService.create(createLinkDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all links for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Return all links for the user.',
    type: [Link],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@GetUser() user: User): Promise<Link[]> {
    return this.linksService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific link by ID' })
  @ApiResponse({ status: 200, description: 'Return the link.', type: Link })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Link not found' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Link> {
    return this.linksService.findOne(id, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a link' })
  @ApiResponse({
    status: 200,
    description: 'The link has been successfully updated.',
    type: Link,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Link not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLinkDto: UpdateLinkDto,
    @GetUser() user: User,
  ): Promise<Link> {
    return this.linksService.update(id, updateLinkDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a link' })
  @ApiResponse({
    status: 204,
    description: 'The link has been successfully deleted.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Link not found' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.linksService.remove(id, user);
  }
}
