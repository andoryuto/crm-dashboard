/**
 * 安否確認ダッシュボード
 * 
 * 機能:
 * - 従業員の安否状況概要表示
 * - 部署別回答率の可視化
 * - 安否状況の分布表示
 */

import React from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Paper,
    Chip
} from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    CheckCircle as CheckCircleIcon,
    Warning as WarningIcon,
    DirectionsRun as EvacuatingIcon,
    Help as HelpIcon
} from '@mui/icons-material';
import { Employee } from './safetyMockData'; // この行を追加

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

interface SafetyCheckDashboardProps {
    employees: Employee[];
}

// サンプルデータ
const mockSafetyData = {
    totalEmployees: 150,
    responded: 132,
    safe: 110,
    injured: 8,
    evacuating: 14,
    unknown: 18,
    departments: [
        { name: '営業部', total: 40, responded: 38, safe: 32, injured: 2, evacuating: 4 },
        { name: '開発部', total: 35, responded: 33, safe: 28, injured: 1, evacuating: 4 },
        { name: '総務部', total: 25, responded: 23, safe: 21, injured: 1, evacuating: 1 },
        { name: 'マーケティング部', total: 30, responded: 25, safe: 19, injured: 2, evacuating: 4 },
        { name: '人事部', total: 20, responded: 13, safe: 10, injured: 2, evacuating: 1 }
    ]
};

const SafetyCheckDashboard: React.FC<SafetyCheckDashboardProps> = ({ employees }) => {
    const responseRate = Math.round((mockSafetyData.responded / mockSafetyData.totalEmployees) * 100);

    // 部署別回答率データ
    const departmentChartData = {
        labels: mockSafetyData.departments.map(dept => dept.name),
        datasets: [
            {
                label: '回答済み',
                data: mockSafetyData.departments.map(dept => dept.responded),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: '未回答',
                data: mockSafetyData.departments.map(dept => dept.total - dept.responded),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };

    // 安否状況分布データ
    const safetyStatusData = {
        labels: ['安全', '負傷', '避難中', '未回答'],
        datasets: [
            {
                data: [mockSafetyData.safe, mockSafetyData.injured, mockSafetyData.evacuating, mockSafetyData.unknown],
                backgroundColor: [
                    '#4BC0C0',
                    '#FFCE56',
                    '#9966FF',
                    '#FF6384'
                ]
            }
        ]
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                安否確認ダッシュボード
            </Typography>

            {/* KPIカード */}
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                marginBottom: 3
            }}>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            総従業員数
                        </Typography>
                        <Typography variant="h4" component="div">
                            {mockSafetyData.totalEmployees}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            人
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            回答率
                        </Typography>
                        <Typography variant="h4" component="div">
                            {responseRate}%
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {mockSafetyData.responded}/{mockSafetyData.totalEmployees}人
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            安全確認済み
                        </Typography>
                        <Typography variant="h4" component="div" sx={{ color: '#4BC0C0' }}>
                            {mockSafetyData.safe}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            人
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>
                            要注意
                        </Typography>
                        <Typography variant="h4" component="div" sx={{ color: '#FF6384' }}>
                            {mockSafetyData.injured + mockSafetyData.evacuating}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            負傷・避難中
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* グラフエリア */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Paper sx={{ padding: 2, flex: '2 1 400px' }}>
                    <Typography variant="h6" gutterBottom>
                        部署別回答状況
                    </Typography>
                    <Bar data={departmentChartData} />
                </Paper>

                <Paper sx={{ padding: 2, flex: '1 1 300px' }}>
                    <Typography variant="h6" gutterBottom>
                        安否状況分布
                    </Typography>
                    <Doughnut data={safetyStatusData} />

                    {/* 状況別サマリー */}
                    <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Chip
                                icon={<CheckCircleIcon />}
                                label="安全"
                                sx={{ backgroundColor: '#4BC0C0', color: 'white' }}
                                size="small"
                            />
                            <Typography variant="body2">{mockSafetyData.safe}人</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Chip
                                icon={<WarningIcon />}
                                label="負傷"
                                sx={{ backgroundColor: '#FFCE56', color: 'black' }}
                                size="small"
                            />
                            <Typography variant="body2">{mockSafetyData.injured}人</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Chip
                                icon={<EvacuatingIcon />}
                                label="避難中"
                                sx={{ backgroundColor: '#9966FF', color: 'white' }}
                                size="small"
                            />
                            <Typography variant="body2">{mockSafetyData.evacuating}人</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Chip
                                icon={<HelpIcon />}
                                label="未回答"
                                sx={{ backgroundColor: '#FF6384', color: 'white' }}
                                size="small"
                            />
                            <Typography variant="body2">{mockSafetyData.unknown}人</Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default SafetyCheckDashboard;