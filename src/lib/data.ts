import { supabase } from './supabase';

export async function getSiteContent() {
  const { data } = await supabase
    .from('site_content')
    .select('id, value');
  const map: Record<string, string> = {};
  data?.forEach((row) => { map[row.id] = row.value; });
  return map;
}

export async function getFashaLandingContent() {
  const content = await getSiteContent();
  const pickIds = (content.fasha_picks || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  let picks: Awaited<ReturnType<typeof getProducts>> = [];
  if (pickIds.length > 0) {
    const { data } = await supabase
      .from('products')
      .select('*')
      .in('id', pickIds)
      .eq('visible', true);
    const byId = new Map((data ?? []).map((p) => [p.id, p]));
    picks = pickIds.map((id) => byId.get(id)).filter(Boolean) as typeof picks;
  }
  if (picks.length === 0) {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('visible', true)
      .order('sort_order')
      .limit(3);
    picks = data ?? [];
  }
  return {
    visible: content.fasha_visible !== '0',
    heroImage: content.fasha_hero_image || 'https://upload.wikimedia.org/wikipedia/commons/0/04/Fasha_Sandha_on_MeleTOP.jpg',
    heroBadge: content.fasha_hero_badge || 'Duta Rasmi Dunia Herbs',
    heroTitle: content.fasha_hero_title || 'Fasha Sandha',
    heroSubtitle: content.fasha_hero_subtitle || '× Dunia Herbs',
    heroDescription: content.fasha_hero_description || 'Pelakon & selebriti terkenal Malaysia. Fasha sendiri pilih dan percayai Lotion Mustajab — produk pati halia #1 di Malaysia sejak 2004.',
    quote: content.fasha_quote || 'Saya pilih Dunia Herbs sebab produk ni memang proven — 20 tahun di pasaran, halal, dan berkesan. Sesuai untuk urutan berpantang dan rutin harian.',
    ctaTitle: content.fasha_cta_title || 'Ikut Pilihan Fasha',
    ctaSubtitle: content.fasha_cta_subtitle || 'Order sekarang melalui WhatsApp atau platform pilihan anda.',
    picks,
  };
}

export async function getProducts() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('visible', true)
    .order('sort_order');
  return data ?? [];
}

export async function getProduct(id: string) {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  return data;
}

export async function getTestimonials() {
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('visible', true)
    .order('sort_order');
  return data ?? [];
}

export async function getFaqs() {
  const { data } = await supabase
    .from('faqs')
    .select('*')
    .eq('visible', true)
    .order('sort_order');
  return data ?? [];
}

export async function getStockists() {
  const { data } = await supabase
    .from('stockists')
    .select('*')
    .eq('visible', true)
    .order('sort_order');
  return data ?? [];
}

export async function getMilestones() {
  const { data } = await supabase
    .from('milestones')
    .select('*')
    .order('sort_order');
  return data ?? [];
}

export async function getKnowledgeBase() {
  const { data } = await supabase
    .from('knowledge_base')
    .select('category, title, content')
    .eq('visible', true)
    .order('sort_order');
  return data ?? [];
}

export async function getVideos() {
  const { data } = await supabase
    .from('videos')
    .select('*')
    .eq('visible', true)
    .order('sort_order');
  return data ?? [];
}
