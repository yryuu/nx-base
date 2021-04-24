export const environment = {
  production: true,
  port: 81,
  prefix: 'ws',
  socketIoAllowOrigin: 'http://localhost:8081',

  /**
   * DB接続情報
   * [mysql / mariadb connection options](https://orkhan.gitbook.io/typeorm/docs/connection-options#mysql-mariadb-connection-options)
   */
  dbconfig: {
    host: 'localhost',
    port: 3306,
    username: 'smoothcall',
    password: 'pass',
    database: 'smoothcall',
    synchronize: false,
  },
};
