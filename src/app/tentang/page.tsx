import Link from 'next/link';

export const metadata = {
  title: 'Tentang — Dunia Herbs',
  description: 'Cerita 20 tahun Dunia Herbs — perintis lotion pati halia di Malaysia.',
};

const milestones = [
  { year: '2004', title: 'Pelancaran', desc: 'Lotion Mustajab Pati Halia dilancarkan. Produk perintis lotion halia pertama di Malaysia.' },
  { year: '2006', title: 'Pengembangan', desc: 'Variasi baru diperkenalkan — Lime & Ginger dan Super Hot dengan capsicum.' },
  { year: '2010', title: 'Pengiktirafan', desc: 'Halal JAKIM dan kelulusan KKM diperoleh. Mula membina rangkaian stockist.' },
  { year: '2014', title: 'Eksport Antarabangsa', desc: 'Produk memasuki pasaran Arab Saudi — langkah pertama ke peringkat antarabangsa.' },
  { year: '2018', title: '30+ Stockist', desc: 'Rangkaian stockist berkembang ke lebih 30 lokasi di Malaysia dan Singapura.' },
  { year: '2024', title: '20 Tahun Legenda', desc: '40+ stockist, 8 variasi produk, dipercayai generasi di seluruh Asia Tenggara.' },
];

export default function TentangPage() {
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

      {/* Hero */}
      <p className="text-herb-gold/80 text-sm tracking-widest uppercase mb-2">Sejak 2004</p>
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-stone-50 mb-4">Cerita Dunia Herbs</h1>
      <p className="text-stone-400 leading-relaxed max-w-2xl">
        Bermula dari kegigihan seorang usahawan Malaysia, Dunia Herbs diasaskan dengan satu matlamat — 
        menghasilkan produk herba semula jadi yang benar-benar berkesan. Lebih 20 tahun kemudian, 
        Lotion Mustajab Pati Halia telah menjadi legenda di pasaran Malaysia.
      </p>

      {/* Founder */}
      <div className="mt-12 rounded-2xl border border-herb-gold/20 bg-herb-surface/60 p-8 backdrop-blur-md">
        <p className="text-herb-gold/60 text-4xl font-serif leading-none mb-4">"</p>
        <p className="text-stone-300 italic leading-relaxed text-lg">
          Saya mulakan Dunia Herbs selepas lebih 20 tahun mencuba pelbagai bisnes. 
          Apa yang bermula dari kegagalan, menjadi kekuatan. Setiap botol Lotion Mustajab 
          mengandungi semangat untuk membantu orang lain.
        </p>
        <p className="mt-4 text-herb-gold font-medium">Rushdi Abdullah</p>
        <p className="text-stone-500 text-sm">Pengasas, Dunia Herbs</p>
      </div>

      {/* Values */}
      <div className="mt-12 grid sm:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-stone-700/50 bg-herb-surface/60 p-6 backdrop-blur-md">
          <span className="text-herb-gold text-2xl">✦</span>
          <h3 className="font-semibold text-stone-100 mt-3">Semula Jadi</h3>
          <p className="text-stone-500 text-sm mt-1">100% bahan semula jadi. Pati halia tulen tanpa bahan kimia berbahaya.</p>
        </div>
        <div className="rounded-2xl border border-stone-700/50 bg-herb-surface/60 p-6 backdrop-blur-md">
          <span className="text-herb-gold text-2xl">✦</span>
          <h3 className="font-semibold text-stone-100 mt-3">Halal & Selamat</h3>
          <p className="text-stone-500 text-sm mt-1">Diluluskan JAKIM dan KKM. Selamat untuk seluruh keluarga.</p>
        </div>
        <div className="rounded-2xl border border-stone-700/50 bg-herb-surface/60 p-6 backdrop-blur-md">
          <span className="text-herb-gold text-2xl">✦</span>
          <h3 className="font-semibold text-stone-100 mt-3">Terbukti Berkesan</h3>
          <p className="text-stone-500 text-sm mt-1">20 tahun di pasaran. Dipercayai lebih 100,000 pelanggan setia.</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-16">
        <p className="text-herb-gold/80 text-sm tracking-widest uppercase mb-2">Perjalanan Kami</p>
        <h2 className="font-serif text-2xl font-bold text-stone-50 mb-8">20 Tahun Sejarah</h2>
        <div className="space-y-6">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-6">
              <div className="flex-shrink-0 w-16 text-center">
                <span className="font-serif text-xl font-bold text-herb-gold">{m.year}</span>
              </div>
              <div className="flex-1 rounded-2xl border border-herb-gold/15 bg-herb-surface/50 p-5 backdrop-blur-sm">
                <h3 className="font-semibold text-stone-100">{m.title}</h3>
                <p className="text-stone-500 text-sm mt-1">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
