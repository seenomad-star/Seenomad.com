import React, { useState } from 'react';
import CatalogSidebar from './CatalogSidebar';
import ItineraryTimeline from './ItineraryTimeline';
import BudgetTracker from './BudgetTracker';
import GroupSyncSession from './GroupSyncSession';
import ShareDraftModal from './ShareDraftModal';
import CommentSidebar from './CommentSidebar';
import SuggestedEditsPanel from './SuggestedEditsPanel';
import '../../../../styles/TripBuilder.css';

const TripBuilder = () => {
    // Initial state: User budget limit is $5000
    const [budgetLimit, setBudgetLimit] = useState(5000);
    // The items dragged into the itinerary
    const [itineraryItems, setItineraryItems] = useState([]);
    // State to hold the currently dragged item
    const [draggedItem, setDraggedItem] = useState(null);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);

    // Calculate total cost
    const totalCost = itineraryItems.reduce((acc, item) => acc + item.price, 0);

    // Initial mock catalog items
    const [catalog] = useState([
        { id: 'f1', type: 'flight', title: 'Roundtrip Flight (LAX -> NRT)', icon: 'Plane', price: 850, duration: '11h 30m' },
        { id: 'h1', type: 'hotel', title: 'Shinjuku Capsule Hotel', icon: 'Bed', price: 300, duration: '5 Nights' },
        { id: 'h2', type: 'hotel', title: 'Luxury Ryokan Stay', icon: 'Home', price: 1200, duration: '2 Nights' },
        { id: 'a1', type: 'activity', title: 'Mount Fuji Day Trip', icon: 'Mountain', price: 150, duration: '8h 0m' },
        { id: 'a2', type: 'activity', title: 'Tokyo Drift Excursion', icon: 'Car', price: 400, duration: '4h 0m' },
        { id: 'a3', type: 'activity', title: 'Sushi Making Class', icon: 'Utensils', price: 80, duration: '2h 30m' },
    ]);

    const handleDragStart = (e, item) => {
        setDraggedItem(item);
        // Required for Firefox
        e.dataTransfer.setData('text/plain', item.id);
        e.dataTransfer.effectAllowed = 'copyMove';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (draggedItem) {
            // Add item to itinerary with a unique instance ID so same item can be added twice
            setItineraryItems(prev => [...prev, { ...draggedItem, instanceId: Date.now() + Math.random() }]);
            setDraggedItem(null);
        }
    };

    const handleRemoveItem = (instanceId) => {
        setItineraryItems(prev => prev.filter(item => item.instanceId !== instanceId));
    };

    return (
        <div className="trip-builder-container">
            <header className="tb-header">
                <div className="tb-titles">
                    <h1>TripBuilder OS</h1>
                    <p>Design your journey sequentially and watch your budget update live.</p>
                </div>
                <div className="tb-actions">
                    <button className="tb-share-btn" onClick={() => setIsShareModalOpen(true)}>Collaborate</button>
                    <button className="tb-comment-toggle" onClick={() => setIsCommentsOpen(!isCommentsOpen)}>Discussion</button>
                    <BudgetTracker totalCost={totalCost} budgetLimit={budgetLimit} />
                </div>
            </header>

            <div className="tb-main-content">
                <CatalogSidebar 
                    catalog={catalog} 
                    onDragStart={handleDragStart} 
                />
                <div className="tb-timeline-wrapper">
                    <ItineraryTimeline 
                        items={itineraryItems} 
                        onDragOver={handleDragOver} 
                        onDrop={handleDrop}
                        onRemove={handleRemoveItem}
                    />
                </div>
                <div className="tb-right-sidebar">
                    <GroupSyncSession />
                    {isCommentsOpen && (
                        <>
                            <CommentSidebar onClose={() => setIsCommentsOpen(false)} />
                            <SuggestedEditsPanel />
                        </>
                    )}
                </div>
            </div>

            <ShareDraftModal 
                isOpen={isShareModalOpen} 
                onClose={() => setIsShareModalOpen(false)} 
            />
        </div>
    );
};

export default TripBuilder;
