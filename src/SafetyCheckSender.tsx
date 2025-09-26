/**
 * 安否確認送信コンポーネント
 * 
 * 機能:
 * - 安否確認メッセージの作成・送信
 * - 送信対象の選択（全社・部署別・個人別）
 * - メッセージテンプレートの管理
 * - 送信履歴の表示
 */

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Alert,
    Divider
} from '@mui/material';
import {
    Send as SendIcon,
    Warning as WarningIcon,
    CheckCircle as CheckCircleIcon,
    History as HistoryIcon,
    People as PeopleIcon
} from '@mui/icons-material';
import { Employee } from './safetyMockData';

interface SafetyCheckSenderProps {
    employees: Employee[];
}

const messageTemplates = [
    {
        id: 1,
        name: '地震発生時',
        subject: '【緊急】地震発生による安否確認',
        message: '地震が発生しました。以下の項目について回答をお願いします。\n\n1. あなたの安全状況\n2. 現在の居場所\n3. 出社可能かどうか\n\nご回答をお待ちしております。'
    },
    {
        id: 2,
        name: '台風・大雨',
        subject: '【注意】気象警報発令による安否確認',
        message: '気象警報が発令されています。以下について確認させてください。\n\n1. 安全な場所にいるか\n2. 交通機関の状況\n3. 明日の出社予定\n\n安全第一で行動してください。'
    },
    {
        id: 3,
        name: 'その他緊急事態',
        subject: '【緊急】安否確認',
        message: '緊急事態が発生しています。安否確認にご協力ください。'
    }
];

const departments = ['営業部', '開発部', '総務部', 'マーケティング部', '人事部'];

