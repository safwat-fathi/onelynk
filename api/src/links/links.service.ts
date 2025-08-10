import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  async create(createLinkDto: CreateLinkDto, user: User): Promise<Link> {
    const link = this.linkRepository.create({
      ...createLinkDto,
      user,
    });
    return this.linkRepository.save(link);
  }

  async findAll(userId: number): Promise<Link[]> {
    return this.linkRepository.find({ where: { user: { id: userId } }, order: { position: 'ASC' } });
  }

  async findOne(id: number, userId: number): Promise<Link> {
    const link = await this.linkRepository.findOne({ where: { id, user: { id: userId } } });
    if (!link) {
      throw new NotFoundException(`Link with ID "${id}" not found`);
    }
    return link;
  }

  async update(id: number, updateLinkDto: UpdateLinkDto, user: User): Promise<Link> {
    const link = await this.findOne(id, user.id);
    // The findOne method already ensures the link belongs to the user.
    this.linkRepository.merge(link, updateLinkDto);
    return this.linkRepository.save(link);
  }

  async remove(id: number, user: User): Promise<void> {
    const link = await this.findOne(id, user.id);
    // The findOne method already ensures the link belongs to the user.
    const result = await this.linkRepository.delete(link.id);
    if (result.affected === 0) {
      throw new NotFoundException(`Link with ID "${id}" not found`);
    }
  }
}
