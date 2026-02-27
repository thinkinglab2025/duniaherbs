# Chatbot customer service (AI)

Chatbot guna **Vercel AI SDK** + **OpenAI** (gpt-4o-mini). AI faham produk dan dasar DuniaHerb melalui konteks dalam system prompt.

## Setup

1. Dapatkan API key dari [OpenAI](https://platform.openai.com/api-keys).
2. Dalam folder projek, copy `.env.example` ke `.env` dan isi:
   ```
   OPENAI_API_KEY=sk-...
   ```
3. Jalankan `npm install` kemudian `npm run dev`. Buka laman, klik butang chat di penjuru kanan bawah.

## Konteks produk

Fail **`src/lib/product-context.ts`** mengandungi:
- Kategori (Beauty, Health)
- Contoh produk (boleh kemas kini ikut katalog sebenar)
- Dasar penghantaran & bayaran

Kemas kini teks dalam `PRODUCT_CONTEXT` atau `CHATBOT_SYSTEM_PROMPT` supaya AI jawab ikut maklumat terkini. Lepas ada DB produk, boleh bina konteks dari DB dalam API route dan pass ke `system`.

## Fail berkaitan

- `src/app/api/chat/route.ts` — POST endpoint, stream jawapan
- `src/components/ChatBot.tsx` — UI: butang floating + panel chat
- `src/lib/product-context.ts` — konteks produk & system prompt

## Kos

OpenAI gpt-4o-mini dikenakan ikut token (input + output). Anggaran rendah untuk traffic sederhana; monitor usage dalam dashboard OpenAI.
