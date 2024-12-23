import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(weekday);
dayjs.locale('ja');

export const formatDateWithDay = (date) => {
    return dayjs(date).format('M/D(ddd)');
};

export const formatDateOption = (date, time) => {
    return `${formatDateWithDay(date)} ${time}〜`;
};

export const isValidTime = (time) => {
    return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(time);
};

export const isPastDate = (date) => {
    return dayjs(date).isBefore(dayjs(), 'day');
};

export const sortDateOptions = (options) => {
    return [...options].sort((a, b) => {
        const dateA = dayjs(a.split(' ')[0], 'M/D(ddd)');
        const dateB = dayjs(b.split(' ')[0], 'M/D(ddd)');
        return dateA.diff(dateB);
    });
};