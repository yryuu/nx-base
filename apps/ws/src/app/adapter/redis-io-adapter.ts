import { IoAdapter } from '@nestjs/platform-socket.io';
import * as redisAdapter from 'socket.io-redis';

export class RedisIoAdapter extends IoAdapter {
  public createIOServer(port: number) {
    const server = super.createIOServer(port);
    const adapter = redisAdapter({ host: `localhost`, port: 6379 });

    server.adapter(adapter);
    return server;
  }
}
