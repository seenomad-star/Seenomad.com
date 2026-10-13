import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, MapPin, Calendar, Plane, Plus, Check, Star, Sparkles, X, Globe } from 'lucide-react';
import { useNomadOSStore } from '../../../store/nomadOSStore';
import { useToastStore } from '../../../store/toastStore';
import './NomadPassportStamps.css';

export const INITIAL_STAMPS = [
    {
        id: 'stamp-lis',
        country: 'Portugal',
        code: 'PRT',
        city: 'Lisbon',
        airport: 'LIS · Aeroporto de Lisboa',
        visaType: 'D8 Digital Nomad Visa',
        entryDate: '12 JAN 2026',
        daysStayed: 78,
        color: '#3b82f6',
        rotation: -4,
        flag: '🇵🇹',
        memory: 'Sunset coding sessions from Miradouro de Santa Catarina and Pasteis de Belém mornings.',
        favoriteCafe: 'Copenhagen Coffee Lab, Alfama',
        xpAwarded: 150
    },
    {
        id: 'stamp-dps',
        country: 'Indonesia',
        code: 'IDN',
        city: 'Canggu, Bali',
        airport: 'DPS · Ngurah Rai Intl',
        visaType: 'B211A Remote Worker',
        entryDate: '14 JUN 2025',
        daysStayed: 60,
        color: '#10b981',
        rotation: 3,
        flag: '🇮🇩',
        memory: 'Sunrise surf sessions at Echo Beach and deep work sprints from tropical bamboo coworking spaces.',
        favoriteCafe: 'Dojo & Zin Cafe Canggu',
        xpAwarded: 200
    },
    {
        id: 'stamp-nrt',
        country: 'Japan',
        code: 'JPN',
        city: 'Tokyo',
        airport: 'NRT · Narita International',
        visaType: 'Japan 6-Mo Nomad Visa',
        entryDate: '10 OCT 2025',
        daysStayed: 45,
        color: '#ef4444',
        rotation: -2,
        flag: '🇯🇵',
        memory: 'Shibuya crossing timelapse, high-speed Shinkansen fiber, and late-night ramen coding runs in Shinjuku.',
        favoriteCafe: 'Fuglen Tokyo, Shibuya',
        xpAwarded: 250
    },
    {
        id: 'stamp-del',
        country: 'India',
        code: 'IND',
        city: 'New Delhi',
        airport: 'DEL · Indira Gandhi Intl',
        visaType: 'e-Tourist Heritage Visa',
        entryDate: '18 NOV 2025',
        daysStayed: 21,
        color: '#f59e0b',
        rotation: 4,
        flag: '🇮🇳',
        memory: 'Cycling Kartavya Path past India Gate at dawn, Paranthe Wali Gali food trail, and Hauz Khas lakeside coworks.',
        favoriteCafe: 'Social Hauz Khas & Blue Tokai',
        xpAwarded: 180
    },
    {
        id: 'stamp-mde',
        country: 'Colombia',
        code: 'COL',
        city: 'Medellin',
        airport: 'MDE · Jose Maria Cordova',
        visaType: 'Visa Nómada Digital',
        entryDate: '05 JAN 2025',
        daysStayed: 42,
        color: '#a855f7',
        rotation: -5,
        flag: '🇨🇴',
        memory: 'Eternal spring rooftop workspaces in El Poblado, Comuna 13 street art tour, and fresh Paisa coffee.',
        favoriteCafe: 'Pergamino Cafe, El Poblado',
        xpAwarded: 160
    },
    {
        id: 'stamp-bkk',
        country: 'Thailand',
        code: 'THA',
        city: 'Bangkok',
        airport: 'BKK · Suvarnabhumi Airport',
        visaType: 'DTV Destination Thailand',
        entryDate: '02 FEB 2025',
        daysStayed: 35,
        color: '#06b6d4',
        rotation: 2,
        flag: '🇹🇭',
        memory: 'Chao Phraya river ferries, Yaowarat Chinatown street eats, and sky-high coworking decks overlooking the skyline.',
        favoriteCafe: 'Paper Plane Project, Sukhumvit',
        xpAwarded: 140
    },
    {
        id: 'stamp-bcn',
        country: 'Spain',
        code: 'ESP',
        city: 'Barcelona',
        airport: 'BCN · Josep Tarradellas',
        visaType: 'Ley de Startups Nomad',
        entryDate: '22 AUG 2024',
        daysStayed: 30,
        color: '#ec4899',
        rotation: -3,
        flag: '🇪🇸',
        memory: 'Biking along Barceloneta beach, Gothic Quarter tapas walks, and open-air design studios in Poblenou.',
        favoriteCafe: 'Nomad Coffee Lab, El Born',
        xpAwarded: 150
    },
    {
        id: 'stamp-ath',
        country: 'Greece',
        code: 'GRC',
        city: 'Athens',
        airport: 'ATH · Eleftherios Venizelos',
        visaType: 'Hellenic Digital Nomad',
        entryDate: '04 MAY 2024',
        daysStayed: 24,
        color: '#0284c7',
        rotation: 5,
        flag: '🇬🇷',
        memory: 'Acropolis views from Monastiraki rooftops, island day hopping to Hydra, and rooftop Greek yogurt breakfasts.',
        favoriteCafe: 'Underdog, Thiseio',
        xpAwarded: 130
    }
];

