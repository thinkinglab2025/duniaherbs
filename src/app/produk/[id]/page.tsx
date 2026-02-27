import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, getProduct } from '@/lib/products';

const productImages: Record<string, string> = {
  '1': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop',
  '2': 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop',
  '3': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
  '4': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop',
  '5': 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=600&fit=crop',
  '6': 'https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?w=600&h=600&fit=crop',
  '7': 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&h=600&fit=crop',
  '8': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
};

const heatColors: Record<string, string> = {
  Mild: 'bg-herb-sage/20 text-herb-sage',
  Hot: 'bg-orange-500/20 text-orange-400',
  Extreme: 'bg-red-500/20 text-red-400',
};

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || '60123456789';

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  if (!product) return { title: 'Produk tidak dijumpai' };
  return {
    title: `${product.name} — Dunia Herbs`,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  if (!product) notFound();

  const waLink = `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${encodeURIComponent(`Saya berminat dengan ${product.name}`)}`;
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <Link
        href="/#produk"
        className="inline-flex items-center gap-2 text-stone-500 text-sm hover:text-herb-gold transition mb-8"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Semua Produk
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden border border-herb-gold/20 bg-herb-surface/60 backdrop-blur-md">
          <Image
            src={productImages[product.id] || productImages['1']}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {product.badge && (
            <span className="absolute top-4 left-4 rounded-lg bg-herb-gold/90 px-3 py-1.5 text-xs font-medium text-herb-dark">
              {product.badge}
            </span>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            {product.heat && (
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${heatColors[product.heat] || ''}`}>
                {product.heat}
              </span>
            )}
            <span className="text-stone-500 text-sm">{product.size}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-stone-50">{product.name}</h1>
          <p className="text-herb-gold text-2xl font-semibold mt-3">{product.price}</p>
          <p className="text-stone-400 leading-relaxed mt-6">{product.description}</p>

          {/* Benefits */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-herb-gold/80 tracking-widest uppercase mb-3">Kebaikan</h3>
            <ul className="space-y-2">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-300 text-sm">
                  <span className="text-herb-gold mt-0.5">✦</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Usage */}
          <div className="mt-8 rounded-2xl border border-stone-700/50 bg-herb-surface/60 p-5 backdrop-blur-md">
            <h3 className="text-sm font-medium text-stone-200 mb-2">Cara guna</h3>
            <p className="text-stone-500 text-sm">{product.usage}</p>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-green-700"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Beli via WhatsApp
            </a>
          </div>

          {/* Trust */}
          <div className="mt-6 flex flex-wrap gap-4 text-stone-500 text-xs">
            <span className="flex items-center gap-1"><span className="text-herb-gold">✦</span> Halal JAKIM</span>
            <span className="flex items-center gap-1"><span className="text-herb-gold">✦</span> KKM</span>
            <span className="flex items-center gap-1"><span className="text-herb-gold">✦</span> Luaran sahaja</span>
          </div>
        </div>
      </div>

      {/* Related products */}
      <div className="mt-20">
        <h2 className="font-serif text-xl font-bold text-stone-50 mb-6">Produk Lain</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((p) => (
            <Link key={p.id} href={`/produk/${p.id}`} className="group rounded-2xl border border-stone-700/50 bg-herb-surface/60 overflow-hidden backdrop-blur-md transition hover:border-herb-gold/30">
              <div className="relative aspect-square bg-herb-card overflow-hidden">
                <Image
                  src={productImages[p.id] || productImages['1']}
                  alt={p.name}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="25vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-stone-100 text-sm">{p.name}</h3>
                <p className="text-herb-gold text-sm mt-1">{p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
