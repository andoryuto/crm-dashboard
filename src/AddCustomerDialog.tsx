import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';
import { Customer } from './mockData';

interface AddCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (customer: Omit<Customer, 'id'>) => void;
}

const AddCustomerDialog: React.FC<AddCustomerDialogProps> = ({
  open,
  onClose,
  onAdd
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    createdAt: new Date().toISOString().split('T')[0] // 今日の日付
  });

  const handleSubmit = () => {
    if (formData.name && formData.company && formData.email) {
      onAdd(formData);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        createdAt: new Date().toISOString().split('T')[0]
      });
      onClose();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>新規顧客追加</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="名前"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="会社名"
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="メールアドレス"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="電話番号"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={handleSubmit} variant="contained">
          追加
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCustomerDialog;