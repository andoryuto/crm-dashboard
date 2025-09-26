/**
 * CRMダッシュボード メインアプリケーション
 * 
 * 機能:
 * - ナビゲーション管理（ダッシュボード/顧客一覧/従業員一覧/安否確認/安否確認送信の切り替え）
 * - 顧客・従業員データの状態管理
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
import { Dashboard as DashboardIcon, People as PeopleIcon, Security as SecurityIcon, Send as SendIcon } from '@mui/icons-material';
import CustomerList from './CustomerList';
import Dashboard from './Dashboard';
import SafetyCheckDashboard from './SafetyCheckDashboard';
import EmployeeList from './EmployeeList';
import SafetyCheckSender from './SafetyCheckSender';
import { mockCustomers as initialCustomers, Customer } from './mockData';
import { mockEmployees as initialEmployees, Employee } from './safetyMockData';
import './App.css';

type PageType = 'dashboard' | 'customers' | 'safety' | 'employees' | 'safety-sender';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const handleAddCustomer = (newCustomerData: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...newCustomerData,
      id: Math.max(...customers.map(c => c.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCustomers([...customers, newCustomer]);
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomers(prevCustomers =>
      prevCustomers.map(customer =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
  };

  const handleDeleteCustomer = (customerId: number) => {
    setCustomers(prevCustomers =>
      prevCustomers.filter(customer => customer.id !== customerId)
    );
  };

  // 従業員管理ハンドラー
  const handleAddEmployee = (newEmployeeData: Omit<Employee, 'id' | 'createdAt'>) => {
    const newEmployee: Employee = {
      ...newEmployeeData,
      id: Math.max(...employees.map(e => e.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setEmployees([...employees, newEmployee]);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
  };

  const handleDeleteEmployee = (employeeId: number) => {
    setEmployees(prevEmployees =>
      prevEmployees.filter(employee => employee.id !== employeeId)
    );
  };

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard customers={customers} />;
      case 'customers':
        return (
          <CustomerList
            customers={customers}
            onAddCustomer={handleAddCustomer}
            onUpdateCustomer={handleUpdateCustomer}
            onDeleteCustomer={handleDeleteCustomer}
          />
        );
      case 'employees':
        return (
          <EmployeeList
            employees={employees}
            onAddEmployee={handleAddEmployee}
            onUpdateEmployee={handleUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
          />
        );
      case 'safety':
        return <SafetyCheckDashboard employees={employees} />;
      case 'safety-sender':
        return <SafetyCheckSender employees={employees} />;
      default:
        return <Dashboard customers={customers} />;
    }
  };

  const navigationButtons = [
    {
      key: 'dashboard',
      icon: <DashboardIcon />,
      label: 'ダッシュボード',
      page: 'dashboard' as PageType
    },
    {
      key: 'customers',
      icon: <PeopleIcon />,
      label: '顧客一覧',
      page: 'customers' as PageType
    },
    {
      key: 'employees',
      icon: <PeopleIcon />,
      label: '従業員一覧',
      page: 'employees' as PageType
    },
    {
      key: 'safety',
      icon: <SecurityIcon />,
      label: '安否確認',
      page: 'safety' as PageType
    },
    {
      key: 'safety-sender',
      icon: <SendIcon />,
      label: '安否確認送信',
      page: 'safety-sender' as PageType
    }
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRM Dashboard
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navigationButtons.map((button) => (
              <Button
                key={button.key}
                color="inherit"
                startIcon={button.icon}
                onClick={() => handlePageChange(button.page)}
                variant={currentPage === button.page ? 'outlined' : 'text'}
              >
                {button.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 2 }}>
        {renderCurrentPage()}
      </Container>
    </>
  );
}

export default App;