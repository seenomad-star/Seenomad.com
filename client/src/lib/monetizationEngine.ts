import { MONETIZATION_TRIGGERS } from '../config/monetization.config';

export const getMonetizationCTA = (context: {
    approvalScore?: number;
    filterUsed?: string;
    isLockedFeatureClicked?: boolean;
    isHighIntent?: boolean;
}) => {
    const { approvalScore, filterUsed, isLockedFeatureClicked, isHighIntent } = context;

    if (approvalScore !== undefined && approvalScore < 40) {
        return {
            type: MONETIZATION_TRIGGERS.LOW_APPROVAL_SCORE,
            title: 'Boost Your Approval Odds',
            description: 'Get expert embassy assistance to increase your success rate.',
            cta: 'Get Assistance'
        };
    }

    if (filterUsed === 'EMBASSY') {
        return {
            type: MONETIZATION_TRIGGERS.EMBASSSY_FILTER_USED,
            title: 'Fast Track Your Visa',
            description: 'Skip the queue with our premium fast-track service.',
            cta: 'Learn More'
        };
    }

    if (isLockedFeatureClicked) {
        return {
            type: MONETIZATION_TRIGGERS.LOCKED_FEATURE_CLICK,
            title: 'Unlock Premium Insights',
            description: 'Subscribe to access success scores and speed rankings.',
            cta: 'Upgrade Now'
        };
    }

    if (isHighIntent) {
        return {
            type: MONETIZATION_TRIGGERS.HIGH_INTENT,
            title: 'Travel with Confidence',
            description: 'Secure your trip with our partner travel insurance.',
            cta: 'Get Quote'
        };
    }

    return null;
};
