import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import './App.css';

function App() {
  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        CRM Dashboard
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Material-UI テスト中...
      </Typography>
      <Button variant="contained" color="primary" size="large">
        テストボタン
      </Button>
    </Container>
  );
}

export default App;