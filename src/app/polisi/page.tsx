import Link from 'next/link';

export const metadata = {
  title: 'Polisi — Dunia Herbs',
  description: 'Polisi privasi, pemulangan dan syarat penggunaan Dunia Herbs.',
};

export default function PolisiPage() {
  return (
    <div className="min-h-screen px-6 py-12 max-w-3xl mx-auto">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-stone-500 text-sm hover:text-herb-gold transition mb-8"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </Link>

      <h1 className="font-serif text-3xl font-bold text-stone-50 mb-8">Polisi & Syarat</h1>

      <div className="space-y-10">
        {/* Privacy */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-stone-100 mb-4">Polisi Privasi</h2>
          <div className="rounded-2xl border border-stone-700/50 bg-herb-surface/60 p-6 backdrop-blur-md space-y-3 text-stone-400 text-sm leading-relaxed">
            <p>Dunia Herbs menghormati privasi pelanggan kami. Maklumat peribadi yang dikumpul (nama, telefon, alamat) hanya digunakan untuk tujuan penghantaran dan komunikasi berkaitan pesanan.</p>
            <p>Kami tidak akan menjual, menyewa atau berkongsi maklumat peribadi anda kepada pihak ketiga tanpa kebenaran.</p>
            <p>Data pembayaran diproses melalui gateway pembayaran yang selamat dan tidak disimpan oleh kami.</p>
          </div>
        </section>

        {/* Shipping */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-stone-100 mb-4">Polisi Penghantaran</h2>
          <div className="rounded-2xl border border-stone-700/50 bg-herb-surface/60 p-6 backdrop-blur-md space-y-3 text-stone-400 text-sm leading-relaxed">
            <p><strong className="text-stone-300">Semenanjung Malaysia:</strong> 2–5 hari bekerja.</p>
            <p><strong className="text-stone-300">Sabah & Sarawak:</strong> 5–10 hari bekerja.</p>
            <p><strong className="text-stone-300">Singapura:</strong> 3–7 hari bekerja (melalui stockist).</p>
            <p>Kos penghantaran bergantung kepada lokasi dan berat bungkusan. Penghantaran percuma mungkin ditawarkan untuk pesanan melebihi jumlah tertentu.</p>
          </div>
        </section>

        {/* Return */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-stone-100 mb-4">Polisi Pemulangan</h2>
          <div className="rounded-2xl border border-stone-700/50 bg-herb-surface/60 p-6 backdrop-blur-md space-y-3 text-stone-400 text-sm leading-relaxed">
            <p>Pemulangan diterima dalam tempoh <strong className="text-stone-300">7 hari</strong> dari tarikh penerimaan, tertakluk kepada syarat berikut:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Produk belum dibuka dan dalam keadaan asal.</li>
              <li>Bungkusan tidak rosak.</li>
              <li>Resit atau bukti pembelian disertakan.</li>
            </ul>
            <p>Untuk memulakan pemulangan, hubungi kami melalui WhatsApp.</p>
          </div>
        </section>

        {/* Usage */}
        <section>
          <h2 className="font-serif text-xl font-semibold text-stone-100 mb-4">Syarat Penggunaan Produk</h2>
          <div className="rounded-2xl border border-stone-700/50 bg-herb-surface/60 p-6 backdrop-blur-md space-y-3 text-stone-400 text-sm leading-relaxed">
            <p>Semua produk Dunia Herbs adalah untuk <strong className="text-stone-300">kegunaan luaran sahaja</strong>.</p>
            <p>Tidak sesuai untuk bayi dan kanak-kanak kecil.</p>
            <p>Sila rujuk doktor jika anda mengandung atau mempunyai keadaan kulit yang sensitif sebelum menggunakan produk ini.</p>
            <p>Hentikan penggunaan jika berlaku kerengsaan kulit.</p>
          </div>
        </section>
      </div>

      <p className="mt-12 text-center text-stone-600 text-xs">
        Kemas kini terakhir: Januari 2024
      </p>
    </div>
  );
}
