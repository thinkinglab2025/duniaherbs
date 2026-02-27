# DuniaHerb PWA

PWA bisnes herbs — kategori **Beauty & Health**. Dark mode, Billplz.

## Setup

```bash
cd /Applications/projects/duniaherb
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Doc

- [Trend & scope + Billplz](docs/TREND_DAN_SCOPE.md)

## PWA

- `public/manifest.json` — nama, theme dark, icons (tambah `icon-192.png` & `icon-512.png` dalam `public/`).
- Service worker / next-pwa boleh ditambah lepas ni untuk offline.

## Payment

Billplz: create bill → redirect user → callback. Sandbox: [billplz-sandbox.com](https://www.billplz-sandbox.com).
