/**
 * 顧客一覧コンポーネント
 * 
 * 機能:
 * - 顧客データのテーブル表示
 * - リアルタイム検索・フィルター（名前、会社名、メール対応）
 * - 新規顧客追加ダイアログの表示制御
 * - 顧客の編集・削除機能
 * - レスポンシブデザイン対応
 */

import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Container
} from '@mui/material';
import { Customer } from './mockData';
import AddCustomerDialog from './AddCustomerDialog';

interface CustomerListProps {
    customers: Customer[];
    onAddCustomer: (customer: Omit<Customer, 'id' | 'createdAt'>) => void;
    onUpdateCustomer: (customer: Customer) => void;
    onDeleteCustomer: (id: number) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({
    customers,
    onAddCustomer,
    onUpdateCustomer,
    onDeleteCustomer
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    // 検索フィルター
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 顧客追加処理
    const handleAddCustomer = (customerData: Omit<Customer, 'id' | 'createdAt'>) => {
        onAddCustomer(customerData);
        setOpenDialog(false);
    };

    // 編集処理
    const handleEditCustomer = (customer: Customer) => {
        setEditingCustomer(customer);
        setOpenDialog(true);
    };

    // 更新処理
    const handleUpdateCustomer = (customerData: Omit<Customer, 'id' | 'createdAt'>) => {
        if (editingCustomer) {
            const updatedCustomer: Customer = {
                ...editingCustomer,
                ...customerData
            };
            onUpdateCustomer(updatedCustomer);
            setEditingCustomer(null);
            setOpenDialog(false);
        }
    };

    // 削除処理
    const handleDeleteCustomer = (id: number) => {
        if (window.confirm('この顧客を削除してもよろしいですか？')) {
            onDeleteCustomer(id);
        }
    };

    // ダイアログを閉じる処理
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingCustomer(null);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    顧客一覧
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                        label="検索（名前、会社名、メールアドレス）"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ flexGrow: 1 }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => setOpenDialog(true)}
                    >
                        新規顧客追加
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>名前</TableCell>
                                <TableCell>会社名</TableCell>
                                <TableCell>メールアドレス</TableCell>
                                <TableCell>電話番号</TableCell>
                                <TableCell>登録日</TableCell>
                                <TableCell>アクション</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCustomers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.company}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>{customer.createdAt}</TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => handleEditCustomer(customer)}
                                            sx={{ mr: 1 }}
                                        >
                                            編集
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDeleteCustomer(customer.id)}
                                        >
                                            削除
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <AddCustomerDialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    onAdd={editingCustomer ? handleUpdateCustomer : handleAddCustomer}
                    initialData={editingCustomer}
                    isEdit={!!editingCustomer}
                />
            </Box>
        </Container>
    );
};

export default CustomerList;