const SafetyCheckSender: React.FC<SafetyCheckSenderProps> = ({ employees }) => {
    const [selectedTemplate, setSelectedTemplate] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [targetType, setTargetType] = useState<'all' | 'department' | 'individual'>('all');
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [sentHistory, setSentHistory] = useState<any[]>([]);

    const handleTemplateChange = (templateId: string) => {
        const template = messageTemplates.find(t => t.id === parseInt(templateId));
        if (template) {
            setSelectedTemplate(templateId);
            setSubject(template.subject);
            setMessage(template.message);
        } else {
            setSelectedTemplate('');
            setSubject('');
            setMessage('');
        }
    };

    const handleDepartmentToggle = (department: string) => {
        setSelectedDepartments(prev =>
            prev.includes(department)
                ? prev.filter(d => d !== department)
                : [...prev, department]
        );
    };

    const handleEmployeeToggle = (employeeId: number) => {
        setSelectedEmployees(prev =>
            prev.includes(employeeId)
                ? prev.filter(id => id !== employeeId)
                : [...prev, employeeId]
        );
    };

    const getTargetCount = () => {
        switch (targetType) {
            case 'all':
                return employees.length;
            case 'department':
                return employees.filter(emp => selectedDepartments.includes(emp.department)).length;
            case 'individual':
                return selectedEmployees.length;
            default:
                return 0;
        }
    };

    const handleSend = () => {
        const newHistory = {
            id: sentHistory.length + 1,
            subject,
            targetType,
            targetCount: getTargetCount(),
            sentAt: new Date().toLocaleString(),
            status: 'sent'
        };
        setSentHistory([newHistory, ...sentHistory]);
        setConfirmDialog(false);

        // フォームリセット
        setSubject('');
        setMessage('');
        setSelectedTemplate('');
        setSelectedDepartments([]);
        setSelectedEmployees([]);
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                安否確認送信
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', lg: 'row' } }}>
                {/* 送信フォーム */}
                <Box sx={{ flex: 2 }}>
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                メッセージ作成
                            </Typography>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>テンプレート選択</InputLabel>
                                <Select
                                    value={selectedTemplate}
                                    label="テンプレート選択"
                                    onChange={(e) => handleTemplateChange(e.target.value)}
                                >
                                    <MenuItem value="">カスタムメッセージ</MenuItem>
                                    {messageTemplates.map((template) => (
                                        <MenuItem key={template.id} value={template.id.toString()}>
                                            {template.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="件名"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                sx={{ mb: 2 }}
                                required
                            />

                            <TextField
                                fullWidth
                                label="メッセージ"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                multiline
                                rows={8}
                                required
                            />
                        </CardContent>
                    </Card>

                    {/* 送信対象選択 */}
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                送信対象選択
                            </Typography>

                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel>送信範囲</InputLabel>
                                <Select
                                    value={targetType}
                                    label="送信範囲"
                                    onChange={(e) => setTargetType(e.target.value as any)}
                                >
                                    <MenuItem value="all">全従業員</MenuItem>
                                    <MenuItem value="department">部署別</MenuItem>
                                    <MenuItem value="individual">個人別</MenuItem>
                                </Select>
                            </FormControl>

                            {targetType === 'department' && (
                                <Box>
                                    <Typography variant="subtitle2" gutterBottom>
                                        対象部署を選択
                                    </Typography>
                                    <FormGroup row>
                                        {departments.map((dept) => (
                                            <FormControlLabel
                                                key={dept}
                                                control={
                                                    <Checkbox
                                                        checked={selectedDepartments.includes(dept)}
                                                        onChange={() => handleDepartmentToggle(dept)}
                                                    />
                                                }
                                                label={dept}
                                            />
                                        ))}
                                    </FormGroup>
                                </Box>
                            )}

                            {targetType === 'individual' && (
                                <Box>
                                    <Typography variant="subtitle2" gutterBottom>
                                        対象者を選択
                                    </Typography>
                                    <FormGroup>
                                        {employees.map((employee) => (
                                            <FormControlLabel
                                                key={employee.id}
                                                control={
                                                    <Checkbox
                                                        checked={selectedEmployees.includes(employee.id)}
                                                        onChange={() => handleEmployeeToggle(employee.id)}
                                                    />
                                                }
                                                label={`${employee.name} (${employee.department})`}
                                            />
                                        ))}
                                    </FormGroup>
                                </Box>
                            )}

                            <Alert severity="info" sx={{ mt: 2 }}>
                                送信対象: {getTargetCount()}名
                            </Alert>
                        </CardContent>
                    </Card>

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<SendIcon />}
                        onClick={() => setConfirmDialog(true)}
                        disabled={!subject || !message || getTargetCount() === 0}
                        color="warning"
                    >
                        安否確認を送信
                    </Button>
                </Box>

                {/* 送信履歴 */}
                <Box sx={{ flex: 1 }}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                <HistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                                送信履歴
                            </Typography>

                            {sentHistory.length === 0 ? (
                                <Typography color="textSecondary">
                                    送信履歴はありません
                                </Typography>
                            ) : (
                                <Box>
                                    {sentHistory.map((item) => (
                                        <Box key={item.id} sx={{ mb: 2, pb: 2, borderBottom: '1px solid #eee' }}>
                                            <Typography variant="subtitle2">{item.subject}</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                                <Chip
                                                    icon={<PeopleIcon />}
                                                    label={`${item.targetCount}名`}
                                                    size="small"
                                                    color="primary"
                                                />
                                                <Chip
                                                    icon={<CheckCircleIcon />}
                                                    label="送信完了"
                                                    size="small"
                                                    color="success"
                                                />
                                            </Box>
                                            <Typography variant="caption" color="textSecondary">
                                                {item.sentAt}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Box>
            </Box>

            {/* 送信確認ダイアログ */}
            <Dialog open={confirmDialog} onClose={() => setConfirmDialog(false)}>
                <DialogTitle>
                    <WarningIcon sx={{ mr: 1, color: 'warning.main' }} />
                    安否確認送信の確認
                </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        以下の内容で安否確認を送信します。よろしいですか？
                    </Typography>
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="subtitle2">件名:</Typography>
                        <Typography gutterBottom>{subject}</Typography>
                        <Typography variant="subtitle2">送信対象:</Typography>
                        <Typography gutterBottom>{getTargetCount()}名</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialog(false)}>キャンセル</Button>
                    <Button onClick={handleSend} variant="contained" color="warning">
                        送信実行
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SafetyCheckSender;