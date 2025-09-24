/**
 * モックデータ定義
 * 
 * 開発・テスト用の顧客データを提供
 * 将来的にはREST APIまたはデータベースに置き換え予定
 */

export interface Customer {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  createdAt: string;
}

export const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "田中太郎",
    company: "株式会社サンプル",
    email: "tanaka@sample.com",
    phone: "090-1234-5678",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    name: "佐藤花子",
    company: "テスト株式会社",
    email: "sato@test.com",
    phone: "080-9876-5432",
    createdAt: "2024-02-20"
  },
  {
    id: 3,
    name: "山田次郎",
    company: "デモ企業",
    email: "yamada@demo.com",
    phone: "070-1111-2222",
    createdAt: "2024-03-10"
  },
  {
    id: 4,
    name: "鈴木美咲",
    company: "サンプル商事",
    email: "suzuki@sample-trade.com",
    phone: "090-3333-4444",
    createdAt: "2024-03-25"
  },
  {
    id: 5,
    name: "高橋健",
    company: "株式会社テクノロジー",
    email: "takahashi@tech.com",
    phone: "080-5555-6666",
    createdAt: "2024-04-05"
  }
];

export { };