/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { environment } from './environments/environment';
import { AppModule } from './app/app.module';
import { RedisIoAdapter } from './app/adapter/redis-io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /** Redisに接続 */
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  const globalPrefix = environment.prefix || 'ws';
  app.setGlobalPrefix(globalPrefix);
  const port = environment.port || process.env.PORT || 8081;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
