'use client';

import AdminShell from '@/components/admin/AdminShell';
import { getSupabaseBrowser } from '@/lib/supabase-browser';
import { useEffect, useState } from 'react';

const CONTENT_GROUPS: Record<string, string[]> = {
  Hero: ['hero_badge', 'hero_subtitle', 'hero_title', 'hero_description', 'hero_image', 'hero_cta_whatsapp', 'hero_cta_produk'],
  Duta: ['duta_label', 'duta_title', 'duta_desc', 'duta_link_text'],
  Produk: ['produk_label', 'produk_title', 'produk_subtitle'],
  Sejarah: ['sejarah_label', 'sejarah_title'],
  Testimonial: ['testimonial_label', 'testimonial_title'],
  Benefits: ['benefits_label', 'benefits_title', 'benefits_subtitle', 'benefit_1_icon', 'benefit_1_title', 'benefit_1_desc', 'benefit_2_icon', 'benefit_2_title', 'benefit_2_desc', 'benefit_3_icon', 'benefit_3_title', 'benefit_3_desc', 'benefit_4_icon', 'benefit_4_title', 'benefit_4_desc', 'benefit_5_icon', 'benefit_5_title', 'benefit_5_desc'],
  'Customer Service': ['cs_label', 'cs_title', 'cs_subtitle', 'faq_preview_title', 'faq_link_text'],
  Footer: ['footer_tagline', 'footer_brand_desc', 'footer_copyright', 'footer_website'],
  Marquee: ['marquee_items'],
  Counter: ['counter_stats'],
  Video: ['video_url'],
  Contact: ['whatsapp'],
  'Social Media': ['instagram', 'tiktok', 'facebook'],
  About: ['about_quote', 'about_founder', 'about_description'],
};

type ContentMap = Record<string, string>;

export default function AdminContentPage() {
  const [content, setContent] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function fetchContent() {
    const supabase = getSupabaseBrowser();
    const { data, error } = await supabase.from('site_content').select('id, value');
    if (error) {
      console.error(error);
      setContent({});
    } else {
      const map: ContentMap = {};
      (data ?? []).forEach((row: { id: string; value: string }) => {
        map[row.id] = row.value ?? '';
      });
      setContent(map);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchContent();
  }, []);

  function updateKey(key: string, value: string) {
    setContent((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    const supabase = getSupabaseBrowser();
    const keys = Object.keys(content);
    for (const key of keys) {
      const { error } = await supabase
        .from('site_content')
        .upsert({ id: key, value: content[key] ?? '' }, { onConflict: 'id' });
      if (error) console.error(error);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) {
    return (
      <AdminShell>
        <p className="text-stone-500 text-sm">Memuatkan...</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-stone-100">Site Content</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-herb-gold/20 border border-herb-gold/50 px-4 py-2 text-sm text-herb-gold hover:bg-herb-gold/30 disabled:opacity-50"
        >
          {saving ? 'Menyimpan...' : saved ? 'Disimpan!' : 'Simpan Semua'}
        </button>
      </div>

      <div className="space-y-8">
        {Object.entries(CONTENT_GROUPS).map(([category, keys]) => (
          <section
            key={category}
            className="rounded-xl border border-stone-700 bg-herb-surface/60 p-6"
          >
            <h2 className="font-serif text-lg font-bold text-herb-gold mb-4">{category}</h2>
            <div className="space-y-4">
              {keys.map((key) => {
                const isLong = key.includes('desc') || key.includes('quote') || key.includes('stats') || key.includes('items');
                return (
                  <div key={key}>
                    <label className="block text-sm text-stone-400 mb-1">{key}</label>
                    {isLong ? (
                      <textarea
                        value={content[key] ?? ''}
                        onChange={(e) => updateKey(key, e.target.value)}
                        rows={key === 'counter_stats' ? 6 : 3}
                        className="w-full rounded-xl border border-stone-700 bg-herb-surface px-3 py-2 text-stone-100 placeholder-stone-500 focus:border-herb-gold/50 focus:outline-none font-mono text-sm"
                        placeholder={key === 'marquee_items' ? 'Halal JAKIM|KKM Diluluskan|... (pisah dengan |)' : key === 'counter_stats' ? 'JSON: {"stats":[{"value":20,"suffix":"+","label":"Tahun di Pasaran"},...]}' : ''}
                      />
                    ) : (
                      <input
                        type="text"
                        value={content[key] ?? ''}
                        onChange={(e) => updateKey(key, e.target.value)}
                        className="w-full rounded-xl border border-stone-700 bg-herb-surface px-3 py-2 text-stone-100 placeholder-stone-500 focus:border-herb-gold/50 focus:outline-none"
                        placeholder={`Enter ${key}...`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </AdminShell>
  );
}
