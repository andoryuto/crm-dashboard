/**
 * 新規顧客追加ダイアログコンポーネント
 * 
 * 機能:
 * - Material-UI Dialogによるモーダル表示
 * - フォームバリデーション
 * - 新規顧客データの作成・追加
 * - 顧客データの編集機能
 */

import React, { useState, useEffect } from 'react';
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
  onAdd: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
  initialData?: Customer | null;
  isEdit?: boolean;
}

const AddCustomerDialog: React.FC<AddCustomerDialogProps> = ({
  open,
  onClose,
  onAdd,
  initialData = null,
  isEdit = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: ''
  });

  // 編集時の初期データ設定
  useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        name: initialData.name,
        company: initialData.company,
        email: initialData.email,
        phone: initialData.phone
      });
    } else {
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: ''
      });
    }
  }, [initialData, isEdit, open]);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.company && formData.email && formData.phone) {
      onAdd(formData);
      setFormData({ name: '', company: '', email: '', phone: '' });
    }
  };

  const handleClose = () => {
    setFormData({ name: '', company: '', email: '', phone: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEdit ? '顧客情報編集' : '新規顧客追加'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="名前"
            value={formData.name}
            onChange={handleInputChange('name')}
            fullWidth
            required
          />
          <TextField
            label="会社名"
            value={formData.company}
            onChange={handleInputChange('company')}
            fullWidth
            required
          />
          <TextField
            label="メールアドレス"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            fullWidth
            required
          />
          <TextField
            label="電話番号"
            value={formData.phone}
            onChange={handleInputChange('phone')}
            fullWidth
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button onClick={handleSubmit} variant="contained">
          {isEdit ? '更新' : '追加'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCustomerDialog;