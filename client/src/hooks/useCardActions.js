import { useState } from 'react';

/**
 * Hook to manage interactive state for destination cards.
 * Provides handlers for common actions like Save, Like, Share, etc.
 * @param {Object} initialData - Initial state for the card (optional)
 */
const useCardActions = (initialData = {}) => {
    const [isSaved, setIsSaved] = useState(initialData.isSaved || false);
    const [isLiked, setIsLiked] = useState(initialData.isLiked || false);
    const [hasAlert, setHasAlert] = useState(initialData.hasAlert || false);
    const [inBucketList, setInBucketList] = useState(initialData.inBucketList || false);
    const [xpClaimed, setXpClaimed] = useState(false);
    const [hasSpun, setHasSpun] = useState(false);

    // Helper to show toast (mock implementation)
    const showToast = (message, type = 'success') => {
        // In a real app, this would use a toast context/library
        console.log(`[Toast ${type}]: ${message}`);

        // Create a temporary DOM element for visual feedback if none exists
        const toastId = 'mock-toast-container';
        let container = document.getElementById(toastId);

        if (!container) {
            container = document.createElement('div');
            container.id = toastId;
            container.style.position = 'fixed';
            container.style.bottom = '20px';
            container.style.right = '20px';
            container.style.zIndex = '9999';
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.gap = '10px';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.background = 'rgba(15, 23, 42, 0.9)';
        toast.style.color = 'white';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        toast.style.backdropFilter = 'blur(10px)';
        toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        toast.style.animation = 'fadeIn 0.3s ease-out';
        toast.style.fontSize = '0.9rem';
        toast.style.fontWeight = '600';
        toast.style.display = 'flex';
        toast.style.alignItems = 'center';
        toast.style.gap = '8px';

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    };

    const toggleSave = (e) => {
        e?.stopPropagation();
        setIsSaved(!isSaved);
        showToast(isSaved ? "Removed from Wishlist" : "Saved to Wishlist");
    };

    const toggleLike = (e) => {
        e?.stopPropagation();
        setIsLiked(!isLiked);
        if (!isLiked) showToast("Added to Favorites");
    };

    const shareContent = (e, title) => {
        e?.stopPropagation();
        navigator.clipboard.writeText(window.location.href);
        showToast("Link copied to clipboard!");
    };

    const toggleAlert = (e) => {
        e?.stopPropagation();
        setHasAlert(!hasAlert);
        showToast(hasAlert ? "Price Alert Removed" : "Price Alert Set for this destination");
    };

    const addToBucketList = (e) => {
        e?.stopPropagation();
        setInBucketList(!inBucketList);
        showToast(inBucketList ? "Removed from Bucket List" : "Added to Bucket List");
    };

    const claimXP = (e) => {
        e?.stopPropagation();
        if (xpClaimed) return;
        setXpClaimed(true);
        showToast("⚡ +50 XP Claimed!");

        if (window.spawnXPParticles) {
            window.spawnXPParticles(e.clientX, e.clientY, 12);
        }
    };

    const spinAndWin = (e) => {
        e?.stopPropagation();
        if (hasSpun) {
            showToast("You've already spun for this destination today!", "info");
            return;
        }

        showToast("🎲 Spinning...", "info");

        setTimeout(() => {
            const prizes = [
                "🎉 You won 100 Bonus XP!",
                "🎟️ You won a 5% Discount Voucher!",
                "💎 You won a Premium Badge!",
                "🍀 Better luck next time!"
            ];
            const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];

            setHasSpun(true);
            showToast(randomPrize);

            if (window.spawnXPParticles && randomPrize.includes("XP")) {
                window.spawnXPParticles(e.clientX, e.clientY, 15);
            }
        }, 1000);
    };

    return {
        state: {
            isSaved,
            isLiked,
            hasAlert,
            inBucketList,
            xpClaimed,
            hasSpun
        },
        handlers: {
            toggleSave,
            toggleLike,
            shareContent,
            toggleAlert,
            addToBucketList,
            claimXP,
            spinAndWin
        }
    };
};

export default useCardActions;
