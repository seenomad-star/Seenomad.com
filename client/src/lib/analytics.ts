export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
    console.log(`[Analytics] ${eventName}`, properties);
    // In a real app, this would send data to Segment, Mixpanel, etc.

    // Example of event-based tracking
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push({
        event: eventName,
        properties,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('analytics_events', JSON.stringify(events.slice(-100)));
};

export const ANALYTICS_EVENTS = {
    FILTER_USED: 'FILTER_USED',
    FILTER_UNLOCKED: 'FILTER_UNLOCKED',
    SPONSORED_CLICK: 'SPONSORED_CLICK',
    CTA_CLICK: 'CTA_CLICK',
    PROGRESS_COMPLETED: 'PROGRESS_COMPLETED',
    STREAK_LOST: 'STREAK_LOST',
    SEARCH_PERFORMED: 'SEARCH_PERFORMED',
};
