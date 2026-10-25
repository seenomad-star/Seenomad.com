import { supabase } from './supabaseClient';

const requireSupabase = () => {
  if (!supabase) throw new Error('Seenomad account services are not configured.');
  return supabase;
};

const requireUser = async (client) => {
  const { data, error } = await client.auth.getUser();
  if (error) throw error;
  if (!data?.user) throw new Error('Please sign in to use saved destinations and trips.');
  return data.user;
};

const resolveDestinationId = async (client, destination) => {
  if (destination?.databaseId) return destination.databaseId;
  if (destination?.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(destination.id))) {
    return destination.id;
  }

  const externalId = destination?.external_id || (typeof destination?.id === 'string' ? destination.id : null);
  if (externalId) {
    const { data, error } = await client.from('destinations').select('id').eq('external_id', externalId).maybeSingle();
    if (error) throw error;
    if (data?.id) return data.id;
  }

  if (destination?.slug) {
    const { data, error } = await client.from('destinations').select('id').eq('slug', destination.slug).maybeSingle();
    if (error) throw error;
    if (data?.id) return data.id;
  }

  throw new Error('This destination is not yet available in the database. Refresh the destination catalogue and try again.');
};

export async function listSavedDestinations() {
  const client = requireSupabase();
  await requireUser(client);
  const { data, error } = await client
    .from('saved_destinations')
    .select('created_at, destination:destinations(id, external_id, slug, name, country, region, category, image_url, latitude, longitude)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data || []).map((row) => ({ ...row.destination, savedAt: row.created_at }));
}

export async function saveDestination(destination) {
  const client = requireSupabase();
  const user = await requireUser(client);
  const destinationId = await resolveDestinationId(client, destination);
  const { error } = await client
    .from('saved_destinations')
    .upsert(
      { user_id: user.id, destination_id: destinationId },
      { onConflict: 'user_id,destination_id', ignoreDuplicates: true }
    );
  if (error) throw error;
  return { saved: true, destinationId };
}

export async function unsaveDestination(destination) {
  const client = requireSupabase();
  const user = await requireUser(client);
  const destinationId = await resolveDestinationId(client, destination);
  const { error } = await client
    .from('saved_destinations')
    .delete()
    .eq('user_id', user.id)
    .eq('destination_id', destinationId);
  if (error) throw error;
  return { saved: false, destinationId };
}

export async function listTrips() {
  const client = requireSupabase();
  await requireUser(client);
  const { data, error } = await client
    .from('trips')
    .select('id, title, start_date, end_date, status, notes, created_at, updated_at')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createTrip({ title, startDate = null, endDate = null, notes = null } = {}) {
  const client = requireSupabase();
  const user = await requireUser(client);
  const normalizedTitle = String(title || '').trim();
  if (!normalizedTitle) throw new Error('A trip title is required.');
  if (normalizedTitle.length > 160) throw new Error('Trip titles must be 160 characters or fewer.');
  if (startDate && endDate && endDate < startDate) throw new Error('The trip end date cannot be before its start date.');

  const { data, error } = await client
    .from('trips')
    .insert({
      user_id: user.id,
      title: normalizedTitle,
      start_date: startDate,
      end_date: endDate,
      notes: notes ? String(notes).trim() : null,
      status: 'draft',
    })
    .select('id, title, start_date, end_date, status, notes, created_at, updated_at')
    .single();
  if (error) throw error;
  return data;
}

export async function updateTrip(tripId, updates = {}) {
  const client = requireSupabase();
  await requireUser(client);
  const patch = {};
  if (updates.title !== undefined) {
    patch.title = String(updates.title || '').trim();
    if (!patch.title || patch.title.length > 160) throw new Error('Trip title must contain 1–160 characters.');
  }
  if (updates.startDate !== undefined) patch.start_date = updates.startDate || null;
  if (updates.endDate !== undefined) patch.end_date = updates.endDate || null;
  if (updates.notes !== undefined) patch.notes = updates.notes ? String(updates.notes).trim() : null;
  if (updates.status !== undefined) {
    if (!['draft', 'planned', 'completed', 'cancelled'].includes(updates.status)) throw new Error('Invalid trip status.');
    patch.status = updates.status;
  }
  if (patch.start_date && patch.end_date && patch.end_date < patch.start_date) {
    throw new Error('The trip end date cannot be before its start date.');
  }
  if (!Object.keys(patch).length) throw new Error('No trip changes were supplied.');
  patch.updated_at = new Date().toISOString();

  const { data, error } = await client
    .from('trips')
    .update(patch)
    .eq('id', tripId)
    .select('id, title, start_date, end_date, status, notes, created_at, updated_at')
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTrip(tripId) {
  const client = requireSupabase();
  await requireUser(client);
  const { error } = await client.from('trips').delete().eq('id', tripId);
  if (error) throw error;
  return { deleted: true, tripId };
}

export async function listTripDestinations(tripId) {
  const client = requireSupabase();
  await requireUser(client);
  const { data, error } = await client
    .from('trip_destinations')
    .select('id, day_number, sort_order, notes, destination:destinations(id, external_id, slug, name, country, region, category, image_url, latitude, longitude)')
    .eq('trip_id', tripId)
    .order('day_number', { ascending: true, nullsFirst: true })
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function addDestinationToTrip(tripId, destination, { dayNumber = null, sortOrder = 0, notes = null } = {}) {
  const client = requireSupabase();
  await requireUser(client);
  if (dayNumber !== null && (!Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 366)) {
    throw new Error('Day number must be an integer between 1 and 366.');
  }
  const destinationId = await resolveDestinationId(client, destination);
  const { data, error } = await client
    .from('trip_destinations')
    .upsert(
      { trip_id: tripId, destination_id: destinationId, day_number: dayNumber, sort_order: Number.isInteger(sortOrder) ? sortOrder : 0, notes: notes ? String(notes).trim() : null },
      { onConflict: 'trip_id,destination_id' }
    )
    .select('id, trip_id, destination_id, day_number, sort_order, notes, created_at')
    .single();
  if (error) throw error;
  return data;
}

export async function updateTripDestination(stopId, updates = {}) {
  const client = requireSupabase();
  await requireUser(client);
  const patch = {};
  if (updates.dayNumber !== undefined) {
    if (updates.dayNumber !== null && (!Number.isInteger(updates.dayNumber) || updates.dayNumber < 1 || updates.dayNumber > 366)) {
      throw new Error('Day number must be an integer between 1 and 366.');
    }
    patch.day_number = updates.dayNumber;
  }
  if (updates.sortOrder !== undefined) {
    if (!Number.isInteger(updates.sortOrder)) throw new Error('Sort order must be an integer.');
    patch.sort_order = updates.sortOrder;
  }
  if (updates.notes !== undefined) patch.notes = updates.notes ? String(updates.notes).trim() : null;
  if (!Object.keys(patch).length) throw new Error('No trip-stop changes were supplied.');

  const { data, error } = await client
    .from('trip_destinations')
    .update(patch)
    .eq('id', stopId)
    .select('id, trip_id, destination_id, day_number, sort_order, notes, created_at')
    .single();
  if (error) throw error;
  return data;
}

export async function removeDestinationFromTrip(stopId) {
  const client = requireSupabase();
  await requireUser(client);
  const { error } = await client.from('trip_destinations').delete().eq('id', stopId);
  if (error) throw error;
  return { removed: true, stopId };
}
