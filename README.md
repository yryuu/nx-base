# NxBase

Nrwl を用いた  
backend:nestjs  
clinet:angular  
application(ハイブリットアプリ):angular+cordova

の基盤プロジェクト

# init setup

Node Js 14:15.1 動作済み

初回セットアップ

```
npm install
```

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

application

```
npm run start cordova
```

# cordova アプリ作成

android

```
npm run build cordova
npx cordova build android
```
