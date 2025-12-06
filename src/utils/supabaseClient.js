// setup supabase
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export async function getRecommendations(preferences) {
  const { data: perfumes, error } = await supabase
    .from('perfumes')
    .select(
      'id, name, brand, gender, longevity, activity, price_tier, all_notes, description, main_accord, notes_structured'
    )
    .or(
      `gender.eq.${preferences.gender},longevity.eq.${preferences.intensity},activity.ilike.%${preferences.occasions}%,price_tier.eq.${preferences.price}`
    )
    .contains('all_notes', preferences.notes)
    .limit(3);

  if (error) {
    console.error('Error fetching perfumes from Supabase:', error);
    return { data: null, error };
  }

  return { data: perfumes, error: null };
}

export default supabase;
