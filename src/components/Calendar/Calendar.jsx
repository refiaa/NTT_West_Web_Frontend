import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { isPastDate } from '../../utils/dateUtils';

const Calendar = ({ currentMonth, onDateSelect, selectedDates = [], minDate }) => {
    const calendar = useMemo(() => {
        const start = dayjs(currentMonth).startOf('month').startOf('week');
        const end = dayjs(currentMonth).endOf('month').endOf('week');
        const days = [];
        let day = start;

        while (day.isBefore(end)) {
            days.push(day);
            day = day.add(1, 'day');
        }

        const weeks = [];
        let week = [];

        days.forEach((day) => {
            week.push(day);
            if (week.length === 7) {
                weeks.push(week);
                week = [];
            }
        });

        return weeks;
    }, [currentMonth]);

    const isDateDisabled = (date) => {
        return isPastDate(date) || !date.isSame(currentMonth, 'month');
    };

    const isDateSelected = (date) => {
        return selectedDates.some(selectedDate =>
            dayjs(selectedDate).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
        );
    };

    const isToday = (date) => {
        return date.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
    };

    const isPast = (date) => {
        return date.isBefore(dayjs(), 'day');
    };

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
                            <TableCell
                                key={day}
                                align="center"
                                sx={{
                                    padding: '8px 0',
                                    color: index === 0 ? 'error.main' :
                                        index === 6 ? 'primary.main' :
                                            'text.primary',
                                    fontWeight: 500,
                                    borderBottom: '1px solid',
                                    borderBottomColor: 'divider',
                                }}
                            >
                                {day}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {calendar.map((week, weekIndex) => (
                        <TableRow key={weekIndex}>
                            {week.map((date) => {
                                const isDisabled = isDateDisabled(date);
                                const isSelected = isDateSelected(date);
                                const isTodayDate = isToday(date);
                                const isCurrentMonth = date.isSame(currentMonth, 'month');
                                const isPastDate = isPast(date);

                                return (
                                    <TableCell
                                        key={date.format()}
                                        align="center"
                                        onClick={() => !isDisabled && onDateSelect(date.toDate())}
                                        sx={{
                                            padding: '8px 0',
                                            cursor: isDisabled ? 'default' : 'pointer',
                                            color: isPastDate ? 'text.disabled' :
                                                date.day() === 0 ? 'error.main' :
                                                    date.day() === 6 ? 'primary.main' :
                                                        !isCurrentMonth ? 'text.disabled' :
                                                            'text.primary',
                                            backgroundColor: isSelected ? 'rgba(0, 122, 255, 0.1)' :
                                                isTodayDate ? 'rgba(0, 0, 0, 0.04)' :
                                                    'transparent',
                                            fontWeight: isTodayDate ? 600 : 400,
                                            border: 'none',
                                            '&:hover': {
                                                backgroundColor: isDisabled ? undefined :
                                                    isSelected ? 'rgba(0, 122, 255, 0.2)' :
                                                        'rgba(0, 0, 0, 0.04)',
                                            },
                                            opacity: !isCurrentMonth || isPastDate ? 0.3 : 1,
                                            transition: 'background-color 0.2s ease',
                                            height: '40px',
                                            width: '40px',
                                            position: 'relative',
                                            pointerEvents: isPastDate ? 'none' : 'auto',
                                            '& > span': {
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                transform: 'translate(-50%, -50%)',
                                            }
                                        }}
                                    >
                                        <span>{date.date()}</span>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Calendar;