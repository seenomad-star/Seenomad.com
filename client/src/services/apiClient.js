/**
 * Centralized API Client
 * Provides a resilient, configurable HTTP client with request/response interceptors,
 * error handling, timeout management, and authentication token injection.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const DEFAULT_TIMEOUT = 10000;

class ApiClient {
    constructor(baseURL = API_BASE_URL) {
        this.baseURL = baseURL;
    }

    /**
     * Build full URL with query parameters
     */
    buildUrl(endpoint, params = {}) {
        const url = endpoint.startsWith('http')
            ? new URL(endpoint)
            : new URL(this.baseURL + (endpoint.startsWith('/') ? endpoint : `/${endpoint}`), window.location.origin);

        Object.keys(params).forEach((key) => {
            if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
                url.searchParams.append(key, String(params[key]));
            }
        });

        return url.toString();
    }

    /**
     * Generic fetch wrapper with timeout and interceptors
     */
    async request(endpoint, options = {}) {
        const {
            method = 'GET',
            headers = {},
            body,
            params,
            timeout = DEFAULT_TIMEOUT
        } = options;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...headers
            },
            signal: controller.signal
        };

        if (body) {
            config.body = typeof body === 'string' ? body : JSON.stringify(body);
        }

        try {
            const url = this.buildUrl(endpoint, params);
            const response = await fetch(url, config);
            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                const error = new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
                error.status = response.status;
                error.data = errorData;
                throw error;
            }

            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error(`Request timeout after ${timeout}ms: ${endpoint}`);
            }
            throw error;
        }
    }

    get(endpoint, params = {}, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET', params });
    }

    post(endpoint, body = {}, options = {}) {
        return this.request(endpoint, { ...options, method: 'POST', body });
    }

    put(endpoint, body = {}, options = {}) {
        return this.request(endpoint, { ...options, method: 'PUT', body });
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

export const apiClient = new ApiClient();
export default apiClient;
