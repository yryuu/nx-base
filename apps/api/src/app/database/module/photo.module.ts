import { Module } from '@nestjs/common';
import { DatabaseModule } from '../module/database.module';
import { photoProviders } from '../provider/photo.providers';
import { PhotoService } from '../service/photo.service';

@Module({
  imports: [DatabaseModule],
  providers: [...photoProviders, PhotoService],
})
export class PhotoModule {}
