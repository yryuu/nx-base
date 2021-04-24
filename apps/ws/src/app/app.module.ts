import { Module } from '@nestjs/common';

import { RoomGateway } from './room/gateway/room.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [RoomGateway],
})
export class AppModule {}
