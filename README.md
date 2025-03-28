# 営業管理システム

営業活動の進捗を管理し、パフォーマンスを可視化するためのWebアプリケーションです。

## 主な機能

### 1. ダッシュボード
- 月次の営業活動データの集計表示
- 主要指標（KPI）のリアルタイム計算
  - アプローチ数
  - アポイント数（取得率）
  - 商談数（商談化率）
  - 契約数（成約率）
- 月別フィルタリング

### 2. 日次活動入力
- 担当者別の活動データ入力
- 以下の項目を記録
  - アプローチ数
  - アポイント数
  - 商談数
  - 契約数
- 同日のデータは上書き保存

### 3. 担当者管理
- 担当者の追加・削除
- 担当者一覧の表示

### 4. データ管理
- 活動データの編集機能
- 活動データの削除機能
- データの整合性チェック

## 技術スタック

- フロントエンド
  - Next.js 14
  - React
  - TypeScript
  - Tailwind CSS
  - shadcn/ui

- バックエンド
  - Google Apps Script
  - Google Sheets API

## セットアップ

1. リポジトリのクローン
```bash
git clone [リポジトリURL]
cd 営業管理
```

2. 依存パッケージのインストール
```bash
npm install
```

3. 環境変数の設定
`.env.local`ファイルを作成し、以下の変数を設定：
```
NEXT_PUBLIC_GAS_URL=あなたのGoogle Apps ScriptのデプロイURL
```

4. 開発サーバーの起動
```bash
npm run dev
```

## 使い方

1. 担当者の登録
   - 「担当者管理」タブで担当者を登録

2. 日次活動の入力
   - 「日次入力」タブで担当者を選択し、その日の活動データを入力
   - 同じ日のデータは上書きされます

3. 実績の確認
   - 「全体ダッシュボード」タブで月次の集計データを確認
   - 「担当者別」タブで個人のパフォーマンスを確認

4. データの修正
   - 活動データ一覧の編集ボタンから修正可能
   - 削除も可能（要確認）

## 注意事項

- データの削除は元に戻せません
- 月次データは月初から月末までの集計です
- 同じ日付のデータを入力すると上書きされます
- Google Sheets APIの制限に注意してください

## ライセンス

MIT License 