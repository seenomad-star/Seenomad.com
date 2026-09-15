import { useDestinationStore } from '../store/destinationFilterStore';
import { REWARD_THRESHOLDS, REWARD_TYPES } from '../config/rewards.config';

export const checkUnlocks = () => {
    const state = useDestinationStore.getState();
    const { searchHistory, selectedFilters, streak, unlockedFeatures, unlockFeature } = state;

    // 3 searches → unlock HIDDEN_DEALS
    if (searchHistory.length >= REWARD_THRESHOLDS.SEARCHES_FOR_HIDDEN_DEALS &&
        !unlockedFeatures.includes(REWARD_TYPES.HIDDEN_DEALS)) {
        unlockFeature(REWARD_TYPES.HIDDEN_DEALS);
    }

    // 5 filters used → unlock VISA_SUCCESS_SCORE
    if (selectedFilters.length >= REWARD_THRESHOLDS.FILTERS_FOR_VISA_SCORE &&
        !unlockedFeatures.includes(REWARD_TYPES.VISA_SUCCESS_SCORE)) {
        unlockFeature(REWARD_TYPES.VISA_SUCCESS_SCORE);
    }

    // Streak logic (example)
    if (streak >= REWARD_THRESHOLDS.STREAK_FOR_PRIORITY &&
        !unlockedFeatures.includes(REWARD_TYPES.EMBASSSY_SPEED_RANK)) {
        unlockFeature(REWARD_TYPES.EMBASSSY_SPEED_RANK);
    }
};
