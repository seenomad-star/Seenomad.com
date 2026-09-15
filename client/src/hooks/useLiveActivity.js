import { useState, useEffect } from 'react';

/**
 * Simulates real-time activity updates (e.g., live viewers).
 * @param {number} initialCount - Starting number for the counter.
 * @param {number} min - Minimum possible value.
 * @param {number} max - Maximum possible value.
 * @returns {number} currentCount - The fluctuating count.
 */
const useLiveActivity = (initialCount = 10, min = 5, max = 100) => {
    const [count, setCount] = useState(initialCount);

    useEffect(() => {
        // Random update interval between 3s and 8s
        const intervalTime = Math.floor(Math.random() * 5000) + 3000;

        const interval = setInterval(() => {
            setCount((prev) => {
                // Random change: -2, -1, 0, +1, +2
                const change = Math.floor(Math.random() * 5) - 2;
                const newCount = prev + change;

                // Keep within bounds
                if (newCount < min) return min;
                if (newCount > max) return max;
                return newCount;
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, [min, max]);

    return count;
};

export default useLiveActivity;
