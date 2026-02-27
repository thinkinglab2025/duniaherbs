'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

const nav = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Produk', href: '/admin/produk' },
  { label: 'FAQ', href: '/admin/faq' },
  { label: 'Testimonial', href: '/admin/testimonial' },
  { label: 'Stockist', href: '/admin/stockist' },
  { label: 'Content', href: '/admin/content' },
  { label: 'Timeline', href: '/admin/milestones' },
  { label: 'Video', href: '/admin/video' },
  { label: 'Knowledge Base', href: '/admin/knowledge' },
  { label: 'Fasha Landing', href: '/admin/fasha' },
  { label: 'Media', href: '/admin/media' },
  { label: 'Users', href: '/admin/users' },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace('/admin/login');
      } else {
        setReady(true);
      }
    });
  }, [router]);

  async function handleLogout() {
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
    router.replace('/admin/login');
  }

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-stone-500 text-sm">Memuatkan...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-stone-800 bg-herb-surface/50 p-4 flex flex-col">
        <Link href="/" className="font-serif text-herb-gold font-bold text-lg mb-6">
          DuniaHerbs
        </Link>
        <nav className="flex-1 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-lg px-3 py-2 text-sm transition ${
                pathname === item.href
                  ? 'bg-herb-gold/10 text-herb-gold font-medium'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-herb-surface'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-4 rounded-lg px-3 py-2 text-sm text-stone-500 hover:text-red-400 transition text-left"
        >
          Log Keluar
        </button>
      </aside>
      {/* Main */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
