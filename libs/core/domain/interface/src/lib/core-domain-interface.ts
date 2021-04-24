export function coreDomainInterface(): string {
  return 'core-domain-interface';
}

/**
 * WSで送るメッセージモデル(Redisに保存)
 */
export interface RoomMessageModel {
  clientId: string;
  /** メッセージ */
  content: string;
}

/**
 * WSのクライアント情報 Redisにルーム単位で保存する
 */
export interface RoomClientInfo {
  /** 既に入っているルーム */
  roomName: string;
  clientId: string;
}

/**
 * WSのクライアント情報 RedisにClient単位で保存する
 */
export interface ClientInfo {
  /** 複数ルームに対応させる */
  roomList: { roomName: string }[];
  clientId: string;
}
