import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper
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
import { Customer } from './mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DashboardProps {
  customers: Customer[];
}

const Dashboard: React.FC<DashboardProps> = ({ customers }) => {
  // 統計データの計算（mockCustomers を customers に変更）
  const totalCustomers = customers.length;
  const companyCounts = customers.reduce((acc, customer) => {
    acc[customer.company] = (acc[customer.company] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // 今月の新規顧客（簡易版）
  const currentMonth = new Date().getMonth() + 1;
  const thisMonthCustomers = customers.filter(customer => 
    new Date(customer.createdAt).getMonth() + 1 === currentMonth
  ).length;

  // グラフデータ
  const barData = {
    labels: Object.keys(companyCounts),
    datasets: [
      {
        label: '顧客数',
        data: Object.values(companyCounts),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const doughnutData = {
    labels: Object.keys(companyCounts),
    datasets: [
      {
        data: Object.values(companyCounts),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        ダッシュボード
      </Typography>

      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 2, 
        marginBottom: 3 
      }}>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              総顧客数
            </Typography>
            <Typography variant="h4" component="div">
              {totalCustomers}
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              今月の新規
            </Typography>
            <Typography variant="h4" component="div">
              {thisMonthCustomers}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              会社数
            </Typography>
            <Typography variant="h4" component="div">
              {Object.keys(companyCounts).length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              平均顧客/会社
            </Typography>
            <Typography variant="h4" component="div">
              {(totalCustomers / Object.keys(companyCounts).length).toFixed(1)}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Paper sx={{ padding: 2, flex: '2 1 400px' }}>
          <Typography variant="h6" gutterBottom>
            会社別顧客数
          </Typography>
          <Bar data={barData} />
        </Paper>
        
        <Paper sx={{ padding: 2, flex: '1 1 300px' }}>
          <Typography variant="h6" gutterBottom>
            顧客分布
          </Typography>
          <Doughnut data={doughnutData} />
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;