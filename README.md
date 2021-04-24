# NxBase

Nrlw を用いた  
api:nestjs  
clinet:angular
application(ストアにアップロードできる):angular+cordova
の基盤プロジェクト

# Command

- client と cordova の Angular コンポーネント作成方法

```
npx nx generate @nrwl/angular:component component/コンポーネント名 --project=(cordova or client) --module app.module
```

- backend の Nest コントローラ作成方法

```
npx nx generate @nrwl/nest:controller --project=backend app/controller/コントローラ名
```

# ローカル実行

backend

```
npm run start backend
```

client

```
npm run start client
```

server

```
npm run start cordova
```

# cordova アプリ作成

android

```
npm run build cordova
cordova build android
```
