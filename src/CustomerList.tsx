/**
 * 顧客一覧コンポーネント
 * 
 * 機能:
 * - 顧客データのテーブル表示
 * - リアルタイム検索・フィルター（名前、会社名、メール対応）
 * - 新規顧客追加ダイアログの表示制御
 * - レスポンシブデザイン対応
 */

import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    TextField,
    Button
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { Customer } from './mockData';
import AddCustomerDialog from './AddCustomerDialog';

interface CustomerListProps {
    customers: Customer[];
    onAddCustomer: (newCustomerData: Omit<Customer, 'id'>) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ customers, onAddCustomer }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddCustomer = (newCustomerData: Omit<Customer, 'id'>) => {
        onAddCustomer(newCustomerData);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                顧客一覧
            </Typography>

            {/* 検索バーと新規追加ボタン */}
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                <TextField
                    label="顧客を検索"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ marginRight: 1 }} />
                    }}
                    sx={{ flexGrow: 1 }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{ minWidth: '120px' }}
                    onClick={() => setDialogOpen(true)}
                >
                    新規追加
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>名前</TableCell>
                            <TableCell>会社</TableCell>
                            <TableCell>メール</TableCell>
                            <TableCell>電話番号</TableCell>
                            <TableCell>登録日</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredCustomers.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell>{customer.id}</TableCell>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.company}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.createdAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <AddCustomerDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onAdd={handleAddCustomer}
            />
        </Box>
    );
};

export default CustomerList;