import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Paper,
    TextField,
    Typography,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    Tooltip
} from '@mui/material';
import { Delete as DeleteIcon, ChevronLeft, ChevronRight } from '@mui/icons-material';
import dayjs from 'dayjs';
import Calendar from '../Calendar/Calendar';
import { useEventCreation } from '../../hooks/useEventCreation';
import { formatDateOption } from '../../utils/dateUtils';

const EventCreationPage = () => {
    const navigate = useNavigate();
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const {
        eventData,
        setEventData,
        dateOptions,
        addDateOption,
        removeDateOption,
        defaultTime,
        setDefaultTime,
        currentMonth,
        setCurrentMonth,
        isSubmitting,
        error,
        validateForm,
        handleSubmit,
    } = useEventCreation();

    const handleDateSelect = useCallback((date) => {
        if (!defaultTime) {
            return;
        }

        try {
            const newOption = formatDateOption(date, defaultTime);
            addDateOption(newOption);
        } catch (error) {
            console.error('Failed to add date option:', error);
        }
    }, [defaultTime, addDateOption]);

    const handleDefaultTimeChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
            setDefaultTime(value);
        }
    };

    const handleCreateEvent = () => {
        if (validateForm()) {
            setShowConfirmDialog(true);
        }
    };

    const handleConfirmCreate = async () => {
        try {
            const eventId = await handleSubmit();
            if (eventId) {
                navigate(`/events/${eventId}`);
            }
        } catch (error) {
            console.error('Failed to create event:', error);
        } finally {
            setShowConfirmDialog(false);
        }
    };

    const moveMonth = useCallback((direction) => {
        const newMonth = dayjs(currentMonth).add(direction, 'month');
        if (newMonth.isAfter(dayjs(), 'month') || newMonth.isSame(dayjs(), 'month')) {
            setCurrentMonth(newMonth.toDate());
        }
    }, [currentMonth, setCurrentMonth]);

    return (
        <Box sx={{ maxWidth: 'lg', mx: 'auto', p: { xs: 2, sm: 3 } }}>
            <Paper
                elevation={0}
                sx={{
                    p: { xs: 2, sm: 4 },
                    backgroundColor: 'background.paper',
                    borderRadius: 2
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        mb: 4,
                        fontWeight: 600,
                        fontSize: { xs: '1.25rem', sm: '1.5rem' }
                    }}
                >
                    イベントを作成
                </Typography>

                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            mb: 3,
                            borderRadius: 1
                        }}
                    >
                        {error}
                    </Alert>
                )}

                <Box sx={{ mb: 4 }}>
                    <TextField
                        fullWidth
                        required
                        label="イベント名"
                        value={eventData.eventName}
                        onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })}
                        placeholder="例）今期もお疲れ様でした飲み会 など"
                        sx={{ mb: 3 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="メモ"
                        value={eventData.memo}
                        onChange={(e) => setEventData({ ...eventData, memo: e.target.value })}
                        placeholder="例）飲み会の日程調整しましょう！出欠○日 など"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            mb: 2,
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        日程候補
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Tooltip title="例: 19:00" placement="top">
                            <TextField
                                label="時間"
                                value={defaultTime}
                                onChange={handleDefaultTimeChange}
                                placeholder="19:00"
                                size="small"
                                sx={{
                                    width: 150,
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'background.default'
                                    }
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Tooltip>
                    </Box>

                    {dateOptions.length > 0 && (
                        <List sx={{ mb: 3 }}>
                            {dateOptions.map((option, index) => (
                                <ListItem
                                    key={index}
                                    sx={{
                                        py: 1,
                                        px: 2,
                                        bgcolor: 'background.default',
                                        mb: 1,
                                        borderRadius: 1,
                                        transition: 'all 0.2s ease-in-out',
                                        '&:hover': {
                                            bgcolor: 'action.hover',
                                        }
                                    }}
                                >
                                    <ListItemText
                                        primary={option}
                                        sx={{
                                            '& .MuiTypography-root': {
                                                fontSize: { xs: '0.875rem', sm: '1rem' }
                                            }
                                        }}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            onClick={() => removeDateOption(index)}
                                            size="small"
                                            sx={{
                                                color: 'error.main',
                                                '&:hover': {
                                                    backgroundColor: 'error.light',
                                                    color: 'error.dark'
                                                }
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    )}

                    <Box sx={{ position: 'relative' }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2
                        }}>
                            <IconButton
                                onClick={() => moveMonth(-1)}
                                disabled={dayjs(currentMonth).isSame(dayjs(), 'month')}
                                size="small"
                                sx={{
                                    '&.Mui-disabled': {
                                        opacity: 0.3
                                    }
                                }}
                            >
                                <ChevronLeft />
                            </IconButton>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: { xs: '0.875rem', sm: '1rem' }
                                }}
                            >
                                {dayjs(currentMonth).format('YYYY年M月')}
                            </Typography>
                            <IconButton
                                onClick={() => moveMonth(1)}
                                size="small"
                            >
                                <ChevronRight />
                            </IconButton>
                        </Box>

                        <Calendar
                            currentMonth={currentMonth}
                            onDateSelect={handleDateSelect}
                            selectedDates={dateOptions.map(option => {
                                const [date] = option.split(' ');
                                return dayjs(date, 'M/D(ddd)').toDate();
                            })}
                            minDate={dayjs().toDate()}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleCreateEvent}
                        disabled={isSubmitting || !eventData.eventName || dateOptions.length === 0}
                        sx={{
                            minWidth: { xs: 160, sm: 200 },
                            height: { xs: 40, sm: 48 },
                            backgroundColor: 'primary.main',
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            '&:hover': {
                                backgroundColor: 'primary.light',
                            },
                            '&.Mui-disabled': {
                                backgroundColor: 'action.disabledBackground',
                                color: 'action.disabled'
                            }
                        }}
                    >
                        出欠表をつくる
                    </Button>
                </Box>
            </Paper>

            <Dialog
                open={showConfirmDialog}
                onClose={() => !isSubmitting && setShowConfirmDialog(false)}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        width: '100%',
                        maxWidth: 400,
                        p: 1
                    }
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    確認
                </DialogTitle>
                <DialogContent sx={{ pb: 2 }}>
                    <Typography>
                        イベントを作成しますか？
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button
                        onClick={() => setShowConfirmDialog(false)}
                        disabled={isSubmitting}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'action.hover'
                            }
                        }}
                    >
                        キャンセル
                    </Button>
                    <Button
                        onClick={handleConfirmCreate}
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'primary.light'
                            }
                        }}
                    >
                        作成
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EventCreationPage;