import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Bookmark,
    FolderPlus,
    Folder,
    Play,
    MapPin,
    Wifi,
    Sun,
    DollarSign,
    Trash2,
    Compass,
    Search,
    Sparkles,
    Volume2,
    VolumeX,
    CheckCircle2,
    Edit3,
    Plus,
    X,
    ArrowUpRight,
    Film,
    Layers
} from 'lucide-react';
import { useSavedVibesStore } from '../../../store/savedVibesStore';
import '../../../styles/SavedVibesVault.css';

const SavedVibesVault = ({ embedded = false }) => {
    const navigate = useNavigate();
    const {
        savedVibes,
        vibeFolders,
        removeSavedVibe,
        moveVibeToFolder,
        updateVibeNote,
        createVibeFolder,
        deleteVibeFolder
    } = useSavedVibesStore();

    const [activeFolder, setActiveFolder] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('recent'); // 'recent' | 'score' | 'likes'
    const [activeSoundId, setActiveSoundId] = useState(null);

    // New Collection Folder Modal / Inline Input
    const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');
    const [newFolderEmoji, setNewFolderEmoji] = useState('🌴');

    // Editing Personal Note State
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [noteDraft, setNoteDraft] = useState('');

    // Active Video Preview Modal
    const [previewVibe, setPreviewVibe] = useState(null);

    const filteredVibes = useMemo(() => {
        const list = savedVibes.filter((vibe) => {
            const matchesFolder = activeFolder === 'all' || vibe.folder === activeFolder;
            if (!matchesFolder) return false;

            if (!searchQuery.trim()) return true;
            const q = searchQuery.toLowerCase();
            return (
                vibe.title?.toLowerCase().includes(q) ||
                vibe.location?.toLowerCase().includes(q) ||
                vibe.creatorName?.toLowerCase().includes(q) ||
                vibe.personalNote?.toLowerCase().includes(q) ||
                vibe.folder?.toLowerCase().includes(q)
            );
        });

        if (sortBy === 'score') {
            return [...list].sort((a, b) => (b.vibeScore || 0) - (a.vibeScore || 0));
        }
        if (sortBy === 'likes') {
            return [...list].sort((a, b) => (b.likes || 0) - (a.likes || 0));
        }
        return [...list].sort(
            (a, b) => new Date(b.savedAt || 0).getTime() - new Date(a.savedAt || 0).getTime()
        );
    }, [savedVibes, activeFolder, searchQuery, sortBy]);

    const getFolderCount = (folderId) => {
        if (folderId === 'all') return savedVibes.length;
        return savedVibes.filter((v) => v.folder === folderId).length;
    };

    const handleCreateFolderSubmit = (e) => {
        e.preventDefault();
        if (!newFolderName.trim()) return;
        const created = createVibeFolder(newFolderName.trim(), newFolderEmoji);
        if (created) {
            setActiveFolder(newFolderName.trim());
            setNewFolderName('');
            setIsCreatingFolder(false);
        }
    };

    const handleStartEditNote = (vibe) => {
        setEditingNoteId(vibe.id);
        setNoteDraft(vibe.personalNote || '');
    };

    const handleSaveNote = (vibeId) => {
        updateVibeNote(vibeId, noteDraft.trim());
        setEditingNoteId(null);
    };

    return (
        <section className={`saved-vibes-vault ${embedded ? 'is-embedded' : ''}`} aria-label="Saved Vibes Collection">
            {/* 1. Header Banner */}
            <header className="sv-vault-header">
                <div className="sv-vault-brand">
                    <div className="sv-kicker-pill">
                        <Bookmark size={13} />
                        <span>PERSONAL VIBE VAULT · BOOKMARKED TRAVEL CLIPS</span>
                    </div>
                    <h2>Saved Vibes ({savedVibes.length})</h2>
                    <p>
                        Organize your favorite short-form travel clips into custom trip collections, add personal field notes, and clone day-plans whenever you are ready to travel.
                    </p>
                </div>

                <div className="sv-header-actions">
                    <button
                        type="button"
                        className="sv-btn-outline"
                        onClick={() => setIsCreatingFolder((prev) => !prev)}
                    >
                        <FolderPlus size={15} />
                        <span>New Collection</span>
                    </button>
                    <button
                        type="button"
                        className="sv-btn-primary"
                        onClick={() => navigate('/explore/vibes')}
                    >
                        <Film size={15} />
                        <span>Browse Vibes Feed</span>
                    </button>
                </div>
            </header>

            {/* 2. Optional New Collection Creator Bar */}
            {isCreatingFolder && (
                <form className="sv-new-folder-bar" onSubmit={handleCreateFolderSubmit}>
                    <div className="sv-folder-bar-left">
                        <select
                            value={newFolderEmoji}
                            onChange={(e) => setNewFolderEmoji(e.target.value)}
                            aria-label="Collection icon"
                            className="sv-emoji-select"
                        >
                            <option value="🌴">🌴</option>
                            <option value="🏔️">🏔️</option>
                            <option value="🍜">🍜</option>
                            <option value="💻">💻</option>
                            <option value="🌊">🌊</option>
                            <option value="✈️">✈️</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Collection name (e.g., Autumn Japan Sprint, Surf Stays)..."
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            autoFocus
                        />
                    </div>
                    <div className="sv-folder-bar-actions">
                        <button type="submit" className="sv-btn-primary compact">
                            <Plus size={14} /> Create Folder
                        </button>
                        <button
                            type="button"
                            className="sv-btn-ghost"
                            onClick={() => setIsCreatingFolder(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* 3. Collection Folders Bar + Search & Sort Controls */}
            <div className="sv-controls-wrapper">
                <div className="sv-folders-scroll" role="tablist" aria-label="Saved Vibe Collections">
                    {vibeFolders.map((folder) => {
                        const isActive = activeFolder === folder.id;
                        const count = getFolderCount(folder.id);
                        return (
                            <div key={folder.id} className={`sv-folder-chip-wrap ${isActive ? 'active' : ''}`}>
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={isActive}
                                    className={`sv-folder-chip ${isActive ? 'active' : ''}`}
                                    onClick={() => setActiveFolder(folder.id)}
                                >
                                    <span>{folder.emoji || '📁'}</span>
                                    <span>{folder.label}</span>
                                    <span className="sv-folder-count">{count}</span>
                                </button>
                                {!folder.isSystem && (
                                    <button
                                        type="button"
                                        className="sv-folder-del-btn"
                                        title={`Delete ${folder.label} folder`}
                                        onClick={() => {
                                            if (activeFolder === folder.id) setActiveFolder('all');
                                            deleteVibeFolder(folder.id);
                                        }}
                                    >
                                        <X size={11} />
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="sv-search-sort-row">
                    <div className="sv-search-box">
                        <Search size={15} />
                        <input
                            type="text"
                            placeholder="Search saved clips by city, title, or personal note..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button type="button" onClick={() => setSearchQuery('')} aria-label="Clear search">
                                <X size={13} />
                            </button>
                        )}
                    </div>

                    <select
                        className="sv-sort-select"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        aria-label="Sort saved vibes"
                    >
                        <option value="recent">Sort: Recently Saved</option>
                        <option value="score">Sort: Highest Vibe Match</option>
                        <option value="likes">Sort: Most Popular</option>
                    </select>
                </div>
            </div>

            {/* 4. Saved Vibes Grid */}
            {filteredVibes.length > 0 ? (
                <div className="sv-cards-grid">
                    {filteredVibes.map((vibe) => {
                        const isPlayingSound = activeSoundId === vibe.id;
                        const isEditingNote = editingNoteId === vibe.id;

                        return (
                            <article key={vibe.id} className="sv-vibe-card">
                                {/* Video / Visual Stage */}
                                <div className="sv-media-stage" onClick={() => setPreviewVibe(vibe)}>
                                    {vibe.mediaType === 'video' && vibe.videoUrl ? (
                                        <video
                                            src={vibe.videoUrl}
                                            poster={vibe.image}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="sv-media-video"
                                        />
                                    ) : (
                                        <img src={vibe.image} alt={vibe.title} className="sv-media-video" />
                                    )}
                                    <div className="sv-media-scrim" />

                                    <div className="sv-stage-top">
                                        <span className="sv-folder-badge">
                                            <Folder size={11} /> {vibe.folder || 'Must Visit'}
                                        </span>
                                        <button
                                            type="button"
                                            className="sv-unsave-btn"
                                            title="Remove from Saved Vibes"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeSavedVibe(vibe.id);
                                            }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    <div className="sv-stage-bottom">
                                        <div className="sv-loc-pill">
                                            <MapPin size={12} />
                                            <span>{vibe.location}</span>
                                        </div>
                                        <h3>{vibe.title}</h3>
                                        <div className="sv-creator-mini">
                                            <img src={vibe.avatar} alt={vibe.creatorName} />
                                            <span>{vibe.creatorName} ({vibe.creator})</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Telemetry Strip */}
                                <div className="sv-telemetry-strip">
                                    <span><Sun size={12} /> {vibe.temp || '25°C'}</span>
                                    <span><Wifi size={12} /> {vibe.wifiSpeed || '300 Mbps'}</span>
                                    <span><DollarSign size={12} /> {vibe.dailyBudget || '$55/d'}</span>
                                </div>

                                {/* Organization & Notes Body */}
                                <div className="sv-card-body">
                                    {/* Folder Organizer Selector */}
                                    <div className="sv-organize-row">
                                        <label className="sv-folder-select-label">
                                            <span><Layers size={12} /> Collection:</span>
                                            <select
                                                value={vibe.folder || 'Must Visit'}
                                                onChange={(e) => moveVibeToFolder(vibe.id, e.target.value)}
                                            >
                                                {vibeFolders
                                                    .filter((f) => f.id !== 'all')
                                                    .map((f) => (
                                                        <option key={f.id} value={f.id}>
                                                            {f.emoji} {f.label}
                                                        </option>
                                                    ))}
                                            </select>
                                        </label>

                                        <span className="sv-copyright-mini">
                                            <CheckCircle2 size={11} /> {vibe.copyrightTag || '© Original Clip'}
                                        </span>
                                    </div>

                                    {/* Personal Reference Note */}
                                    <div className="sv-note-box">
                                        {isEditingNote ? (
                                            <div className="sv-note-editor">
                                                <input
                                                    type="text"
                                                    placeholder="Add a reminder (e.g., Best Wi-Fi table, sunset time)..."
                                                    value={noteDraft}
                                                    onChange={(e) => setNoteDraft(e.target.value)}
                                                    autoFocus
                                                />
                                                <button
                                                    type="button"
                                                    className="sv-note-save-btn"
                                                    onClick={() => handleSaveNote(vibe.id)}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                className="sv-note-display"
                                                onClick={() => handleStartEditNote(vibe)}
                                                title="Click to edit personal reference note"
                                            >
                                                <Edit3 size={12} />
                                                <span>
                                                    {vibe.personalNote
                                                        ? vibe.personalNote
                                                        : 'Add personal travel note or reference tip...'}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Footer */}
                                    <div className="sv-card-actions">
                                        <button
                                            type="button"
                                            className="sv-action-clone"
                                            onClick={() => navigate('/explore/trip-builder')}
                                        >
                                            <Compass size={14} />
                                            <span>Clone Day-Plan</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="sv-action-watch"
                                            onClick={() => setPreviewVibe(vibe)}
                                        >
                                            <Play size={13} />
                                            <span>Watch Clip</span>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            ) : (
                <div className="sv-empty-state">
                    <div className="sv-empty-icon">
                        <Bookmark size={28} />
                    </div>
                    <h3>No Saved Vibes in "{activeFolder === 'all' ? 'All Saved Vibes' : activeFolder}"</h3>
                    <p>
                        Bookmark any short-form travel video from the Vibes feed to organize it into collections for future trips.
                    </p>
                    <button
                        type="button"
                        className="sv-btn-primary"
                        onClick={() => navigate('/explore/vibes')}
                    >
                        <Sparkles size={15} />
                        <span>Explore Travel Vibes Feed</span>
                    </button>
                </div>
            )}

            {/* 5. Fullscreen Clip Player Modal */}
            {previewVibe && (
                <div className="vibe-modal-backdrop" onClick={() => setPreviewVibe(null)}>
                    <div className="sv-preview-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="sv-preview-video-wrap">
                            {previewVibe.mediaType === 'video' && previewVibe.videoUrl ? (
                                <video
                                    src={previewVibe.videoUrl}
                                    poster={previewVibe.image}
                                    autoPlay
                                    loop
                                    controls
                                    playsInline
                                    className="sv-preview-video-el"
                                />
                            ) : (
                                <img
                                    src={previewVibe.image}
                                    alt={previewVibe.title}
                                    className="sv-preview-video-el"
                                />
                            )}
                        </div>
                        <div className="sv-preview-info">
                            <div className="sv-preview-top">
                                <span className="sv-folder-badge">
                                    <Folder size={12} /> {previewVibe.folder || 'Must Visit'}
                                </span>
                                <button
                                    type="button"
                                    className="vibe-modal-close"
                                    onClick={() => setPreviewVibe(null)}
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <h3>{previewVibe.title}</h3>
                            <p className="sv-preview-loc">
                                <MapPin size={13} /> {previewVibe.location} · {previewVibe.coordinates}
                            </p>
                            <p className="sv-preview-story">{previewVibe.story}</p>

                            {previewVibe.personalNote && (
                                <div className="sv-preview-note">
                                    <strong>My Travel Note:</strong> {previewVibe.personalNote}
                                </div>
                            )}

                            <div className="sv-preview-actions">
                                <button
                                    type="button"
                                    className="sv-btn-primary"
                                    onClick={() => {
                                        setPreviewVibe(null);
                                        navigate('/explore/trip-builder');
                                    }}
                                >
                                    <Compass size={15} />
                                    <span>Open in Trip Builder</span>
                                </button>
                                <button
                                    type="button"
                                    className="sv-btn-outline"
                                    onClick={() => {
                                        setPreviewVibe(null);
                                        navigate('/explore/book-travel');
                                    }}
                                >
                                    <span>Book Travel Route</span>
                                    <ArrowUpRight size={15} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default SavedVibesVault;
