import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '@nx-base/backend-database/entity/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as md5 from 'md5';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>
  ) {}

  async saveEasyUser(user: User) {
    return this.repository.save(user);
  }
  async findByIdPass(userId, pass): Promise<User> {
    return this.repository.findOne({
      where: {
        userId: userId,
        pass: md5(pass),
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findByUserId(userId): Promise<User> {
    return this.repository.findOne({
      where: {
        userId: userId,
      },
    });
  }
}
