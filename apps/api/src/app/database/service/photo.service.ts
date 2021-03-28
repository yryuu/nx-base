import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from '@nx-base/api-database/entity/photo/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>
  ) {}

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }
}
