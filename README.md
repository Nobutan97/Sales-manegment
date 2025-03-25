# 営業管理システム

## 概要
このプロジェクトは、営業活動の管理と分析を行うためのWebアプリケーションです。

## 主な機能
- 日次営業活動の入力
- 担当者別のKPI管理
- 案件パイプライン管理
- 活動分析とレポート

## 技術スタック
- Next.js 14
- TypeScript
- Tailwind CSS
- Google Sheets API

## セットアップ方法

1. リポジトリのクローン
```bash
git clone https://github.com/Nobutan97/Sales-manegment.git
cd Sales-manegment
```

2. 依存パッケージのインストール
```bash
npm install
```

3. 環境変数の設定
`.env.local`ファイルを作成し、以下の環境変数を設定してください：
```
GOOGLE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=your-private-key
SPREADSHEET_ID=your-spreadsheet-id
```

4. 開発サーバーの起動
```bash
npm run dev
```

## スプレッドシートの設定
1. Google Cloud Consoleで新しいプロジェクトを作成
2. Google Sheets APIを有効化
3. サービスアカウントを作成し、認証情報をダウンロード
4. スプレッドシートを作成し、サービスアカウントに編集権限を付与

## ライセンス
MIT 