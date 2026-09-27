/**
 * Visa Intelligence Service
 * Handles visa requirements, Schengen 90/180 compliance calculations, and embassy alerts.
 */

import apiClient from './apiClient';

export const visaService = {
    /**
     * Get visa requirement for destination country given passport origin
     */
    async getRequirement(passportCountry, destinationCountry) {
        try {
            return await apiClient.get('/visa/requirement', { passport: passportCountry, destination: destinationCountry });
        } catch (error) {
            // Local fallback logic
            return {
                status: 'Visa Free',
                allowedDays: 90,
                source: 'local_estimates'
            };
        }
    },

    /**
     * Calculate Schengen 90/180 rule compliance
     * Given an array of stay periods: [{ start: '2026-05-01', end: '2026-05-20', country: 'France' }]
     * Returns total days used, days remaining, and compliance status.
     */
    calculateSchengenCompliance(trips = [], referenceDate = new Date()) {
        const refTime = new Date(referenceDate).getTime();
        const ONE_DAY_MS = 24 * 60 * 60 * 1000;
        const windowStartTime = refTime - (180 * ONE_DAY_MS);

        let totalDaysSpent = 0;

        trips.forEach((trip) => {
            const tripStart = new Date(trip.start).getTime();
            const tripEnd = new Date(trip.end).getTime();

            // Calculate overlap between [tripStart, tripEnd] and [windowStartTime, refTime]
            const effectiveStart = Math.max(tripStart, windowStartTime);
            const effectiveEnd = Math.min(tripEnd, refTime);

            if (effectiveStart <= effectiveEnd) {
                const days = Math.round((effectiveEnd - effectiveStart) / ONE_DAY_MS) + 1;
                totalDaysSpent += Math.max(0, days);
            }
        });

        const maxAllowed = 90;
        const daysRemaining = Math.max(0, maxAllowed - totalDaysSpent);
        const percentUsed = Math.min(100, Math.round((totalDaysSpent / maxAllowed) * 100));

        let riskLevel = 'safe';
        if (totalDaysSpent >= 90) {
            riskLevel = 'overstay';
        } else if (totalDaysSpent >= 75) {
            riskLevel = 'critical';
        } else if (totalDaysSpent >= 60) {
            riskLevel = 'caution';
        }

        return {
            totalDaysSpent,
            daysRemaining,
            percentUsed,
            riskLevel,
            maxAllowed
        };
    },

    /**
     * Calculate 183-Day Tax Residency threshold
     */
    calculateTaxResidency(daysSpentInCountry, countryName = 'Current Country') {
        const threshold = 183;
        const remainingUntilResidency = Math.max(0, threshold - daysSpentInCountry);
        const percentToResidency = Math.min(100, Math.round((daysSpentInCountry / threshold) * 100));

        let taxRisk = 'low';
        if (daysSpentInCountry >= threshold) {
            taxRisk = 'resident';
        } else if (daysSpentInCountry >= 150) {
            taxRisk = 'high';
        } else if (daysSpentInCountry >= 100) {
            taxRisk = 'moderate';
        }

        return {
            countryName,
            daysSpent: daysSpentInCountry,
            remainingUntilResidency,
            percentToResidency,
            taxRisk,
            threshold
        };
    }
};

export default visaService;
