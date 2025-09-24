# CRM Dashboard

React + TypeScript で構築した顧客管理システムです。

## 技術スタック

- **フロントエンド**: React 18.2.0, TypeScript
- **UI フレームワーク**: Material-UI
- **データ可視化**: Chart.js, react-chartjs-2
- **テスト**: Jest, React Testing Library
- **デプロイ**: Vercel
- **バージョン管理**: Git, GitHub

## 実装機能

- 顧客一覧表示
- リアルタイム検索（名前、会社名、メールアドレス）
- 新規顧客追加
- 統計ダッシュボード（総顧客数、新規顧客数、会社数）
- データ可視化（棒グラフ、円グラフ）
- レスポンシブデザイン対応

## デモサイト

[https://crm-dashboard-pied-beta.vercel.app/](https://crm-dashboard-pied-beta.vercel.app/)

## セットアップ方法
```bash
# リポジトリのクローン
git clone https://github.com/andoryuto/crm-dashboard.git

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start

# テスト実行
npm test