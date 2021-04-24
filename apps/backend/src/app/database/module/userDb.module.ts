import { Module } from '@nestjs/common';
import { DatabaseModule } from '@nx-base/backend-database/module/database.module';
import { UserService } from '@nx-base/backend-database/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@nx-base/backend-database/entity/user/user.entity';
@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
  exports: [TypeOrmModule.forFeature([User]), UserService],
})
export class UserDbModule {}
