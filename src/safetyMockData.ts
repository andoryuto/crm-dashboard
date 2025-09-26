// 従業員データ型定義
export interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    department: string;
    position: string;
    emergencyContact: string;
    emergencyPhone: string;
    createdAt: string;
}

// 安否確認回答データ型
export interface SafetyResponse {
    id: number;
    employeeId: number;
    checkId: number;
    status: 'safe' | 'injured' | 'evacuating' | 'unknown';
    location: string;
    message: string;
    respondedAt: string;
}

// 安否確認送信データ型
export interface SafetyCheck {
    id: number;
    title: string;
    message: string;
    sentAt: string;
    targetDepartments: string[];
    responses: SafetyResponse[];
}

// サンプル従業員データ
export const mockEmployees: Employee[] = [
    {
        id: 1,
        name: '田中太郎',
        email: 'tanaka@company.com',
        phone: '090-1234-5678',
        department: '営業部',
        position: '課長',
        emergencyContact: '田中花子',
        emergencyPhone: '090-8765-4321',
        createdAt: '2024-01-15'
    },
    // ... 他の従業員データ
];