# Bluesky X風クライアント インストール・デプロイ手順

## 必要条件
- Node.js 18.0.0以上
- pnpm（推奨）またはnpm
- Git（オプション）

## インストール手順

### 1. ソースコードの展開

ダウンロードしたZIPファイル（`bluesky-x-client-src.zip`）を任意のディレクトリに展開します。

```bash
# Ubuntuの場合
unzip bluesky-x-client-src.zip -d /path/to/destination

# または手動で展開してください
```

### 2. 依存関係のインストール

プロジェクトディレクトリに移動し、依存関係をインストールします。

```bash
cd bluesky-x-client

# pnpmを使用する場合（推奨）
pnpm install

# npmを使用する場合
npm install
```

### 3. 開発サーバーの起動

ローカル開発サーバーを起動して、アプリケーションをテストします。

```bash
# pnpmを使用する場合
pnpm dev

# npmを使用する場合
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスして、アプリケーションが正常に動作することを確認します。

### 4. 本番用ビルドの作成

本番環境にデプロイする前に、最適化されたビルドを作成します。

```bash
# pnpmを使用する場合
pnpm build

# npmを使用する場合
npm run build
```

### 5. 本番サーバーの起動

ビルドしたアプリケーションを本番モードで起動します。

```bash
# pnpmを使用する場合
pnpm start

# npmを使用する場合
npm start
```

## デプロイ手順

### Vercelへのデプロイ（推奨）

1. [Vercel](https://vercel.com)にアカウントを作成し、ログインします。
2. 「New Project」をクリックします。
3. GitHubなどのリポジトリからプロジェクトをインポートするか、ローカルディレクトリからデプロイします。
4. 設定を確認し、「Deploy」をクリックします。

### Netlifyへのデプロイ

1. [Netlify](https://netlify.com)にアカウントを作成し、ログインします。
2. 「New site from Git」をクリックします。
3. GitHubなどのリポジトリからプロジェクトをインポートするか、ビルドしたファイルを直接アップロードします。
4. ビルドコマンドに `npm run build` または `pnpm build` を設定します。
5. 公開ディレクトリに `.next` を設定します。
6. 「Deploy site」をクリックします。

### 自前のサーバーへのデプロイ

1. サーバー上に Node.js 環境をセットアップします。
2. プロジェクトファイルをサーバーにアップロードします。
3. 依存関係をインストールします: `pnpm install` または `npm install`
4. ビルドを実行します: `pnpm build` または `npm run build`
5. PM2などのプロセスマネージャーを使用して、アプリケーションを起動します:

```bash
# PM2を使用する場合
npm install -g pm2
pm2 start npm --name "bluesky-x-client" -- start
```

## PWA機能の利用

このアプリケーションはPWA（Progressive Web App）として実装されています。ブラウザでアプリケーションにアクセスすると、ホーム画面に追加するオプションが表示されます。これにより、ネイティブアプリのような体験が可能になります。

## トラブルシューティング

### 依存関係のインストールに失敗する場合

Node.jsのバージョンが古い可能性があります。Node.js 18以上を使用していることを確認してください。

```bash
node -v
```

### ビルドに失敗する場合

1. `node_modules` ディレクトリを削除して、依存関係を再インストールしてみてください。

```bash
rm -rf node_modules
pnpm install
```

2. キャッシュをクリアしてみてください。

```bash
# pnpmの場合
pnpm store prune

# npmの場合
npm cache clean --force
```

### その他の問題

問題が解決しない場合は、以下の情報を確認してください：

- Node.jsとpnpm/npmのバージョン
- オペレーティングシステムの種類とバージョン
- エラーメッセージの詳細

## 注意事項

- このアプリケーションはBluesky APIを使用しています。APIの仕様変更により、一部機能が動作しなくなる可能性があります。
- 本番環境で使用する場合は、セキュリティ対策を十分に行ってください。
- 個人情報の取り扱いには十分注意してください。
