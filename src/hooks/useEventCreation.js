import { useState, useCallback } from 'react';
import { eventsApi } from '../api/events';
import { sortDateOptions, isValidTime } from '../utils/dateUtils';

export const useEventCreation = () => {
    const [eventData, setEventData] = useState({
        eventName: '',
        memo: ''
    });
    const [dateOptions, setDateOptions] = useState([]);
    const [defaultTime, setDefaultTime] = useState('19:00');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const addDateOption = useCallback((option) => {
        setDateOptions(prev => {
            if (prev.includes(option)) return prev;
            return sortDateOptions([...prev, option]);
        });
    }, []);

    const removeDateOption = useCallback((index) => {
        setDateOptions(prev => prev.filter((_, i) => i !== index));
    }, []);

    const validateForm = useCallback(() => {
        if (!eventData.eventName.trim()) {
            setError('イベント名を入力してください。');
            return false;
        }
        if (dateOptions.length === 0) {
            setError('少なくとも1つの日程を選択してください。');
            return false;
        }
        if (!isValidTime(defaultTime)) {
            setError('有効な時間を入力してください。');
            return false;
        }
        setError('');
        return true;
    }, [eventData.eventName, dateOptions, defaultTime]);

    const handleSubmit = async () => {
        if (!validateForm() || isSubmitting) return null;

        try {
            setIsSubmitting(true);
            const response = await eventsApi.createEvent({
                eventName: eventData.eventName,
                memo: eventData.memo,
                dateOptions,
            });
            return response.eventId;
        } catch (error) {
            console.error('Failed to create event:', error);
            setError('イベントの作成に失敗しました。もう一度お試しください。');
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = useCallback(() => {
        setEventData({ eventName: '', memo: '' });
        setDateOptions([]);
        setError('');
    }, []);

    return {
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
        resetForm
    };
};