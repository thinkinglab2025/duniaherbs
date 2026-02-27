import Link from 'next/link';

/**
 * Halaman landing untuk iklan FB & socmed.
 * Guna URL ini dalam "Link dalam iklan" supaya senang track:
 *
 * Contoh:
 * - https://duniaherb.com/ad
 * - https://duniaherb.com/ad?utm_source=facebook&utm_medium=cpc&utm_campaign=herbs_jan25
 * - https://duniaherb.com/ad?utm_source=instagram&utm_campaign=beauty
 */
export default function AdLandingPage() {
  return (
    <div className="min-h-screen">
      <header className="relative px-6 py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-herb-surface/50 to-transparent" />
        <div className="relative">
          <h1 className="text-4xl font-bold tracking-tight text-herb-sage md:text-5xl">
            DuniaHerb
          </h1>
          <p className="mt-4 text-stone-400 max-w-md mx-auto">
            Beauty & Health dengan herba semula jadi.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-xl bg-herb-sage px-8 py-3.5 text-sm font-semibold text-herb-dark transition hover:bg-herb-sageDark"
          >
            Lihat produk
          </Link>
        </div>
      </header>

      <section className="px-6 py-12 max-w-2xl mx-auto text-center">
        <p className="text-stone-500 text-xs">
          Terima kasih kerana melawat. Anda akan diarah ke laman utama.
        </p>
      </section>
    </div>
  );
}
