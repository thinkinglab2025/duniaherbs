'use client';

import { useEffect, useState } from 'react';
import AdminShell from '@/components/admin/AdminShell';

type User = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function fetchUsers() {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    setUsers(data.users ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    setSubmitting(false);
    if (data.error) {
      setError(data.error);
      return;
    }
    setModalOpen(false);
    setEmail('');
    setPassword('');
    fetchUsers();
  }

  async function handleDelete(user: User) {
    if (!confirm(`Padam user ${user.email}?`)) return;
    await fetch('/api/admin/users', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id }),
    });
    fetchUsers();
  }

  function formatDate(d: string | null) {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('ms-MY', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-stone-100">Users</h1>
          <button
            onClick={() => { setModalOpen(true); setError(''); }}
            className="rounded-xl border border-stone-700 bg-herb-surface px-4 py-2 text-sm font-medium text-herb-gold hover:border-herb-gold/50 transition"
          >
            Tambah User
          </button>
        </div>

        {loading ? (
          <p className="text-stone-500 text-sm">Memuatkan...</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-stone-700/50">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-700/50 bg-herb-surface/80">
                  <th className="px-4 py-3 text-left text-stone-400 font-medium">Email</th>
                  <th className="px-4 py-3 text-left text-stone-400 font-medium">Dicipta</th>
                  <th className="px-4 py-3 text-left text-stone-400 font-medium">Login Terakhir</th>
                  <th className="px-4 py-3 text-right text-stone-400 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="border-b border-stone-800/50 last:border-0">
                    <td className="px-4 py-3 text-stone-100">{u.email}</td>
                    <td className="px-4 py-3 text-stone-400">{formatDate(u.created_at)}</td>
                    <td className="px-4 py-3 text-stone-400">{formatDate(u.last_sign_in_at)}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleDelete(u)}
                        className="text-red-400 text-xs hover:underline"
                      >
                        Padam
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-stone-500">
                      Tiada user
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-xl border border-stone-700 bg-herb-surface p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-serif text-xl font-bold text-stone-100 mb-4">Tambah User</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm text-stone-400 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-stone-700 bg-herb-surface px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-herb-gold focus:outline-none"
                  placeholder="staf@duniaherbs.com.my"
                />
              </div>
              <div>
                <label className="block text-sm text-stone-400 mb-1">Kata Laluan</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-stone-700 bg-herb-surface px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-herb-gold focus:outline-none"
                  placeholder="Minimum 6 aksara"
                />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-stone-700 px-4 py-2 text-sm text-stone-400 hover:text-stone-200 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-herb-gold/20 border border-herb-gold/50 px-4 py-2 text-sm font-medium text-herb-gold hover:bg-herb-gold/30 transition disabled:opacity-50"
                >
                  {submitting ? 'Menambah...' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