const NomadPassportStamps = () => {
    const [stamps, setStamps] = useState(INITIAL_STAMPS);
    const [selectedStamp, setSelectedStamp] = useState(null);
    const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
    const [newCity, setNewCity] = useState('');
    const [newCountry, setNewCountry] = useState('');

    const { addXP } = useNomadOSStore();
    const { addToast } = useToastStore();

    const handleClaimNewStamp = (e) => {
        e.preventDefault();
        if (!newCity.trim() || !newCountry.trim()) return;

        const newStampObj = {
            id: `stamp-${Date.now()}`,
            country: newCountry.trim(),
            code: newCountry.slice(0, 3).toUpperCase(),
            city: newCity.trim(),
            airport: `${newCity.slice(0, 3).toUpperCase()} Intl Port`,
            visaType: 'Verified Entry Stamp',
            entryDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
            daysStayed: 1,
            color: '#10b981',
            rotation: Math.floor(Math.random() * 8) - 4,
            flag: '🌐',
            memory: `Official verified check-in at ${newCity}, ${newCountry}. Stamped into your digital citizenship passport.`,
            favoriteCafe: 'Local Nomad Hub',
            xpAwarded: 100
        };

        setStamps([newStampObj, ...stamps]);
        addXP(100);
        addToast(`Passport stamped for ${newCity}! +100 XP added to your rank.`, 'success');
        setNewCity('');
        setNewCountry('');
        setIsClaimModalOpen(false);
    };

    return (
        <div className="passport-stamps-container">
            {/* Passport Book Header Card */}
            <div className="passport-book-header">
                <div className="passport-emblem-group">
                    <div className="passport-gold-crest">
                        <Globe size={26} className="crest-globe" />
                        <Sparkles size={14} className="crest-star-top" />
                    </div>
                    <div>
                        <div className="passport-doc-type">DIGITAL NOMAD REPUBLICA</div>
                        <h3 className="passport-doc-name">World Citizen Passport</h3>
                        <p className="passport-doc-meta">
                            No. <strong>ND-8842-X7</strong> · Category: <strong>Global Explorer Sovereign</strong>
                        </p>
                    </div>
                </div>

                <div className="passport-stamp-stats">
                    <div className="stamp-stat-block">
                        <span className="stat-num">{stamps.length}</span>
                        <span className="stat-label">Stamps Earned</span>
                    </div>
                    <div className="stamp-stat-block">
                        <span className="stat-num">18</span>
                        <span className="stat-label">Countries Done</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsClaimModalOpen(true)}
                        className="btn-stamp-new"
                    >
                        <Plus size={15} />
                        <span>Stamp New Base</span>
                    </button>
                </div>
            </div>

            {/* Passport Visa Pages Grid */}
            <div className="passport-pages-surface">
                <div className="passport-watermark" aria-hidden="true">
                    <span>SEE NOMAD · VISAS & IMMIGRATION</span>
                </div>

                <div className="passport-stamps-grid">
                    {stamps.map((stamp) => (
                        <motion.div
                            key={stamp.id}
                            className="passport-stamp-tile"
                            style={{ 
                                '--stamp-color': stamp.color,
                                transform: `rotate(${stamp.rotation}deg)`
                            }}
                            whileHover={{ scale: 1.05, rotate: 0 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedStamp(stamp)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Inspect visa stamp for ${stamp.city}, ${stamp.country}`}
                        >
                            <div className="stamp-outer-ring">
                                <div className="stamp-inner-border">
                                    <div className="stamp-header-row">
                                        <span className="stamp-flag">{stamp.flag}</span>
                                        <span className="stamp-code">{stamp.code}</span>
                                        <span className="stamp-type-short">IMMIGRATION</span>
                                    </div>
                                    <div className="stamp-center-city">
                                        {stamp.city.toUpperCase()}
                                    </div>
                                    <div className="stamp-center-date">
                                        ★ {stamp.entryDate} ★
                                    </div>
                                    <div className="stamp-bottom-meta">
                                        <span>{stamp.airport.split('·')[0].trim()}</span>
                                        <span>ENTRY APPROVED</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Stamp Detail Inspection Modal */}
            <AnimatePresence>
                {selectedStamp && (
                    <div className="stamp-modal-backdrop" onClick={() => setSelectedStamp(null)}>
                        <motion.div
                            className="stamp-modal-card"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.92, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 15 }}
                        >
                            <div className="stamp-modal-header" style={{ borderColor: selectedStamp.color }}>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{selectedStamp.flag}</span>
                                    <div>
                                        <h3 className="stamp-modal-city">{selectedStamp.city}, {selectedStamp.country}</h3>
                                        <span className="stamp-modal-visa">{selectedStamp.visaType}</span>
                                    </div>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => setSelectedStamp(null)}
                                    className="stamp-modal-close"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="stamp-modal-body">
                                <div className="stamp-modal-meta-grid">
                                    <div className="meta-box">
                                        <Calendar size={14} className="text-amber-400" />
                                        <div>
                                            <span className="label">Entry Date</span>
                                            <strong className="val">{selectedStamp.entryDate}</strong>
                                        </div>
                                    </div>
                                    <div className="meta-box">
                                        <Plane size={14} className="text-blue-400" />
                                        <div>
                                            <span className="label">Port of Entry</span>
                                            <strong className="val">{selectedStamp.airport}</strong>
                                        </div>
                                    </div>
                                    <div className="meta-box">
                                        <MapPin size={14} className="text-red-400" />
                                        <div>
                                            <span className="label">Time in Base</span>
                                            <strong className="val">{selectedStamp.daysStayed} Days</strong>
                                        </div>
                                    </div>
                                    <div className="meta-box">
                                        <Award size={14} className="text-emerald-400" />
                                        <div>
                                            <span className="label">XP Rewarded</span>
                                            <strong className="val">+{selectedStamp.xpAwarded} XP</strong>
                                        </div>
                                    </div>
                                </div>

                                <div className="stamp-memory-box">
                                    <h4>Nomad Memory Note</h4>
                                    <p>"{selectedStamp.memory}"</p>
                                    <div className="favorite-spot-tag">
                                        ☕ Top Work Cafe: <strong>{selectedStamp.favoriteCafe}</strong>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Claim New Stamp Modal */}
            <AnimatePresence>
                {isClaimModalOpen && (
                    <div className="stamp-modal-backdrop" onClick={() => setIsClaimModalOpen(false)}>
                        <motion.div
                            className="stamp-modal-card"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ opacity: 0, scale: 0.92, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 15 }}
                        >
                            <div className="stamp-modal-header">
                                <div className="flex items-center gap-2">
                                    <Plane size={20} className="text-amber-500" />
                                    <h3 className="stamp-modal-city">Stamp A New Nomad Base</h3>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => setIsClaimModalOpen(false)}
                                    className="stamp-modal-close"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <form onSubmit={handleClaimNewStamp} className="stamp-claim-form">
                                <p className="claim-intro">
                                    Arrived in a new country or city? Stamp your digital passport to record your travel timeline and claim <strong>+100 XP</strong> toward your explorer rank.
                                </p>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="stamp-city">City / Destination</label>
                                    <input
                                        id="stamp-city"
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. Kyoto, New Delhi, Seoul, Florianopolis"
                                        value={newCity}
                                        onChange={(e) => setNewCity(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label" htmlFor="stamp-country">Country</label>
                                    <input
                                        id="stamp-country"
                                        type="text"
                                        className="form-input"
                                        placeholder="e.g. Japan, India, South Korea, Brazil"
                                        value={newCountry}
                                        onChange={(e) => setNewCountry(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex justify-end gap-3 mt-4">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsClaimModalOpen(false)}
                                        className="btn-cancel"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn-save"
                                    >
                                        <Check size={16} /> Stamp Passport (+100 XP)
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NomadPassportStamps;
