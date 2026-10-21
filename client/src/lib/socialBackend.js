import { supabase } from './supabaseClient';

function requireClient() {
  if (!supabase) throw new Error('Seenomad social backend is not configured.');
  return supabase;
}

async function requireUser(client, action) {
  const { data: { user }, error } = await client.auth.getUser();
  if (error) throw error;
  if (!user) throw new Error(`Sign in to ${action}.`);
  return user;
}

export async function publishSocialPost({ content, location = null, feeling = null, mediaUrls = [], postType = 'standard', metadata = {} }) {
  const client = requireClient();
  const user = await requireUser(client, 'publish a post');
  const { data, error } = await client.from('social_posts').insert({
    author_id: user.id, content: content.trim(), location, feeling,
    media_urls: mediaUrls, post_type: postType, metadata
  }).select('id, author_id, content, location, feeling, media_urls, post_type, metadata, created_at').single();
  if (error) throw error;
  return data;
}

export async function listSocialPosts({ limit = 30, before = null } = {}) {
  const client = requireClient();
  let query = client.from('social_posts')
    .select('id, author_id, content, location, feeling, media_urls, post_type, metadata, created_at')
    .eq('visibility', 'public').order('created_at', { ascending: false })
    .limit(Math.min(Math.max(limit, 1), 100));
  if (before) query = query.lt('created_at', before);
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

export async function getMyPostState(postKey) {
  const client = requireClient();
  const user = await requireUser(client, 'load your post interactions');
  const key = String(postKey);
  const [reactionResult, savedResult] = await Promise.all([
    client.from('social_reactions').select('reaction').eq('post_key', key).eq('user_id', user.id).maybeSingle(),
    client.from('social_saved_posts').select('post_key').eq('post_key', key).eq('user_id', user.id).maybeSingle()
  ]);
  if (reactionResult.error) throw reactionResult.error;
  if (savedResult.error) throw savedResult.error;
  return { reaction: reactionResult.data?.reaction ?? null, saved: Boolean(savedResult.data) };
}

export async function setPostReaction(postKey, reaction) {
  const client = requireClient();
  const user = await requireUser(client, 'react to posts');
  const key = String(postKey);
  if (!reaction) {
    const { error } = await client.from('social_reactions').delete().eq('post_key', key).eq('user_id', user.id);
    if (error) throw error;
    return null;
  }
  const { data, error } = await client.from('social_reactions')
    .upsert({ post_key: key, user_id: user.id, reaction }, { onConflict: 'post_key,user_id' })
    .select('post_key, reaction').single();
  if (error) throw error;
  return data;
}

export async function listMyReactions(postKeys) {
  const client = requireClient();
  const user = await requireUser(client, 'load your reactions');
  if (!postKeys.length) return {};
  const { data, error } = await client.from('social_reactions')
    .select('post_key, reaction').eq('user_id', user.id).in('post_key', postKeys.map(String));
  if (error) throw error;
  return Object.fromEntries((data ?? []).map((item) => [item.post_key, item.reaction]));
}

export async function addSocialComment(postKey, content) {
  const client = requireClient();
  const user = await requireUser(client, 'comment');
  const { data, error } = await client.from('social_comments')
    .insert({ post_key: String(postKey), author_id: user.id, content: content.trim() })
    .select('id, post_key, author_id, content, created_at').single();
  if (error) throw error;
  return data;
}

export async function listSocialComments(postKey, { limit = 100 } = {}) {
  const client = requireClient();
  const { data, error } = await client.from('social_comments')
    .select('id, post_key, author_id, content, created_at')
    .eq('post_key', String(postKey)).order('created_at', { ascending: true })
    .limit(Math.min(Math.max(limit, 1), 200));
  if (error) throw error;
  return data ?? [];
}

export async function setPostSaved(postKey, saved) {
  const client = requireClient();
  const user = await requireUser(client, 'save posts');
  const key = String(postKey);
  if (saved) {
    const { error } = await client.from('social_saved_posts')
      .upsert({ user_id: user.id, post_key: key }, { onConflict: 'user_id,post_key' });
    if (error) throw error;
  } else {
    const { error } = await client.from('social_saved_posts').delete()
      .eq('user_id', user.id).eq('post_key', key);
    if (error) throw error;
  }
  return saved;
}

export async function listMySavedPosts() {
  const client = requireClient();
  const user = await requireUser(client, 'view saved posts');
  const { data, error } = await client.from('social_saved_posts')
    .select('post_key, created_at').eq('user_id', user.id).order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function setFollowedUser(followingId, followed) {
  const client = requireClient();
  const user = await requireUser(client, 'follow travelers');
  if (followed) {
    const { error } = await client.from('social_follows')
      .upsert({ follower_id: user.id, following_id: followingId }, { onConflict: 'follower_id,following_id' });
    if (error) throw error;
  } else {
    const { error } = await client.from('social_follows')
      .delete().eq('follower_id', user.id).eq('following_id', followingId);
    if (error) throw error;
  }
  return followed;
}

export async function listMyFollows() {
  const client = requireClient();
  const user = await requireUser(client, 'load your follows');
  const { data, error } = await client.from('social_follows')
    .select('following_id, created_at').eq('follower_id', user.id).order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}
