export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://API-GATEWAY-ID-HERE.EXECUTE-API.ap-northeast-1.amazonaws.com/dev',
    STAGE: process.env.REACT_APP_STAGE || 'dev',
    REGION: process.env.REACT_APP_AWS_REGION || 'ap-northeast-1',
    TIMEOUT: 30000,
    RETRY_COUNT: 3,
    RETRY_DELAY: 1000,
};

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        REFRESH: '/auth/refresh',
    },
    EVENTS: {
        CREATE: '/events',
        GET: (id) => `/events/${id}`,
        UPDATE: (id) => `/events/${id}`,
        DELETE: (id) => `/events/${id}`,
        LIST: '/events',

        PARTICIPANTS: {
            CREATE: (eventId) => `/api/events/${eventId}/participants-schedule`,
            GET: (eventId) => `/api/events/${eventId}/participants-schedule`
        }
    },
};