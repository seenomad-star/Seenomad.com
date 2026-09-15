import React from 'react';
import DraggableItem from './DraggableItem';

const CatalogSidebar = ({ catalog, onDragStart }) => {
    // Group catalog items by type
    const categories = ['flight', 'hotel', 'activity'];

    return (
        <div className="catalog-sidebar">
            <div className="catalog-header">
                <h2>Entity Catalog</h2>
                <p>Drag elements into your timeline</p>
            </div>
            <div className="catalog-lists">
                {categories.map(cat => (
                    <div className="catalog-section" key={cat}>
                        <h3 className="section-type">Available {cat}s</h3>
                        <div className="catalog-items">
                            {catalog.filter(i => i.type === cat).map(item => (
                                <DraggableItem 
                                    key={item.id} 
                                    item={item} 
                                    onDragStart={onDragStart} 
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CatalogSidebar;
