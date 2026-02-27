'use client';

import { usePathname } from 'next/navigation';
import ChatBot from './ChatBot';

/**
 * Tunjukkan ChatBot di semua halaman KECUALI /fasha.
 * Landing page Fasha — experience glamour tanpa gangguan.
 */
export default function ConditionalChatBot() {
  const pathname = usePathname();
  if (pathname?.startsWith('/fasha')) return null;
  return <ChatBot />;
}
