import React from 'react';
import { Container } from '@mui/material';
import CustomerList from './CustomerList';
import './App.css';

function App() {
  return (
    <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
      <CustomerList />
    </Container>
  );
}

export default App;