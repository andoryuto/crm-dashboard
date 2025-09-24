import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('CRMダッシュボードが表示される', () => {
  render(<App />);
  const dashboardTitle = screen.getByText('CRM Dashboard');
  expect(dashboardTitle).toBeInTheDocument();
});

test('ダッシュボードボタンが表示される', () => {
  render(<App />);
  const dashboardButton = screen.getByRole('button', { name: /ダッシュボード/ });
  expect(dashboardButton).toBeInTheDocument();
});