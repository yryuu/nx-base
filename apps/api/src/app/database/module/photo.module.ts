import { Module } from '@nestjs/common';
import { DatabaseModule } from '@nx-base/api-database/module/database.module';
import { PhotoService } from '@nx-base/api-database/service/photo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '@nx-base/api-database/entity/photo/photo.entity';
@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Photo])],
  providers: [PhotoService],
})
export class PhotoModule {}
