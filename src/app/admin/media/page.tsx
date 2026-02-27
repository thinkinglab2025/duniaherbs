'use client';

import AdminShell from '@/components/admin/AdminShell';
import { getSupabaseBrowser } from '@/lib/supabase-browser';
import { useEffect, useState } from 'react';

type MediaFile = {
  name: string;
  path: string;
  publicUrl: string;
};

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  async function fetchFiles() {
    const supabase = getSupabaseBrowser();
    const { data, error } = await supabase.storage.from('media').list('', { limit: 500 });
    if (error) {
      console.error(error);
      setFiles([]);
    } else {
      const items: MediaFile[] = (data ?? [])
        .filter((f) => f.name && !f.name.startsWith('.'))
        .map((f) => {
          const path = f.name;
          const { data: urlData } = supabase.storage.from('media').getPublicUrl(path);
          return { name: f.name, path, publicUrl: urlData.publicUrl };
        });
      setFiles(items);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target;
    const selected = input.files;
    if (!selected?.length) return;
    setUploading(true);
    const supabase = getSupabaseBrowser();
    for (let i = 0; i < selected.length; i++) {
      const file = selected[i];
      const ext = file.name.split('.').pop() ?? 'bin';
      const safeName = `${Date.now()}-${i}.${ext}`;
      const { error } = await supabase.storage.from('media').upload(safeName, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) console.error(error);
    }
    setUploading(false);
    input.value = '';
    fetchFiles();
  }

  async function handleDelete(path: string) {
    if (!confirm('Padam fail ini?')) return;
    const supabase = getSupabaseBrowser();
    const { error } = await supabase.storage.from('media').remove([path]);
    if (error) console.error(error);
    fetchFiles();
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 1500);
  }

  const isImage = (name: string) =>
    /\.(jpg|jpeg|png|gif|webp|avif|svg)$/i.test(name);
  const isVideo = (name: string) =>
    /\.(mp4|webm|mov|avi|mkv)$/i.test(name);

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-stone-100">Media</h1>
        <label className="rounded-xl border border-stone-700 bg-herb-surface px-4 py-2 text-sm text-herb-gold hover:border-herb-gold/50 transition cursor-pointer">
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
          {uploading ? 'Memuat naik...' : '+ Muat Naik Gambar/Video'}
        </label>
      </div>

      {loading ? (
        <p className="text-stone-500 text-sm">Memuatkan...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((f) => (
            <div
              key={f.path}
              className="rounded-xl border border-stone-700 bg-herb-surface/60 overflow-hidden group"
            >
              <div className="aspect-square bg-stone-800/50 flex items-center justify-center relative">
                {isImage(f.name) ? (
                  <img
                    src={f.publicUrl}
                    alt={f.name}
                    className="w-full h-full object-cover"
                  />
                ) : isVideo(f.name) ? (
                  <video
                    src={f.publicUrl}
                    className="max-w-full max-h-full object-contain"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <span className="text-stone-500 text-xs">Preview</span>
                )}
              </div>
              <div className="p-3">
                <p className="text-stone-400 text-xs truncate mb-2" title={f.name}>
                  {f.name}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyUrl(f.publicUrl)}
                    className="flex-1 rounded-lg border border-stone-700 px-2 py-1 text-xs text-herb-gold hover:border-herb-gold/50"
                  >
                    {copied === f.publicUrl ? 'Disalin!' : 'Copy URL'}
                  </button>
                  <button
                    onClick={() => handleDelete(f.path)}
                    className="rounded-lg border border-stone-700 px-2 py-1 text-xs text-red-400 hover:border-red-500/50"
                  >
                    Padam
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && files.length === 0 && (
        <p className="text-stone-500 text-sm py-8 text-center">Tiada media. Muat naik fail untuk bermula.</p>
      )}
    </AdminShell>
  );
}
