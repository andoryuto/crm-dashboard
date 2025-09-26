# CRM Dashboard with Safety Check System

React + TypeScript で構築した統合企業管理システムです。顧客管理機能に加え、安否確認システムを統合した実用的なWebアプリケーションです。

## 技術スタック

- **フロントエンド**: React 18.2.0, TypeScript
- **UI フレームワーク**: Material-UI
- **データ可視化**: Chart.js, react-chartjs-2
- **テスト**: Jest, React Testing Library
- **デプロイ**: Vercel
- **バージョン管理**: Git, GitHub

## 主要機能

### 顧客管理システム (CRM)
- 顧客一覧表示・検索・フィルタリング
- 新規顧客追加・編集・削除
- 統計ダッシュボード（総顧客数、新規顧客数、会社数）
- データ可視化（棒グラフ、円グラフ）

### 従業員管理システム
- 従業員情報の包括的管理（CRUD操作）
- 部署別フィルタリング・検索機能
- 緊急連絡先管理
- CSV出力対応

### 安否確認システム
- **ダッシュボード**: リアルタイム安否状況の可視化
- **送信機能**: テンプレートベースの一斉送信
- **対象選択**: 全社・部署別・個人別の柔軟な配信
- **履歴管理**: 送信履歴の詳細追跡

## システム特徴

- **実用性**: 企業の実際の業務フローに即した設計
- **拡張性**: 既存システムへの機能追加のベストプラクティス
- **UI/UX**: Material-UIによる統一されたデザインシステム
- **型安全性**: TypeScriptによる堅牢な型定義
- **レスポンシブ**: モバイル・デスクトップ対応

## デモサイト

[https://crm-dashboard-pied-beta.vercel.app/](https://crm-dashboard-pied-beta.vercel.app/)

### 機能デモ
- **ダッシュボード**: 統計情報とグラフ表示
- **顧客一覧**: 検索・フィルタリング機能
- **従業員一覧**: 部署管理・CRUD操作
- **安否確認**: ダッシュボード・送信機能

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

# プロダクションビルド
npm run build