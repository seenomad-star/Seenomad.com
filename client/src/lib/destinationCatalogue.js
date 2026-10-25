import { supabase } from './supabaseClient';

/**
 * Fetch the public, published destination catalogue from Supabase.
 * Returns null when Supabase is not configured or the request fails so callers
 * can retain the existing bundled catalogue as a safe fallback.
 */
export async function fetchPublishedDestinations({ pageSize = 500, maxRows = 5000 } = {}) {
  if (!supabase) return null;

  const rows = [];
  try {
    for (let from = 0; from < maxRows; from += pageSize) {
      const to = Math.min(from + pageSize - 1, maxRows - 1);
      const { data, error } = await supabase
        .from('destinations')
        .select('id, external_id, slug, name, country, region, category, description, latitude, longitude, image_url, highlights, tags, best_time_to_visit, ideal_stay_days, is_published')
        .eq('is_published', true)
        .order('name', { ascending: true })
        .range(from, to);

      if (error) throw error;
      const batch = data ?? [];
      rows.push(...batch);
      if (batch.length < pageSize) break;
    }

    return rows.map((row) => ({
      id: row.external_id || row.slug || row.id,
      databaseId: row.id,
      slug: row.slug,
      name: row.name,
      country: row.country,
      region: row.region,
      location: [row.region, row.country].filter(Boolean).join(', '),
      category: row.category || 'Other',
      image: row.image_url || '',
      image_url: row.image_url || '',
      lat: row.latitude,
      lng: row.longitude,
      latitude: row.latitude,
      longitude: row.longitude,
      aiInsight: row.description || '',
      description: row.description || '',
      highlights: row.highlights || [],
      tags: row.tags || [],
      bestTimeToVisit: row.best_time_to_visit || null,
      idealStayDays: row.ideal_stay_days || null,
      isFromDatabase: true,
    }));
  } catch (error) {
    console.error('Unable to load Seenomad destination catalogue from Supabase:', error);
    return null;
  }
}
