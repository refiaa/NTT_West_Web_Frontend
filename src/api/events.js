import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../config/api.config';
import dayjs from 'dayjs';

const parseDateOption = (option) => {
    const [datePart] = option.split(' ');
    const dateStr = datePart.split('(')[0];
    const [month, day] = dateStr.split('/');
    const year = new Date().getFullYear();
    return dayjs(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`).valueOf();
};

export const eventsApi = {
    async createEvent(eventData) {
        const response = await apiClient.request({
            method: 'POST',
            url: API_ENDPOINTS.EVENTS.CREATE,
            data: {
                name: eventData.eventName,
                description: eventData.memo,
                dateOptions: eventData.dateOptions.map(option => ({
                    datetime: option,
                    timestamp: parseDateOption(option),
                })),
                createdAt: dayjs().toISOString(),
                updatedAt: dayjs().toISOString(),
            },
        });
        return response;
    },

    async updateEvent(eventId, eventData) {
        const response = await apiClient.request({
            method: 'PUT',
            url: API_ENDPOINTS.EVENTS.UPDATE(eventId),
            data: {
                name: eventData.eventName,
                description: eventData.memo,
                dateOptions: eventData.dateOptions.map(option => ({
                    datetime: option,
                    timestamp: parseDateOption(option),
                })),
                updatedAt: dayjs().toISOString(),
            },
        });
        return response;
    },

    async getEvent(eventId) {
        const response = await apiClient.request({
            method: 'GET',
            url: API_ENDPOINTS.EVENTS.GET(eventId),
        });
        return response;
    },

    async deleteEvent(eventId) {
        const response = await apiClient.request({
            method: 'DELETE',
            url: API_ENDPOINTS.EVENTS.DELETE(eventId),
        });
        return response;
    },

    async listEvents() {
        const response = await apiClient.request({
            method: 'GET',
            url: API_ENDPOINTS.EVENTS.LIST,
        });
        return response;
    },

    async addParticipantSchedule(eventId, participantData) {
        const response = await apiClient.request({
            method: 'POST',
            url: API_ENDPOINTS.EVENTS.PARTICIPANTS.CREATE,
            data: {
                users_id: participantData.userId,
                events_id: eventId,
                name: participantData.name,
                description: participantData.description,
                availability: participantData.availability
            }
        });
        return response;
    },

    async getParticipantSchedules(eventId) {
        const response = await apiClient.request({
            method: 'GET',
            url: API_ENDPOINTS.EVENTS.PARTICIPANTS.GET,
        });
        return response;
    }
};