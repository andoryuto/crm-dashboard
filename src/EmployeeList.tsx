/**
 * 従業員一覧コンポーネント
 * 
 * 機能:
 * - 従業員データの一覧表示
 * - 追加・編集・削除機能
 * - 部署別フィルタリング
 * - 安否確認対象者としての管理
 */

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Chip,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Business as BusinessIcon,
    Phone as PhoneIcon,
    Email as EmailIcon
} from '@mui/icons-material';
import { Employee } from './safetyMockData';

interface EmployeeListProps {
    employees: Employee[];
    onAddEmployee: (employee: Omit<Employee, 'id' | 'createdAt'>) => void;
    onUpdateEmployee: (employee: Employee) => void;
    onDeleteEmployee: (employeeId: number) => void;
}

const departments = ['営業部', '開発部', '総務部', 'マーケティング部', '人事部'];

const EmployeeList: React.FC<EmployeeListProps> = ({
    employees,
    onAddEmployee,
    onUpdateEmployee,
    onDeleteEmployee
}) => {
    const [open, setOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        position: '',
        emergencyContact: '',
        emergencyPhone: ''
    });

    const filteredEmployees = employees.filter(employee => {
        const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = !departmentFilter || employee.department === departmentFilter;
        return matchesSearch && matchesDepartment;
    });

    const handleOpen = (employee?: Employee) => {
        if (employee) {
            setEditingEmployee(employee);
            setFormData({
                name: employee.name,
                email: employee.email,
                phone: employee.phone,
                department: employee.department,
                position: employee.position,
                emergencyContact: employee.emergencyContact,
                emergencyPhone: employee.emergencyPhone
            });
        } else {
            setEditingEmployee(null);
            setFormData({
                name: '',
                email: '',
                phone: '',
                department: '',
                position: '',
                emergencyContact: '',
                emergencyPhone: ''
            });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingEmployee(null);
    };

    const handleSubmit = () => {
        if (editingEmployee) {
            onUpdateEmployee({
                ...editingEmployee,
                ...formData
            });
        } else {
            onAddEmployee(formData);
        }
        handleClose();
    };

    const handleDelete = (employeeId: number) => {
        if (window.confirm('この従業員を削除しますか？')) {
            onDeleteEmployee(employeeId);
        }
    };

    const getDepartmentColor = (department: string) => {
        const colors: Record<string, string> = {
            '営業部': 'primary',
            '開発部': 'secondary',
            '総務部': 'success',
            'マーケティング部': 'warning',
            '人事部': 'info'
        };
        return colors[department] || 'default';
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    従業員一覧
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                >
                    従業員追加
                </Button>
            </Box>

            {/* 検索・フィルタエリア */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                    label="検索（名前・メール）"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ flex: 1 }}
                />
                <FormControl sx={{ minWidth: 200 }}>
                    <InputLabel>部署フィルタ</InputLabel>
                    <Select
                        value={departmentFilter}
                        label="部署フィルタ"
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                    >
                        <MenuItem value="">すべて</MenuItem>
                        {departments.map((dept) => (
                            <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* 従業員一覧テーブル */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>名前</TableCell>
                            <TableCell>部署</TableCell>
                            <TableCell>役職</TableCell>
                            <TableCell>メール</TableCell>
                            <TableCell>電話番号</TableCell>
                            <TableCell>緊急連絡先</TableCell>
                            <TableCell>操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredEmployees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>
                                    <Chip
                                        icon={<BusinessIcon />}
                                        label={employee.department}
                                        color={getDepartmentColor(employee.department) as any}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>{employee.position}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <EmailIcon fontSize="small" />
                                        {employee.email}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <PhoneIcon fontSize="small" />
                                        {employee.phone}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    {employee.emergencyContact}
                                    <br />
                                    <Typography variant="caption" color="textSecondary">
                                        {employee.emergencyPhone}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleOpen(employee)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(employee.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* 従業員追加・編集ダイアログ */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    {editingEmployee ? '従業員編集' : '従業員追加'}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField
                            label="氏名"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <FormControl sx={{ flex: 1 }}>
                                <InputLabel>部署</InputLabel>
                                <Select
                                    value={formData.department}
                                    label="部署"
                                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    required
                                >
                                    {departments.map((dept) => (
                                        <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="役職"
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                sx={{ flex: 1 }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="メールアドレス"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                sx={{ flex: 1 }}
                                required
                            />
                            <TextField
                                label="電話番号"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                sx={{ flex: 1 }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="緊急連絡先（氏名）"
                                value={formData.emergencyContact}
                                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                                sx={{ flex: 1 }}
                            />
                            <TextField
                                label="緊急連絡先（電話番号）"
                                value={formData.emergencyPhone}
                                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                                sx={{ flex: 1 }}
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>キャンセル</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {editingEmployee ? '更新' : '追加'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EmployeeList;