import Link from 'next/link';

const faqs = [
  {
    q: 'Adakah produk Dunia Herbs halal?',
    a: 'Ya, semua produk diluluskan Halal oleh JAKIM dan KKM.',
  },
  {
    q: 'Bagaimana cara menggunakan Lotion Mustajab?',
    a: 'Sapu pada sendi, otot atau abdomen. Untuk luaran sahaja. Jangan guna pada bayi.',
  },
  {
    q: 'Berapa lama masa penghantaran?',
    a: '2–5 hari bekerja (Semenanjung Malaysia). Sabah/Sarawak mungkin lebih lama.',
  },
  {
    q: 'Apakah perbezaan antara Super Hot dan Extra Hot?',
    a: 'Super Hot mengandungi capsicum, sesuai untuk workout. Extra Hot lebih fokus pada shaping dengan extra halia.',
  },
  {
    q: 'Bolehkah ibu mengandung guna?',
    a: 'Sesuai untuk ibu bersalin (postpartum). Sila rujuk doktor jika mengandung.',
  },
  {
    q: 'Bagaimana nak hubungi customer service?',
    a: 'WhatsApp kami atau gunakan ChatBot di laman utama. Kami jawab dalam BM.',
  },
];

export const metadata = {
  title: 'FAQ — Dunia Herbs',
  description: 'Soalan lazim tentang produk Lotion Mustajab dan penghantaran.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-stone-500 text-sm hover:text-herb-sage transition mb-8"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </Link>
      <h1 className="font-serif text-2xl font-bold text-stone-50 mb-2">Soalan lazim</h1>
      <p className="text-stone-500 mb-10">Jawapan untuk soalan biasa tentang produk & penghantaran</p>
      <div className="space-y-6">
        {faqs.map((f, i) => (
          <div
            key={i}
            className="rounded-2xl border border-stone-700/50 bg-herb-surface/80 p-5 backdrop-blur-sm"
          >
            <p className="font-medium text-stone-200">{f.q}</p>
            <p className="text-stone-500 text-sm mt-2">{f.a}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-stone-500 text-sm">
        Masih ada soalan?{' '}
        <a
          href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP || '60123456789').replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-herb-gold hover:underline"
        >
          WhatsApp kami
        </a>
      </p>
    </div>
  );
}
