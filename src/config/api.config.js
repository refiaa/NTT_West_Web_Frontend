export const API_CONFIG = {
    BASE_URL: 'https://kn739p2hm7.execute-api.ap-northeast-1.amazonaws.com/team3',
    TIMEOUT: 30000,
    RETRY_COUNT: 3,
    RETRY_DELAY: 1000,
};

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/login',
        REGISTER: '/register',
        REFRESH: '/refresh',
    },
    EVENTS: {
        CREATE: '/events',
        GET: (id) => `/events/${id}`,
        UPDATE: (id) => `/events/${id}`,
        DELETE: (id) => `/events/${id}`,
        LIST: '/events',
        PARTICIPANTS: {
            CREATE: '/participants',
            GET: '/participants'
        }
    }
};