import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './controller/api/user/user.module';
import { BaseController } from './controller/api/base/base.controller';

@Module({
  imports: [UserModule],
  controllers: [AppController, BaseController],
  providers: [AppService],
})
export class AppModule {}
