'use client';

import AdminShell from '@/components/admin/AdminShell';
import AdminTable from '@/components/admin/AdminTable';
import { getSupabaseBrowser } from '@/lib/supabase-browser';
import { useEffect, useState } from 'react';

type Video = {
  id: string;
  title: string;
  label: string;
  video_url: string;
  visible: boolean;
  sort_order: number;
  created_at?: string;
};

const emptyForm = {
  title: '',
  label: 'Duta Dunia Herbs',
  video_url: '',
  visible: true,
  sort_order: 0,
};

export default function AdminVideoPage() {
  const [items, setItems] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Video | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function fetchItems() {
    const supabase = getSupabaseBrowser();
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) {
      console.error(error);
      setItems([]);
    } else {
      setItems(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(row: Video) {
    setEditing(row);
    setForm({
      title: row.title ?? '',
      label: row.label ?? 'Duta Dunia Herbs',
      video_url: row.video_url ?? '',
      visible: row.visible ?? true,
      sort_order: row.sort_order ?? 0,
    });
    setModalOpen(true);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const supabase = getSupabaseBrowser();
    const ext = file.name.split('.').pop();
    const fileName = `videos/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('media').upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) {
      alert('Gagal upload: ' + error.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from('media').getPublicUrl(fileName);
    setForm({ ...form, video_url: urlData.publicUrl });
    setUploading(false);
  }

  async function handleSave() {
    if (!form.video_url) {
      alert('Sila masukkan URL video atau upload video.');
      return;
    }
    setSaving(true);
    const supabase = getSupabaseBrowser();
    if (editing) {
      const { error } = await supabase
        .from('videos')
        .update(form)
        .eq('id', editing.id);
      if (error) console.error(error);
    } else {
      const { error } = await supabase.from('videos').insert(form);
      if (error) console.error(error);
    }
    setSaving(false);
    setModalOpen(false);
    fetchItems();
  }

  async function handleDelete(row: Video) {
    if (!confirm('Padam video ini?')) return;
    const supabase = getSupabaseBrowser();
    const { error } = await supabase.from('videos').delete().eq('id', row.id);
    if (error) console.error(error);
    fetchItems();
  }

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-stone-100">Video Duta</h1>
        <button
          onClick={openAdd}
          className="rounded-xl border border-stone-700 bg-herb-surface px-4 py-2 text-sm text-herb-gold hover:border-herb-gold/50 transition"
        >
          + Tambah Video
        </button>
      </div>

      {loading ? (
        <p className="text-stone-500 text-sm">Memuatkan...</p>
      ) : (
        <AdminTable<Video>
          columns={[
            { key: 'title', label: 'Tajuk' },
            { key: 'label', label: 'Label' },
            {
              key: 'video_url',
              label: 'Video',
              render: (r) => (
                <a href={r.video_url} target="_blank" rel="noopener noreferrer" className="text-herb-gold hover:underline text-xs truncate max-w-[200px] block">
                  {r.video_url.length > 40 ? r.video_url.slice(0, 40) + '...' : r.video_url}
                </a>
              ),
            },
            { key: 'visible', label: 'Visible', render: (r) => (r.visible ? 'Ya' : 'Tidak') },
            { key: 'sort_order', label: 'Urutan' },
          ]}
          rows={items}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={() => setModalOpen(false)}>
          <div
            className="w-full max-w-lg rounded-xl border border-stone-700 bg-herb-surface p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-lg font-bold text-stone-100 mb-4">
              {editing ? 'Edit Video' : 'Tambah Video'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-stone-400 mb-1">Tajuk</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="cth: Duta 1"
                  className="w-full rounded-xl border border-stone-700 bg-herb-surface px-3 py-2 text-stone-100 placeholder-stone-500 focus:border-herb-gold/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-stone-400 mb-1">Label (ditunjukkan di website)</label>
                <input
                  type="text"
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className="w-full rounded-xl border border-stone-700 bg-herb-surface px-3 py-2 text-stone-100 placeholder-stone-500 focus:border-herb-gold/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-stone-400 mb-1">Video URL</label>
                <input
                  type="text"
                  value={form.video_url}
                  onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                  placeholder="https://... atau /namafile.mp4"
                  className="w-full rounded-xl border border-stone-700 bg-herb-surface px-3 py-2 text-stone-100 placeholder-stone-500 focus:border-herb-gold/50 focus:outline-none"
                />
                <p className="text-stone-600 text-xs mt-1">Atau upload video terus:</p>
                <label className="mt-2 inline-flex items-center gap-2 cursor-pointer rounded-xl border border-stone-700 bg-herb-card px-4 py-2 text-sm text-stone-400 hover:border-herb-gold/50 hover:text-herb-gold transition">
                  {uploading ? 'Memuat naik...' : 'Upload Video'}
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
              {form.video_url && (
                <div>
                  <label className="block text-sm text-stone-400 mb-1">Preview</label>
                  <video src={form.video_url} className="w-full max-h-40 rounded-lg object-cover" muted playsInline />
                </div>
              )}
              <div>
                <label className="block text-sm text-stone-400 mb-1">Sort Order</label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value, 10) || 0 })}
                  className="w-full rounded-xl border border-stone-700 bg-herb-surface px-3 py-2 text-stone-100 focus:border-herb-gold/50 focus:outline-none"
                />
              </div>
              <label className="flex items-center gap-2 text-stone-400">
                <input
                  type="checkbox"
                  checked={form.visible}
                  onChange={(e) => setForm({ ...form, visible: e.target.checked })}
                  className="rounded border-stone-600 text-herb-gold focus:ring-herb-gold"
                />
                <span className="text-sm">Visible</span>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl border border-stone-700 px-4 py-2 text-sm text-stone-400 hover:text-stone-200"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-herb-gold/20 border border-herb-gold/50 px-4 py-2 text-sm text-herb-gold hover:bg-herb-gold/30 disabled:opacity-50"
              >
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
