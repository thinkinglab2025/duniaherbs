# Link untuk iklan FB & socmed

## 1. URL landing iklan

Guna satu URL tetap untuk semua iklan, kemudian bezakan sumber dengan **UTM parameters**:

| Platform   | Contoh URL |
|-----------|------------|
| **Facebook** | `https://duniaherb.com/ad?utm_source=facebook&utm_medium=cpc&utm_campaign=herbs_jan25` |
| **Instagram** | `https://duniaherb.com/ad?utm_source=instagram&utm_medium=social&utm_campaign=beauty` |
| **TikTok**    | `https://duniaherb.com/ad?utm_source=tiktok&utm_medium=paid&utm_campaign=health` |
| **Umum**      | `https://duniaherb.com/ad` |

- **Halaman:** `/ad` — kandungan ringkas + CTA “Lihat produk” → bawa ke homepage.
- Ganti domain `duniaherb.com` dengan domain sebenar anda.

## 2. UTM parameters (pilihan)

Bila buat iklan di Facebook Ads / Meta Business Suite, isi “Website URL” dengan link di atas. Boleh tambah:

| Parameter       | Makna              | Contoh        |
|----------------|--------------------|---------------|
| `utm_source`   | Sumber traffic     | facebook, instagram, tiktok |
| `utm_medium`   | Jenis iklan        | cpc, social, story |
| `utm_campaign` | Nama kempen        | herbs_jan25, raya_promo |
| `utm_content`  | Beza kreatif (optional) | banner_a, video_1 |

Contoh penuh:

```
https://duniaherb.com/ad?utm_source=facebook&utm_medium=cpc&utm_campaign=herbs_jan25&utm_content=video
```

Google Analytics (atau tool analitik lain) akan baca UTM dan tunjuk traffic iklan mengikut sumber/kempen.

## 3. Preview bila share link (FB / WhatsApp / X)

Supaya bila link dikongsi keluar ada **gambar + tajuk + deskripsi**:

- Sediakan gambar **1200×630 px**, simpan sebagai `public/og-image.png`.
- Meta tags Open Graph & Twitter Card sudah disediakan dalam app; pastikan `NEXT_PUBLIC_APP_URL` dalam `.env` sama dengan domain live (contoh: `https://duniaherb.com`).

Uji preview di:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator) (X)

## 4. Ringkasan

- **Link untuk letak dalam iklan FB/socmed:** `https://[domain-anda]/ad` (tambah UTM ikut keperluan).
- **Halaman `/ad`:** sudah wujud; user klik → landing ringkas → “Lihat produk” → homepage.
- **Share link:** pastikan ada `og-image.png` dan `NEXT_PUBLIC_APP_URL` betul supaya preview cantik.
