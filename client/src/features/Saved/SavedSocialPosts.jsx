import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, ExternalLink, LoaderCircle, MapPin, RefreshCw, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { listMySavedSocialPosts, setPostSaved } from '../../lib/socialBackend';
import './SavedSocialPosts.css';

export default function SavedSocialPosts() {
  const navigate = useNavigate();
  const { configured, user, loading: authLoading } = useAuth();
  const [posts, setPosts] = useState([]);
  const [unresolvedCount, setUnresolvedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadSavedPosts = useCallback(async () => {
    if (!configured || !user) return;
    setLoading(true);
    setError('');
    try {
      const result = await listMySavedSocialPosts();
      setPosts(result.posts);
      setUnresolvedCount(result.unresolvedKeys.length);
    } catch (err) {
      setError(err?.message || 'Unable to load saved community posts.');
    } finally {
      setLoading(false);
    }
  }, [configured, user?.id]);

  useEffect(() => { void loadSavedPosts(); }, [loadSavedPosts]);

  const removeSaved = async (postId) => {
    try {
      await setPostSaved(postId, false);
      setPosts((current) => current.filter((post) => post.id !== postId));
    } catch (err) {
      setError(err?.message || 'Unable to remove this saved post.');
    }
  };

  if (authLoading) return <section className="saved-social-page"><div className="saved-social-status"><LoaderCircle className="saved-social-spin" /> Checking your account…</div></section>;

  if (!configured || !user) {
    return <section className="saved-social-page"><div className="saved-social-hero">
      <div className="saved-social-icon"><Bookmark size={25} /></div>
      <p className="saved-social-eyebrow">YOUR COMMUNITY LIBRARY</p>
      <h1>Saved posts</h1>
      <p>Keep travel ideas, recommendations, and stories together across your signed-in devices.</p>
      <button className="saved-social-primary" onClick={() => navigate('/auth')}>Sign in to view saved posts</button>
    </div></section>;
  }

  return <section className="saved-social-page">
    <header className="saved-social-header">
      <div><p className="saved-social-eyebrow">YOUR COMMUNITY LIBRARY</p><h1><Bookmark size={26} /> Saved posts</h1><p>Travel inspiration you’ve bookmarked from the Seenomad community.</p></div>
      <button className="saved-social-refresh" onClick={() => void loadSavedPosts()} disabled={loading} aria-label="Refresh saved posts"><RefreshCw size={16} /> Refresh</button>
    </header>
    {error && <div className="saved-social-error" role="alert">{error}</div>}
    {unresolvedCount > 0 && <div className="saved-social-notice" role="status">{unresolvedCount} saved item{unresolvedCount === 1 ? '' : 's'} came from older demo content and cannot be reconstructed from the remote database. They have not been deleted.</div>}
    {loading ? <div className="saved-social-status"><LoaderCircle className="saved-social-spin" /> Loading your saved posts…</div> :
      posts.length === 0 ? <div className="saved-social-empty"><Bookmark size={30} /><h2>No synced posts saved yet</h2><p>Browse the community feed and bookmark posts you want to revisit.</p><button className="saved-social-primary" onClick={() => navigate('/')}>Explore community feed <ExternalLink size={15} /></button></div> :
      <div className="saved-social-grid">{posts.map((post) => {
        const image = (post.media_urls || []).find((url) => typeof url === 'string' && url.startsWith('http'));
        return <article className="saved-social-card" key={post.id}>
          {image && <img className="saved-social-card-image" src={image} alt="" loading="lazy" />}
          <div className="saved-social-card-content">
            {post.location && <p className="saved-social-location"><MapPin size={14} /> {post.location}</p>}
            <p className="saved-social-post-text">{post.content || 'Travel media post'}</p>
            <p className="saved-social-date">Posted {new Date(post.created_at).toLocaleDateString()}</p>
            <div className="saved-social-card-actions"><button onClick={() => navigate('/')}><ExternalLink size={14} /> Feed</button><button className="saved-social-remove" onClick={() => void removeSaved(post.id)}><Trash2 size={14} /> Unsave</button></div>
          </div>
        </article>;
      })}</div>}
  </section>;
}
