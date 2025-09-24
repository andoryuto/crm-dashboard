/**
 * CRMダッシュボード メインアプリケーション
 * 
 * 機能:
 * - ナビゲーション管理（ダッシュボード/顧客一覧の切り替え）
 * - 顧客データの状態管理
 * - Material-UI AppBarによるヘッダー表示
 */

import React, { useState } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from '@mui/material';
import { Dashboard as DashboardIcon, People as PeopleIcon } from '@mui/icons-material';
import CustomerList from './CustomerList';
import Dashboard from './Dashboard';
import { mockCustomers as initialCustomers, Customer } from './mockData';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'customers'>('dashboard');
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  const handleAddCustomer = (newCustomerData: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...newCustomerData,
      id: Math.max(...customers.map(c => c.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0] // YYYY-MM-DD形式
    };
    setCustomers([...customers, newCustomer]);
  };

  // 顧客更新処理
  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
  };

  // 顧客削除処理
  const handleDeleteCustomer = (customerId: number) => {
    setCustomers(prevCustomers =>
      prevCustomers.filter(customer => customer.id !== customerId)
    );
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRM Dashboard
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              color="inherit"
              startIcon={<DashboardIcon />}
              onClick={() => setCurrentPage('dashboard')}
              variant={currentPage === 'dashboard' ? 'outlined' : 'text'}
            >
              ダッシュボード
            </Button>
            <Button
              color="inherit"
              startIcon={<PeopleIcon />}
              onClick={() => setCurrentPage('customers')}
              variant={currentPage === 'customers' ? 'outlined' : 'text'}
            >
              顧客一覧
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 2 }}>
        {currentPage === 'dashboard' && <Dashboard customers={customers} />}
        {currentPage === 'customers' && (
          <CustomerList
            customers={customers}
            onAddCustomer={handleAddCustomer}
            onUpdateCustomer={handleUpdateCustomer}
            onDeleteCustomer={handleDeleteCustomer}
          />
        )}
      </Container>
    </>
  );
}

export default App;