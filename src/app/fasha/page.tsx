import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AnimateIn, AnimateStagger, AnimateStaggerItem } from '@/components/AnimateIn';
import { VideoShowcase } from '@/components/VideoShowcase';
import { getFashaLandingContent } from '@/lib/data';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || '60123456789';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`;

const PRODUCT_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop';

export const metadata = {
  title: 'Fasha Sandha × Dunia Herbs — Duta Rasmi',
  description: 'Fasha Sandha pilih Dunia Herbs. Produk lotion pati halia #1 di Malaysia. Halal JAKIM & KKM.',
  openGraph: {
    title: 'Fasha Sandha × Dunia Herbs',
    description: 'Fasha Sandha pilih Dunia Herbs. Produk lotion pati halia #1 di Malaysia.',
  },
};

export default async function FashaLandingPage() {
  const data = await getFashaLandingContent();

  if (!data.visible) {
    redirect('/');
  }

  const [titleFirst, titleLast] = (data.heroTitle || 'Fasha Sandha').split(/\s+(.+)$/) as [string, string?];

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      {/* Glamour background */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#0a0812]" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-amber-950/15 via-transparent to-rose-950/10" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_0%,rgba(212,168,83,0.08),transparent_50%)]" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_60%_80%_at_90%_90%,rgba(190,120,140,0.06),transparent_40%)]" />

      <header className="relative z-10 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <Link
          href="/"
          className="font-serif text-amber-200/90 font-bold text-lg tracking-[0.15em] hover:text-amber-100 transition"
        >
          DUNIA HERBS
        </Link>
        <span className="text-[10px] uppercase tracking-[0.4em] text-amber-500/70">Duta Rasmi</span>
      </header>

      <section className="relative z-10 px-6 pt-4 pb-24 md:pt-12 md:pb-32 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <AnimateIn delay={0} className="order-2 lg:order-1">
            <p className="text-amber-400/90 text-[11px] font-medium tracking-[0.3em] uppercase mb-6">
              {data.heroBadge}
            </p>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-stone-50 leading-[1.05]">
              {titleFirst}
              {titleLast && (
                <>
                  <br />
                  <span className="text-amber-300/90">{titleLast}</span>
                </>
              )}
            </h1>
            <p className="mt-4 font-serif text-2xl md:text-3xl text-amber-400/80 italic tracking-wide">
              {data.heroSubtitle}
            </p>
            <p className="mt-8 text-stone-400 text-lg max-w-md leading-relaxed">
              {data.heroDescription}
            </p>
            <div className="mt-12 flex flex-wrap gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-amber-500/90 px-8 py-4 text-sm font-semibold text-stone-900 transition hover:bg-amber-400"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Order Sekarang
              </a>
              <Link
                href="#fasha-pick"
                className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 px-8 py-4 text-sm font-medium text-amber-300/90 transition hover:border-amber-400/60 hover:bg-amber-500/5"
              >
                Lihat Pilihan Fasha
              </Link>
            </div>
          </AnimateIn>
          <AnimateIn delay={0.15} direction="right" className="order-1 lg:order-2">
            <div className="relative aspect-[3/4] max-w-lg mx-auto">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-500/20 via-rose-500/10 to-transparent blur-3xl" />
              <div className="relative h-full rounded-[1.5rem] overflow-hidden border border-amber-500/20 shadow-2xl shadow-black/50">
                <Image
                  src={data.heroImage}
                  alt={`${data.heroTitle} — Duta Rasmi Dunia Herbs`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0812]/90 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <span className="rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 px-5 py-2 text-sm font-medium text-amber-200 tracking-widest uppercase">
                    Duta Rasmi
                  </span>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <div className="relative z-10 flex justify-center py-12">
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        <span className="absolute text-amber-500/50 text-2xl">✦</span>
      </div>

      <section id="fasha-pick" className="relative z-10 px-6 py-20 md:py-28 max-w-6xl mx-auto">
        <AnimateIn>
          <p className="text-amber-400/80 text-[11px] tracking-[0.25em] uppercase mb-3">Pilihan Eksklusif</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-50 mb-3">Fasha&apos;s Pick</h2>
          <p className="text-stone-400 max-w-xl">
            Produk yang Fasha Sandha pilih dan guna — dari urutan berpantang hingga rutin harian.
          </p>
        </AnimateIn>
        <AnimateStagger className="grid sm:grid-cols-3 gap-8 mt-16">
          {data.picks.map((p) => (
            <AnimateStaggerItem key={p.id}>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-amber-500/15 bg-stone-950/60 p-6 backdrop-blur-sm transition hover:border-amber-500/40 hover:bg-stone-950/80"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-stone-900 mb-5">
                  <Image
                    src={p.image_url || PRODUCT_IMAGE_FALLBACK}
                    alt={p.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-amber-400/80">{p.heat || 'Mild'}</span>
                <h3 className="font-semibold text-stone-100 mt-2 group-hover:text-amber-200 transition">{p.name}</h3>
                <p className="text-sm text-stone-500 mt-1">{p.tagline}</p>
                <p className="mt-4 font-semibold text-amber-400">{p.price}</p>
                <span className="inline-block mt-3 text-xs text-amber-500/70 group-hover:text-amber-400 transition">
                  Order via WhatsApp →
                </span>
              </a>
            </AnimateStaggerItem>
          ))}
        </AnimateStagger>
      </section>

      <section className="relative z-10 px-6 py-20 md:py-28 max-w-6xl mx-auto">
        <AnimateIn>
          <p className="text-amber-400/80 text-[11px] tracking-[0.25em] uppercase mb-3">Tonton</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-50 mb-3">Fasha × Dunia Herbs</h2>
          <p className="text-stone-400 mb-12">Video eksklusif daripada duta rasmi kami</p>
        </AnimateIn>
        <VideoShowcase />
      </section>

      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <AnimateIn>
            <span className="block text-7xl text-amber-500/20 font-serif leading-none mb-4">&ldquo;</span>
            <blockquote className="font-serif text-2xl md:text-3xl text-stone-300 leading-relaxed">
              {data.quote}
            </blockquote>
            <p className="mt-8 font-medium text-amber-400 text-lg">— Fasha Sandha</p>
            <p className="text-sm text-stone-500 mt-1">Duta Rasmi Dunia Herbs</p>
          </AnimateIn>
        </div>
      </section>

      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <AnimateIn>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-50 mb-6">
              {data.ctaTitle}
            </h2>
            <p className="text-stone-400 mb-12 text-lg">
              {data.ctaSubtitle}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-amber-500/90 px-8 py-4 text-sm font-semibold text-stone-900 transition hover:bg-amber-400"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a
                href="https://shopee.com.my/search?keyword=dunia%20herbs%20losyen%20mustajab"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-orange-500/50 px-6 py-3.5 text-sm font-semibold text-orange-400 transition hover:border-orange-400 hover:bg-orange-500/10"
              >
                Shopee
              </a>
              <a
                href="https://www.lazada.com.my/tag/dunia-herb-losyen-mustajab/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-blue-500/50 px-6 py-3.5 text-sm font-semibold text-blue-400 transition hover:border-blue-400 hover:bg-blue-500/10"
              >
                Lazada
              </a>
            </div>
            <Link
              href="/"
              className="inline-block mt-12 text-sm text-stone-500 hover:text-amber-400/80 transition"
            >
              ← Kembali ke laman utama
            </Link>
          </AnimateIn>
        </div>
      </section>

      <footer className="relative z-10 border-t border-stone-800/50 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="font-serif text-amber-400/90 font-bold tracking-wide">
            DUNIA HERBS
          </Link>
          <p className="text-stone-600 text-xs">
            © {new Date().getFullYear()} Dunia Herbs. Fasha Sandha × Dunia Herbs.
          </p>
        </div>
      </footer>
    </div>
  );
}
