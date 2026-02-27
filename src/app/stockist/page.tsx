import Link from 'next/link';

export const metadata = {
  title: 'Stockist — Dunia Herbs',
  description: 'Senarai stockist dan lokasi untuk membeli produk Dunia Herbs.',
};

const regions = [
  {
    region: 'Semenanjung Malaysia',
    locations: [
      { name: 'R Pharmacy', area: 'Pelbagai cawangan', type: 'Farmasi' },
      { name: 'Alpro Pharmacy', area: 'Pelbagai cawangan', type: 'Farmasi' },
      { name: 'Kaisar Pharmacy', area: 'Pelbagai cawangan', type: 'Farmasi' },
      { name: 'Permata Herba', area: 'Online & kedai', type: 'Herba' },
    ],
  },
  {
    region: 'Sabah & Sarawak',
    locations: [
      { name: 'Stockist tempatan', area: 'Kota Kinabalu', type: 'Runcit' },
      { name: 'Stockist tempatan', area: 'Kuching', type: 'Runcit' },
    ],
  },
  {
    region: 'Singapura',
    locations: [
      { name: 'Al Barakah Health & Beauty Mart', area: 'Online & kedai', type: 'Herba' },
    ],
  },
  {
    region: 'Antarabangsa',
    locations: [
      { name: 'Stockist Arab Saudi', area: 'Sejak 2014', type: 'Eksport' },
    ],
  },
];

const online = [
  { name: 'Lazada Malaysia', url: 'https://www.lazada.com.my', desc: 'Cari "Dunia Herbs Lotion Mustajab"' },
  { name: 'Shopee Malaysia', url: 'https://shopee.com.my', desc: 'Cari "Dunia Herbs Lotion Mustajab"' },
  { name: 'Al Barakah (SG)', url: 'https://shop.barakah.sg/collections/dunia-herbs', desc: 'Penghantaran Singapura' },
];

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || '60123456789';

export default function StockistPage() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-4xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-stone-500 text-sm hover:text-herb-gold transition mb-8"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </Link>

      <p className="text-herb-gold/80 text-sm tracking-widest uppercase mb-2">Di Mana Nak Beli</p>
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-stone-50 mb-4">Stockist & Pengedar</h1>
      <p className="text-stone-400 mb-10">40+ stockist di seluruh Malaysia, Singapura dan antarabangsa</p>

      {/* Physical locations */}
      <div className="space-y-8">
        {regions.map((r, i) => (
          <div key={i}>
            <h2 className="font-serif text-lg font-semibold text-stone-100 mb-4">{r.region}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {r.locations.map((loc, j) => (
                <div
                  key={j}
                  className="rounded-2xl border border-stone-700/50 bg-herb-surface/60 p-5 backdrop-blur-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-stone-100">{loc.name}</h3>
                      <p className="text-stone-500 text-sm mt-0.5">{loc.area}</p>
                    </div>
                    <span className="rounded-full bg-herb-gold/10 px-2.5 py-0.5 text-[10px] font-medium text-herb-gold">
                      {loc.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Online */}
      <div className="mt-12">
        <h2 className="font-serif text-lg font-semibold text-stone-100 mb-4">Beli Online</h2>
        <div className="space-y-4">
          {online.map((o, i) => (
            <a
              key={i}
              href={o.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-2xl border border-stone-700/50 bg-herb-surface/60 p-5 backdrop-blur-md transition hover:border-herb-gold/30"
            >
              <div>
                <h3 className="font-medium text-stone-100">{o.name}</h3>
                <p className="text-stone-500 text-sm mt-0.5">{o.desc}</p>
              </div>
              <svg className="h-5 w-5 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-2xl border border-herb-gold/20 bg-herb-surface/40 p-8 text-center backdrop-blur-md">
        <p className="text-stone-300">Nak jadi stockist atau pengedar?</p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent('Saya berminat untuk jadi stockist Dunia Herbs')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 rounded-xl bg-herb-gold/90 px-6 py-3 text-sm font-semibold text-herb-dark transition hover:bg-herb-gold"
        >
          Hubungi Kami
        </a>
      </div>
    </div>
  );
}
