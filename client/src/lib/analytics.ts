/**
 * Seenomad Privacy-First Analytics Engine (Plausible / PostHog compatible)
 * Tracks user interactions, module popularity, retention patterns, and navigation metrics.
 */

export interface AnalyticsEvent {
    event: string;
    properties?: Record<string, any>;
    timestamp: string;
    path?: string;
}

export const ANALYTICS_EVENTS = {
    PAGE_VIEW: 'PAGE_VIEW',
    MODULE_VIEWED: 'MODULE_VIEWED',
    FILTER_USED: 'FILTER_USED',
    FILTER_UNLOCKED: 'FILTER_UNLOCKED',
    SPONSORED_CLICK: 'SPONSORED_CLICK',
    CTA_CLICK: 'CTA_CLICK',
    DAILY_DROP_CLAIMED: 'DAILY_DROP_CLAIMED',
    SCHENGEN_CALCULATED: 'SCHENGEN_CALCULATED',
    TAX_RESIDENCY_CHECKED: 'TAX_RESIDENCY_CHECKED',
    AI_COPILOT_QUERIED: 'AI_COPILOT_QUERIED',
    PROGRESS_COMPLETED: 'PROGRESS_COMPLETED',
    STREAK_LOST: 'STREAK_LOST',
    SEARCH_PERFORMED: 'SEARCH_PERFORMED',
};

export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
    try {
        const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
        const eventData: AnalyticsEvent = {
            event: eventName,
            properties,
            timestamp: new Date().toISOString(),
            path: currentPath
        };

        // Local ring-buffer for immediate inspection & session insights
        const events = JSON.parse(localStorage.getItem('seenomad_analytics_events') || '[]');
        events.push(eventData);
        // Keep last 200 events
        localStorage.setItem('seenomad_analytics_events', JSON.stringify(events.slice(-200)));

        // Increment module popularity counters
        const moduleName = properties.module || currentPath.split('/')[1] || 'home';
        const moduleCounts = JSON.parse(localStorage.getItem('seenomad_module_stats') || '{}');
        moduleCounts[moduleName] = (moduleCounts[moduleName] || 0) + 1;
        localStorage.setItem('seenomad_module_stats', JSON.stringify(moduleCounts));

        // Plausible / Custom window event dispatch for external script integration
        if (typeof window !== 'undefined' && (window as any).plausible) {
            (window as any).plausible(eventName, { props: properties });
        }
    } catch (e) {
        // Silently catch in restricted contexts
    }
};

export const trackPageView = (path: string, title?: string) => {
    trackEvent(ANALYTICS_EVENTS.PAGE_VIEW, {
        path,
        title: title || (typeof document !== 'undefined' ? document.title : ''),
        referrer: typeof document !== 'undefined' ? document.referrer : ''
    });
};

export const getAnalyticsSummary = () => {
    try {
        const events: AnalyticsEvent[] = JSON.parse(localStorage.getItem('seenomad_analytics_events') || '[]');
        const moduleStats: Record<string, number> = JSON.parse(localStorage.getItem('seenomad_module_stats') || '{}');
        return {
            totalEvents: events.length,
            recentEvents: events.slice(-15).reverse(),
            modulePopularity: moduleStats
        };
    } catch {
        return { totalEvents: 0, recentEvents: [], modulePopularity: {} };
    }
};

