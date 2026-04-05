import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../AuthContext';

/**
 * Loads and saves marketing opt-in in `user_marketing_consent` (Supabase).
 * On first load, creates a row from signup metadata if none exists.
 */
export function useMarketingConsent() {
  const { user, supabase } = useAuth();
  const [optedIn, setOptedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      setOptedIn(false);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      const { data: row, error: selErr } = await supabase
        .from('user_marketing_consent')
        .select('opted_in')
        .eq('user_id', user.id)
        .maybeSingle();

      if (cancelled) return;

      if (selErr) {
        console.error('marketing consent load:', selErr);
        setOptedIn(user.user_metadata?.marketing_consent === true);
        setLoading(false);
        return;
      }

      if (row) {
        setOptedIn(!!row.opted_in);
        setLoading(false);
        return;
      }

      const fromMeta = user.user_metadata?.marketing_consent === true;
      const now = new Date().toISOString();
      const { error: insErr } = await supabase.from('user_marketing_consent').insert({
        user_id: user.id,
        opted_in: fromMeta,
        consent_at: fromMeta ? now : null,
        updated_at: now,
        source: 'lazy_init',
      });

      if (cancelled) return;

      if (insErr) {
        const { data: again } = await supabase
          .from('user_marketing_consent')
          .select('opted_in')
          .eq('user_id', user.id)
          .maybeSingle();
        if (!cancelled && again) setOptedIn(!!again.opted_in);
        else if (!cancelled) setOptedIn(fromMeta);
      } else {
        setOptedIn(fromMeta);
      }
      setLoading(false);
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [user, supabase]);

  const save = useCallback(
    async (next, source = 'profile') => {
      if (!user) return { error: new Error('Not signed in') };
      setSaving(true);
      const now = new Date().toISOString();
      const { error } = await supabase.from('user_marketing_consent').upsert(
        {
          user_id: user.id,
          opted_in: next,
          consent_at: next ? now : null,
          updated_at: now,
          source,
        },
        { onConflict: 'user_id' }
      );
      setSaving(false);
      if (!error) setOptedIn(next);
      return { error };
    },
    [user, supabase]
  );

  return { optedIn, loading, saving, save };
}
