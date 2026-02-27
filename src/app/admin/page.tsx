'use client';

import AdminShell from '@/components/admin/AdminShell';
import Link from 'next/link';

const sections = [
  { label: 'Produk', href: '/admin/produk', desc: 'Tambah, edit, padam produk' },
  { label: 'FAQ', href: '/admin/faq', desc: 'Soalan lazim' },
  { label: 'Testimonial', href: '/admin/testimonial', desc: 'Kata pelanggan' },
  { label: 'Stockist', href: '/admin/stockist', desc: 'Senarai stockist & pengedar' },
  { label: 'Content', href: '/admin/content', desc: 'Teks hero, about, socmed links' },
  { label: 'Media', href: '/admin/media', desc: 'Upload gambar & video' },
];

export default function AdminDashboard() {
  return (
    <AdminShell>
      <h1 className="font-serif text-2xl font-bold text-stone-50 mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-2xl border border-stone-700/50 bg-herb-surface/60 p-6 transition hover:border-herb-gold/30"
          >
            <h2 className="font-semibold text-stone-100">{s.label}</h2>
            <p className="text-stone-500 text-sm mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
