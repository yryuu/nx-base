/* eslint-disable @typescript-eslint/no-namespace */
/** Ws イベントの定義
 *
 * 以下の流れで通話コネクションを実現
 * 通話スタートする側 RoomJoin → RoomTelStart
 * 通話を受ける側 RoomJoin(C) → RoomTel(S) → RoomTelJoin(C)
 */
export namespace WsEventConstant {
  /** クライアント発行イベント */
  export namespace Client {
    /** ルームに入るイベント サーバ側では最初の一人はルームをCreateする */
    export const RoomJoin = 'RoomJoin';

    /** ルームを退場するイベント */
    export const RoomLeave = 'RoomLeave';

    /** ルームにメッセージを送る */
    export const RoomSendMessage = 'RoomSendMessage';

    /** ルームで通話を開始する */
    export const RoomTelStart = 'RoomTelStart';

    /** ルームの通話に入る */
    export const RoomTelJoin = 'RoomJoinTel';
  }

  /** サーバ発行イベント */
  export namespace Server {
    /** ルームメンバー全員の情報を返す */
    export const RoomMembers = 'RoomMembers';

    /** 追加したメンバーの情報を返す */
    export const RoomMemberJoin = 'RoomMemberJoin';

    /** メッセージ送信イベント */
    export const RoomMessage = 'RoomMessage';

    /** 退場したメンバーの情報を返す */
    export const RoomMemberLeave = 'RoomMemberLeave';

    /** 通話にメンバーが参加した時のイベント */
    export const RoomTelMemberJoin = 'RoomTelJoin';

    /** 各メンバーに通話イベントを発行 */
    export const RoomTel = 'RoomTel';
  }
}
