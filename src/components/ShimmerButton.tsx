'use client';

import { type ReactNode } from 'react';

type ShimmerButtonProps = {
  children: ReactNode;
  href: string;
  external?: boolean;
  className?: string;
};

export function ShimmerButton({ children, href, external, className = '' }: ShimmerButtonProps) {
  const Tag = external ? 'a' : 'a';
  return (
    <Tag
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold transition ${className}`}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-herb-gold via-herb-goldLight to-herb-gold" />
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-herb-goldLight via-herb-gold to-herb-goldLight" />
      {/* shimmer sweep */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <span className="relative text-herb-dark">{children}</span>
    </Tag>
  );
}
