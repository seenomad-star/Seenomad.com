/**
 * Destination Service
 * Handles data fetching and filtering for 195+ countries and digital nomad hubs.
 * Provides fallback to local curated datasets when offline or during development.
 */

import apiClient from './apiClient';
import { allDestinations } from '../data/destinationsData';

export const destinationService = {
    /**
     * Get all destinations with optional filtering and search
     */
    async getDestinations(filters = {}) {
        try {
            return await apiClient.get('/destinations', filters);
        } catch (error) {
            // Graceful fallback to rich local dataset
            let result = [...allDestinations];

            if (filters.search) {
                const query = filters.search.toLowerCase();
                result = result.filter(d => 
                    d.name.toLowerCase().includes(query) || 
                    d.location.toLowerCase().includes(query) ||
                    (d.category && d.category.toLowerCase().includes(query))
                );
            }

            if (filters.category && filters.category !== 'all') {
                result = result.filter(d => 
                    d.category && d.category.toLowerCase() === filters.category.toLowerCase()
                );
            }

            return {
                data: result,
                total: result.length,
                source: 'local_cache'
            };
        }
    },

    /**
     * Get destination by ID
     */
    async getDestinationById(id) {
        try {
            return await apiClient.get(`/destinations/${id}`);
        } catch (error) {
            const found = allDestinations.find(d => String(d.id) === String(id));
            if (!found) throw new Error(`Destination #${id} not found`);
            return { data: found, source: 'local_cache' };
        }
    }
};

export default destinationService;
