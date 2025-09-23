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

  const handleAddCustomer = (newCustomerData: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...newCustomerData,
      id: Math.max(...customers.map(c => c.id)) + 1
    };
    setCustomers([...customers, newCustomer]);
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

      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        {currentPage === 'dashboard' && <Dashboard customers={customers} />}
        {currentPage === 'customers' && (
          <CustomerList
            customers={customers}
            onAddCustomer={handleAddCustomer}
          />
        )}
      </Container>
    </>
  );
}

export default App;