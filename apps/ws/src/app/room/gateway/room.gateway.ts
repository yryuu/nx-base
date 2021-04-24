import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { RedisClient } from '@nestjs/microservices/external/redis.interface';
import { WsEventConstant } from '@nx-base/core/domain/constant';
import { promisify } from 'util';
import {
  RoomMessageModel,
  RoomClientInfo,
  ClientInfo,
} from '@nx-base/core/domain/interface';

interface RedisGet {
  (value: string): Promise<string>;
}

interface RedisSet {
  (key: string, value: string): Promise<string>;
}

/**
 * TODO
 * DBとの連携
 * ①domain(orgin)での認証
 * ②アクセストークンを受け取っての認証
 * ③ログ
 * ④スタッフ対応
 * ⑤ルームの人数制御
 */
@WebSocketGateway({ adapter: '', namespace: 'room' })
export class RoomGateway implements OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  afterInit(instance) {
    /** 例 ドメインでの認証をかけられる */
    /** 
    const origins = environment.socketIoAllowOrigin;
    const server: Server = instance.server;
    server.origins(origins);
    */
  }

  async handleDisconnect(client: Socket) {
    console.log('disconnected' + client.id);
    await this.disconnectClient(client);
  }

  private static redisClient(client) {
    const redisClient: RedisClient = client.adapter.pubClient;
    const redisGet: RedisGet = promisify(redisClient.get).bind(redisClient);

    const redisSet: RedisSet = promisify(redisClient.set).bind(redisClient);

    return { redisClient, redisGet, redisSet };
  }

  @SubscribeMessage(WsEventConstant.Client.RoomJoin)
  async roomJoin(
    @MessageBody() req: { roomName: string },
    @ConnectedSocket() client: Socket
  ) {
    try {
      const { redisClient, redisSet, redisGet } = RoomGateway.redisClient(
        client
      );
      const roomClientInfo: RoomClientInfo = {
        clientId: client.id,
        roomName: req?.roomName,
      };
      console.log('roomJoinEvent', client.id);

      client.join(req.roomName);
      /** Redis ルームにユーザーを追加 */
      redisClient.lpush(req.roomName, JSON.stringify(roomClientInfo));

      /** クライアント情報の保存処理 */
      const clientInfo: ClientInfo = JSON.parse(await redisGet(client.id)) || {
        clientId: client.id,
        roomList: [],
      };
      clientInfo.roomList.push({ roomName: req.roomName });
      await redisSet(client.id, JSON.stringify(clientInfo));

      /** ルームに入っているユーザを取得して、返す */
      redisClient.lrange(
        req.roomName,
        0,
        99,
        (err, reply: RoomClientInfo[]) => {
          console.log(reply);
          /** 新規参加者にはメンバー全員の情報を返す */
          this.server.to(client.id).emit(WsEventConstant.Server.RoomMembers, {
            clientList: reply,
          });
          /** 既に参加しているメンバーには、参加者の情報を返す */
          client.to(req.roomName).emit(WsEventConstant.Server.RoomMemberJoin, {
            client: roomClientInfo,
          });
        }
      );

      console.log('client joined');
    } catch (e) {
      console.error(e);
      await this.disconnectClient(client, e);
    }
  }

  @SubscribeMessage(WsEventConstant.Client.RoomLeave)
  async roomLeave(
    @MessageBody() req: { roomName: string },
    @ConnectedSocket() client: Socket
  ) {
    try {
      console.log('roomLeaveEvent', client.id);
      const { redisClient, redisSet, redisGet } = RoomGateway.redisClient(
        client
      );
      const roomClientInfo: RoomClientInfo = {
        clientId: client.id,
        roomName: req?.roomName,
      };

      client.leave(req.roomName);
      /** Redis ルームにユーザーを追加 */
      await promisify(redisClient.lrem).bind(redisClient)(
        req.roomName,
        0,
        JSON.stringify({
          clientId: client.id,
          roomName: req.roomName,
        })
      );
      /** ルーム情報を保存 */
      const clientInfo: ClientInfo = JSON.parse(await redisGet(client.id)) || {
        clientId: client.id,
        roomList: [],
      };

      clientInfo.roomList = clientInfo.roomList.filter(
        (room) => room.roomName !== req?.roomName
      );
      await redisSet(client.id, JSON.stringify(clientInfo));

      this.server
        .to(req.roomName)
        .emit(WsEventConstant.Server.RoomMemberLeave, {
          client: roomClientInfo,
        });
      console.log('client leaved');
    } catch (e) {
      console.error(e);
      await this.disconnectClient(client, e);
    }
  }

  @SubscribeMessage(WsEventConstant.Client.RoomSendMessage)
  async roomSendMessage(
    @MessageBody() req: { roomName: string; message: string },
    @ConnectedSocket() client: Socket
  ) {
    try {
      const { redisClient } = RoomGateway.redisClient(client);
      const roomMessage: RoomMessageModel = {
        clientId: client.id,
        content: req?.message,
      };
      /** messageをRedisに保存 */
      redisClient.lpush(`${req.roomName}_MESSAGE`, JSON.stringify(roomMessage));

      this.server
        .to(req.roomName)
        .emit(WsEventConstant.Server.RoomMessage, roomMessage);
    } catch (e) {
      console.error(e);
      if (e.name === 'NotAuthorized') {
        await this.disconnectClient(client, e);
      }
    }
  }

  @SubscribeMessage(WsEventConstant.Client.RoomTelStart)
  async roomTelStart(
    @MessageBody() req: { roomName: string },
    @ConnectedSocket() client: Socket
  ) {
    const { redisClient } = RoomGateway.redisClient(client);
    redisClient.lrange(req.roomName, 0, 99, (err, roomClientList: []) => {
      console.log(roomClientList);
      /** 新規参加者にはメンバー全員の情報を返す */

      const clientTokenList: {
        tokenList: { clientId: string; token: string; isMaster: boolean }[];
      }[] = [];
      roomClientList.forEach((roomClient) => {
        clientTokenList.push({ tokenList: [] });
      });

      /**
       * それぞれのメンバーのtokenを割り当てる
       * 最後の一人は全てがviewer
       **/
      for (let i = 0; i < roomClientList.length - 1; i++) {
        const token = this.getAkvsToken();
        clientTokenList[i].tokenList.push({
          clientId: JSON.parse(roomClientList[i] as string).clientId,
          token: token,
          isMaster: true,
        });
        for (let j = i + 1; j < roomClientList.length; j++) {
          clientTokenList[j].tokenList.push({
            clientId: JSON.parse(roomClientList[i] as string).clientId,
            token: token,
            isMaster: false,
          });
        }
      }
      /** メンバーにTokenを送る */
      for (let i = 0; i < roomClientList.length; i++) {
        this.server
          .to(JSON.parse(roomClientList[i] as string).clientId)
          .emit(WsEventConstant.Server.RoomTel, clientTokenList[i]);
      }
    });
  }

  async disconnectClient(client: Socket, error: Error = null) {
    if (error) {
      client.error({ message: error.message, name: error.name });
    }
    client.disconnect(true);

    const { redisClient, redisSet, redisGet } = RoomGateway.redisClient(client);
    const clientInfo: ClientInfo = JSON.parse(await redisGet(client.id)) || {
      clientId: client.id,
      roomList: [],
    };
    console.log(clientInfo);
    clientInfo.roomList.forEach(async (room) => {
      client.leave(room.roomName);

      await promisify(redisClient.lrem).bind(redisClient)(
        room.roomName,
        0,
        JSON.stringify({
          clientId: client.id,
          roomName: room.roomName,
        })
      );
      /** ルーム情報を保存 */
    });
    redisClient.del(client.id);
  }

  /**
   * Amazon Kinesis Video StreamのTokenを返す
   * TODO DBから取得する
   */
  private getAkvsToken() {
    return 'xxxxxxxx';
  }
}
