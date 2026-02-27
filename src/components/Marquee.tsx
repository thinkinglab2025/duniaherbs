'use client';

const defaultItems = [
  'Halal JAKIM',
  'KKM Diluluskan',
  '20+ Tahun Legenda',
  '40+ Stockist',
  'Perintis Lotion Halia Malaysia',
  'Eksport ke Arab Saudi',
  'Produk Semula Jadi',
  'Memang Mustajab',
];

export function Marquee({ items }: { items?: string[] }) {
  const list = items?.length ? items : defaultItems;
  return (
    <div className="relative overflow-hidden py-4 border-y border-blue-950/30 bg-herb-surface/30">
      <div className="marquee-track flex w-max gap-12">
        {[...list, ...list].map((text, i) => (
          <span
            key={i}
            className="flex items-center gap-3 text-stone-400 text-sm whitespace-nowrap"
          >
            <span className="text-herb-gold text-xs">✦</span>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
