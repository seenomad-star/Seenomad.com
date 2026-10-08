import React, { useState } from 'react';
import {
    LayoutGrid,
    Sparkles,
    Copy,
    Check,
    Video,
    Image as ImageIcon,
    FileText,
    Instagram,
    Send,
    Zap
} from 'lucide-react';
import { useToastStore } from '../../store/toastStore';

const TEMPLATES = [
    {
        id: 'tpl-cost-breakdown',
        title: 'Monthly City Cost of Living Breakdown Carousel',
        format: 'Carousel (5 Slides)',
        platform: 'Instagram & LinkedIn',
        conversionRate: '9.4% Save Rate',
        category: 'Data & Finance',
        previewHook: '"I lived in [City] for 30 days. Here is every dollar I spent on rent, coworking, cafes & flights..."',
        structure: [
            'Slide 1: High-contrast hero photo + Total Monthly Spend ($1,840)',
            'Slide 2: Accommodation & Neighborhood Walkability Score',
            'Slide 3: Coworking + Fiber Speeds & Backup Cafe Costs',
            'Slide 4: Food, Gym & Weekend Excursions',
            'Slide 5: Verdict — Who should move here + CTA to clone itinerary'
        ]
    },
    {
        id: 'tpl-hidden-work-cafes',
        title: 'Top 5 Fiber Work Cafes Reel Script',
        format: '9:16 Vertical Reel (35s)',
        platform: 'Reels, TikTok & Shorts',
        conversionRate: '14.2% Share Rate',
        category: 'Remote Work',
        previewHook: '"Stop working from noisy tourist cafes in [City]. Save these 5 laptop-friendly spots with 150+ Mbps..."',
        structure: [
            '0–3s: Fast B-roll hook closing laptop at a crowded spot',
            '3–15s: 3-second cuts of each cafe (Outlets, Speedtest screenshot, Flat white)',
            '15–28s: Quietest call booth spot reveal',
            '28–35s: Pin map overlay + link in bio prompt'
        ]
    },
    {
        id: 'tpl-visa-step-by-step',
        title: 'Digital Nomad Visa Approval Timeline Thread',
        format: 'Editorial Thread / Guide',
        platform: 'Community Feed & X',
        conversionRate: '11.8% Bookmark Rate',
        category: 'Visa & Legal',
        previewHook: '"How I got my [Country] Digital Nomad Visa approved in 14 days without an expensive agency..."',
        structure: [
            'Block 1: Exact document checklist & apostille timeline',
            'Block 2: Remote income proof & bank statement formatting',
            'Block 3: Consulate appointment booking tips',
            'Block 4: Downloadable PDF checklist link'
        ]
    },
    {
        id: 'tpl-72hr-itinerary',
        title: '72 Hours in [Destination] Micro-Itinerary',
        format: 'Visual Story & Map Card',
        platform: 'SeeNomad Feed & Stories',
        conversionRate: '16.5% Clone Rate',
        category: 'Itinerary',
        previewHook: '"Only have 3 days in [City]? Here is the zero-tourist-trap route mapped hour by hour..."',
        structure: [
            'Day 1: Old town architecture walk + sunset rooftop',
            'Day 2: Sunrise market + coastal boat or mountain hike',
            'Day 3: Local craft studio + hidden neighborhood bistro'
        ]
    }
];

const PostTemplatesHub = () => {
    const { addToast } = useToastStore();
    const [selectedCat, setSelectedCat] = useState('All');
    const [copiedId, setCopiedId] = useState(null);
    const [customCity, setCustomCity] = useState('Lisbon');

    const categories = ['All', 'Data & Finance', 'Remote Work', 'Visa & Legal', 'Itinerary'];

    const filtered = TEMPLATES.filter(
        (t) => selectedCat === 'All' || t.category === selectedCat
    );

    const handleCopyTemplate = (tpl) => {
        const text = `${tpl.previewHook.replace(/\[City\]|\[Country\]|\[Destination\]/g, customCity || 'Lisbon')}\n\n${tpl.structure.join('\n')}`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).catch(() => {});
        }
        setCopiedId(tpl.id);
        addToast(`Copied "${tpl.title}" customized for ${customCity || 'Lisbon'}!`, 'success');
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="cm-photography-view">
            <div className="cm-photo-hero-header">
                <div className="cm-photo-title-group">
                    <div className="cm-photo-pink-icon blue-tone">
                        <LayoutGrid size={24} strokeWidth={2.2} />
                    </div>
                    <div>
                        <h1>Viral Travel Post Templates</h1>
                        <p>Proven carousel blueprints, 9:16 reel scripts, and itinerary hooks customized for your city</p>
                    </div>
                </div>

                <div className="cm-template-city-input">
                    <span>Target City:</span>
                    <input
                        type="text"
                        value={customCity}
                        onChange={(e) => setCustomCity(e.target.value)}
                        placeholder="e.g. Lisbon, Bali..."
                    />
                </div>
            </div>

            <div className="cm-photo-filter-row">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        className={`cm-photo-filter-pill ${selectedCat === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCat(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="cm-templates-grid">
                {filtered.map((tpl) => {
                    const isCopied = copiedId === tpl.id;
                    const renderedHook = tpl.previewHook.replace(
                        /\[City\]|\[Country\]|\[Destination\]/g,
                        customCity || 'Lisbon'
                    );

                    return (
                        <div key={tpl.id} className="cm-template-card">
                            <div className="cm-template-top">
                                <span className="cm-tpl-format">{tpl.format}</span>
                                <span className="cm-tpl-rate">{tpl.conversionRate}</span>
                            </div>

                            <h3>{tpl.title}</h3>
                            <p className="cm-tpl-hook">{renderedHook}</p>

                            <ul className="cm-tpl-structure">
                                {tpl.structure.map((step, i) => (
                                    <li key={i}>{step}</li>
                                ))}
                            </ul>

                            <div className="cm-template-footer">
                                <span className="cm-tpl-platform">{tpl.platform}</span>
                                <button
                                    type="button"
                                    className="cm-upload-shot-btn"
                                    onClick={() => handleCopyTemplate(tpl)}
                                >
                                    {isCopied ? <Check size={15} /> : <Copy size={15} />}
                                    <span>{isCopied ? 'Copied Blueprint' : 'Use Template'}</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PostTemplatesHub;
