'use client';

import { useState, useEffect } from 'react';
import AdminShell from '@/components/admin/AdminShell';
import AdminTable from '@/components/admin/AdminTable';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

type Product = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  badge?: string;
  heat?: string;
  size: string;
  description: string;
  benefits: string[];
  usage_info: string;
  image_url: string;
  sort_order: number;
  visible: boolean;
};

const HEAT_OPTIONS = ['Mild', 'Hot', 'Extreme'];

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  tagline: '',
  price: '',
  badge: '',
  heat: 'Mild',
  size: '130ml',
  description: '',
  benefits: [],
  usage_info: '',
  image_url: '',
  sort_order: 0,
  visible: true,
};

export default function AdminProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyProduct);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    const supabase = getSupabaseBrowser();
    const { data, error: err } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    setProducts((data as Product[]) ?? []);
  }

  function openAdd() {
    setEditing(null);
    setForm(emptyProduct);
    setError('');
    setModalOpen(true);
  }

  function openEdit(row: Product) {
    setEditing(row);
    setForm({
      name: row.name,
      tagline: row.tagline ?? '',
      price: row.price ?? '',
      badge: row.badge ?? '',
      heat: row.heat ?? 'Mild',
      size: row.size ?? '130ml',
      description: row.description ?? '',
      benefits: row.benefits ?? [],
      usage_info: row.usage_info ?? '',
      image_url: row.image_url ?? '',
      sort_order: row.sort_order ?? 0,
      visible: row.visible ?? true,
    });
    setError('');
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditing(null);
    setForm(emptyProduct);
    setError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    const supabase = getSupabaseBrowser();
    const payload = {
      name: form.name,
      tagline: form.tagline,
      price: form.price,
      badge: form.badge || null,
      heat: form.heat,
      size: form.size,
      description: form.description,
      benefits: form.benefits,
      usage_info: form.usage_info,
      image_url: form.image_url || null,
      sort_order: form.sort_order,
      visible: form.visible,
    };

    if (editing) {
      const { error: err } = await supabase.from('products').update(payload).eq('id', editing.id);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    } else {
      const { error: err } = await supabase.from('products').insert(payload);
      if (err) {
        setError(err.message);
        setSaving(false);
        return;
      }
    }
    setSaving(false);
    closeModal();
    fetchProducts();
  }

  async function handleDelete(row: Product) {
    if (!confirm(`Padam "${row.name}"?`)) return;
    const supabase = getSupabaseBrowser();
    const { error: err } = await supabase.from('products').delete().eq('id', row.id);
    if (err) {
      alert(err.message);
      return;
    }
    fetchProducts();
  }

  const benefitsText = form.benefits.join('\n');
  const setBenefitsText = (s: string) =>
    setForm((f) => ({ ...f, benefits: s ? s.split('\n').filter(Boolean) : [] }));

  const inputClass =
    'w-full rounded-xl border border-stone-700 bg-herb-surface px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-herb-gold focus:outline-none';
  const labelClass = 'text-stone-400 text-sm mb-1 block';

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-stone-100">Produk</h1>
        <button
          onClick={openAdd}
          className="rounded-xl bg-herb-gold px-4 py-2.5 text-sm font-semibold text-herb-dark transition hover:bg-herb-goldLight"
        >
          Tambah
        </button>
      </div>

      {loading ? (
        <p className="text-stone-500 text-sm">Memuatkan...</p>
      ) : (
        <AdminTable<Product>
          columns={[
            { key: 'name', label: 'Nama' },
            { key: 'price', label: 'Harga' },
            { key: 'badge', label: 'Badge' },
            { key: 'heat', label: 'Heat' },
            { key: 'size', label: 'Saiz' },
            {
              key: 'visible',
              label: 'Visible',
              render: (row) => (
                <span
                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                    row.visible
                      ? 'bg-herb-gold/20 text-herb-gold'
                      : 'bg-stone-700/50 text-stone-500'
                  }`}
                >
                  {row.visible ? 'Ya' : 'Tidak'}
                </span>
              ),
            },
          ]}
          rows={products}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden
          />
          <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-stone-700 bg-herb-surface shadow-2xl">
            <div className="sticky top-0 border-b border-stone-700 bg-herb-surface/95 px-6 py-4">
              <h2 className="font-serif text-xl font-bold text-herb-gold">
                {editing ? 'Edit Produk' : 'Tambah Produk'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <div>
                <label className={labelClass}>Nama</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Tagline</label>
                <input
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Harga</label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    className={inputClass}
                    placeholder="RM 22.90"
                  />
                </div>
                <div>
                  <label className={labelClass}>Badge</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
                    className={inputClass}
                    placeholder="Bestseller, Popular, dll"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Heat</label>
                  <select
                    value={form.heat}
                    onChange={(e) => setForm((f) => ({ ...f, heat: e.target.value }))}
                    className={inputClass}
                  >
                    {HEAT_OPTIONS.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Saiz</label>
                  <input
                    type="text"
                    value={form.size}
                    onChange={(e) => setForm((f) => ({ ...f, size: e.target.value }))}
                    className={inputClass}
                    placeholder="130ml"
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className={`${inputClass} min-h-[80px]`}
                  rows={3}
                />
              </div>
              <div>
                <label className={labelClass}>Benefits (satu per baris)</label>
                <textarea
                  value={benefitsText}
                  onChange={(e) => setBenefitsText(e.target.value)}
                  className={`${inputClass} min-h-[100px]`}
                  placeholder="Satu benefit per baris"
                  rows={4}
                />
              </div>
              <div>
                <label className={labelClass}>Usage Info</label>
                <textarea
                  value={form.usage_info}
                  onChange={(e) => setForm((f) => ({ ...f, usage_info: e.target.value }))}
                  className={`${inputClass} min-h-[60px]`}
                  rows={2}
                />
              </div>
              <div>
                <label className={labelClass}>Image URL</label>
                <input
                  type="url"
                  value={form.image_url}
                  onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
                  className={inputClass}
                  placeholder="https://..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Sort Order</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, sort_order: parseInt(e.target.value, 10) || 0 }))
                    }
                    className={inputClass}
                    min={0}
                  />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.visible}
                      onChange={(e) => setForm((f) => ({ ...f, visible: e.target.checked }))}
                      className="rounded border-stone-600 bg-herb-surface text-herb-gold focus:ring-herb-gold"
                    />
                    <span className="text-stone-300 text-sm">Visible</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-stone-700">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-herb-gold px-5 py-2.5 text-sm font-semibold text-herb-dark transition hover:bg-herb-goldLight disabled:opacity-50"
                >
                  {saving ? 'Menyimpan...' : editing ? 'Simpan' : 'Tambah'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-stone-600 px-5 py-2.5 text-sm text-stone-300 transition hover:bg-stone-800"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
