-- ============================
-- DuniaHerbs Database Schema
-- Run this in Supabase SQL Editor
-- ============================

-- 1. Site content (hero, about, etc.)
CREATE TABLE IF NOT EXISTS site_content (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default content
INSERT INTO site_content (id, value) VALUES
  ('hero_badge', '20 Tahun di Pasaran Malaysia'),
  ('hero_subtitle', 'Dunia Herbs • Trusted Since 2004'),
  ('hero_title', 'Memang Mustajab'),
  ('hero_description', 'Lotion Mustajab Pati Halia — produk #1 herba halia di Malaysia. KKM & Halal JAKIM.'),
  ('hero_image', ''),
  ('video_url', ''),
  ('whatsapp', '60123456789'),
  ('footer_tagline', 'Memang Mustajab • 20 Tahun Legenda • www.duniaherbs.com.my'),
  ('instagram', ''),
  ('tiktok', ''),
  ('facebook', ''),
  ('about_quote', 'Saya mulakan Dunia Herbs selepas lebih 20 tahun mencuba pelbagai bisnes. Apa yang bermula dari kegagalan, menjadi kekuatan. Setiap botol Lotion Mustajab mengandungi semangat untuk membantu orang lain.'),
  ('about_founder', 'Rushdi Abdullah'),
  ('about_description', 'Bermula dari kegigihan seorang usahawan Malaysia, Dunia Herbs diasaskan dengan satu matlamat — menghasilkan produk herba semula jadi yang benar-benar berkesan.'),
  ('fasha_visible', '1'),
  ('fasha_hero_image', 'https://upload.wikimedia.org/wikipedia/commons/0/04/Fasha_Sandha_on_MeleTOP.jpg'),
  ('fasha_hero_badge', 'Duta Rasmi Dunia Herbs'),
  ('fasha_hero_title', 'Fasha Sandha'),
  ('fasha_hero_subtitle', '× Dunia Herbs'),
  ('fasha_hero_description', 'Pelakon & selebriti terkenal Malaysia. Fasha sendiri pilih dan percayai Lotion Mustajab — produk pati halia #1 di Malaysia sejak 2004.'),
  ('fasha_quote', 'Saya pilih Dunia Herbs sebab produk ni memang proven — 20 tahun di pasaran, halal, dan berkesan. Sesuai untuk urutan berpantang dan rutin harian.'),
  ('fasha_cta_title', 'Ikut Pilihan Fasha'),
  ('fasha_cta_subtitle', 'Order sekarang melalui WhatsApp atau platform pilihan anda.'),
  ('fasha_picks', ''),
  ('hero_cta_whatsapp', 'WhatsApp Kami'),
  ('hero_cta_produk', 'Lihat Produk'),
  ('duta_label', 'Duta Rasmi'),
  ('duta_title', 'Fasha Sandha × Dunia Herbs'),
  ('duta_desc', 'Tonton video eksklusif daripada duta rasmi kami — Fasha Sandha'),
  ('duta_link_text', 'Lihat landing page khas Fasha →'),
  ('produk_label', 'Koleksi Unggulan'),
  ('produk_title', 'Produk Mustajab'),
  ('produk_subtitle', 'Lotion pati halia 130ml — luaran sahaja'),
  ('sejarah_label', 'Legasi Kami'),
  ('sejarah_title', 'Sejak 2004'),
  ('testimonial_label', 'Kata Pelanggan'),
  ('testimonial_title', 'Dipercayai Ramai'),
  ('benefits_label', 'Khasiat Semula Jadi'),
  ('benefits_title', 'Kebaikan'),
  ('benefits_subtitle', 'Multi-purpose lotion untuk seluruh keluarga'),
  ('benefit_1_icon', '🩹'),
  ('benefit_1_title', 'Sakit sendi & otot'),
  ('benefit_1_desc', 'Legakan kesakitan dengan pati halia semula jadi'),
  ('benefit_2_icon', '🔥'),
  ('benefit_2_title', 'Bakar lemak'),
  ('benefit_2_desc', 'Bantu proses pembakaran lemak & shaping'),
  ('benefit_3_icon', '🤱'),
  ('benefit_3_title', 'Ibu bersalin'),
  ('benefit_3_desc', 'Sesuai untuk urutan postpartum'),
  ('benefit_4_icon', '✨'),
  ('benefit_4_title', 'Selulit & kedut'),
  ('benefit_4_desc', 'Kurangkan penampilan selulit'),
  ('benefit_5_icon', '🩸'),
  ('benefit_5_title', 'Senggugut'),
  ('benefit_5_desc', 'Legakan kekejangan & kembung perut'),
  ('cs_label', 'Sokongan Pelanggan'),
  ('cs_title', 'Customer Service'),
  ('cs_subtitle', 'Kami sedia membantu — tanya apa sahaja'),
  ('faq_preview_title', 'Soalan lazim'),
  ('faq_link_text', 'Lihat semua FAQ'),
  ('footer_brand_desc', 'Memang Mustajab — Perintis lotion pati halia di Malaysia sejak 2004. KKM & Halal JAKIM.'),
  ('footer_copyright', '© {year} Dunia Herbs. Hak cipta terpelihara.'),
  ('footer_website', 'www.duniaherbs.com.my'),
  ('marquee_items', 'Halal JAKIM|KKM Diluluskan|20+ Tahun Legenda|40+ Stockist|Perintis Lotion Halia Malaysia|Eksport ke Arab Saudi|Produk Semula Jadi|Memang Mustajab'),
  ('counter_stats', '{"stats":[{"value":20,"suffix":"+","label":"Tahun di Pasaran"},{"value":40,"suffix":"+","label":"Stockist Seluruh Dunia"},{"value":100,"suffix":"K+","label":"Pelanggan Setia"},{"value":8,"suffix":"","label":"Variasi Produk"}]}')
ON CONFLICT (id) DO NOTHING;

-- 2. Products
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  badge TEXT DEFAULT '',
  heat TEXT DEFAULT 'Mild',
  size TEXT DEFAULT '130ml',
  description TEXT DEFAULT '',
  benefits TEXT[] DEFAULT '{}',
  usage_info TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default products
INSERT INTO products (name, tagline, price, badge, heat, size, description, benefits, usage_info, sort_order) VALUES
  ('Lotion Mustajab Pati Halia', 'Multi-purpose • Sesuai ibu bersalin', 'RM 22.90', 'Bestseller', 'Mild', '130ml', 'Lotion Mustajab Pati Halia ialah produk perintis Dunia Herbs yang telah menjadi kegemaran ramai selama lebih 20 tahun.', ARRAY['Legakan sakit sendi & otot','Sesuai untuk urutan postpartum','Kurangkan kembung perut','Mudah diserap, tidak berminyak'], 'Sapu pada bahagian yang dikehendaki. Untuk luaran sahaja.', 1),
  ('Lotion Mustajab Lime & Ginger', 'Pati halia + limau nipis', 'RM 22.90', '', 'Mild', '130ml', 'Gabungan pati halia dan limau nipis untuk kesan yang menyegarkan.', ARRAY['Gabungan halia & limau nipis','Segar dan menyegarkan','Legakan sakit sendi & otot'], 'Sapu pada sendi, otot atau abdomen. Untuk luaran sahaja.', 2),
  ('Lotion Mustajab Super Hot', 'Dengan capsicum • Untuk workout', 'RM 24.90', 'Popular', 'Hot', '130ml', 'Diformulasi khas dengan capsicum untuk tahap kehangatan yang lebih tinggi.', ARRAY['Capsicum untuk haba maksimum','Sesuai untuk workout & sukan','Bantu proses pembakaran lemak'], 'Sapu sebelum atau selepas senaman. Untuk luaran sahaja.', 3),
  ('Lotion Mustajab Extra Hot', 'Shaping • Extra halia', 'RM 23.90', '', 'Hot', '130ml', 'Versi extra hot dengan kandungan halia yang lebih pekat.', ARRAY['Extra halia untuk kesan lebih kuat','Fokus shaping & pembakaran lemak','Kurangkan penampilan selulit'], 'Sapu pada abdomen dan kawasan yang ingin dibentuk. Untuk luaran sahaja.', 4),
  ('Lotion Mustajab Extreme Hot', 'Kepanasan maksimum • Untuk sukan lasak', 'RM 25.90', 'Terbaru', 'Extreme', '130ml', 'Tahap kehangatan paling tinggi dalam rangkaian Mustajab.', ARRAY['Kehangatan tahap maksimum','Untuk sukan lasak & atlet','Pembakaran lemak intensif'], 'Sapu pada otot sebelum/selepas sukan lasak. Untuk luaran sahaja.', 5),
  ('Lotion Mustajab Extra Ginger', 'Halia berganda • Kehidupan aktif', 'RM 23.90', '', 'Hot', '130ml', 'Mengandungi halia berganda untuk mereka yang menjalani kehidupan aktif.', ARRAY['Halia berganda untuk kesan lebih','Sesuai untuk kehidupan aktif','Tidak berminyak, mudah diserap'], 'Sapu pada sendi dan otot. Untuk luaran sahaja.', 6),
  ('Lotion Mustajab Pati Halia 250ml', 'Saiz keluarga • Nilai lebih jimat', 'RM 38.90', 'Jimat', 'Mild', '250ml', 'Produk Pati Halia kegemaran dalam saiz keluarga 250ml.', ARRAY['Saiz keluarga 250ml','Nilai lebih jimat','Sesuai untuk seluruh keluarga'], 'Sapu pada sendi, otot atau abdomen. Untuk luaran sahaja.', 7),
  ('Lotion Mustajab Super Hot 250ml', 'Saiz keluarga • Capsicum workout', 'RM 42.90', '', 'Hot', '250ml', 'Versi Super Hot dalam saiz keluarga 250ml.', ARRAY['Saiz keluarga 250ml','Capsicum untuk haba kuat','Jimat untuk pengguna kerap'], 'Sapu sebelum atau selepas senaman. Untuk luaran sahaja.', 8);

-- 3. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT DEFAULT '',
  visible BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO testimonials (quote, author, role, sort_order) VALUES
  ('Produk ni memang berkesan. Saya guna untuk sakit lutut, lega dalam masa singkat.', 'Siti A.', 'Pelanggan sejak 2019', 1),
  ('Lotion Mustajab pilihan keluarga kami. Halal, selamat dan berkesan.', 'Ahmad R.', 'Bapa 3 anak', 2);

-- 4. FAQ
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  visible BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO faqs (question, answer, sort_order) VALUES
  ('Adakah produk Dunia Herbs halal?', 'Ya, semua produk diluluskan Halal oleh JAKIM dan KKM.', 1),
  ('Bagaimana cara menggunakan Lotion Mustajab?', 'Sapu pada sendi, otot atau abdomen. Untuk luaran sahaja. Jangan guna pada bayi.', 2),
  ('Berapa lama masa penghantaran?', '2–5 hari bekerja (Semenanjung Malaysia). Sabah/Sarawak mungkin lebih lama.', 3),
  ('Apakah perbezaan antara Super Hot dan Extra Hot?', 'Super Hot mengandungi capsicum, sesuai untuk workout. Extra Hot lebih fokus pada shaping dengan extra halia.', 4),
  ('Bolehkah ibu mengandung guna?', 'Sesuai untuk ibu bersalin (postpartum). Sila rujuk doktor jika mengandung.', 5),
  ('Bagaimana nak hubungi customer service?', 'WhatsApp kami atau gunakan ChatBot di laman utama. Kami jawab dalam BM.', 6);

-- 5. Stockists
CREATE TABLE IF NOT EXISTS stockists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  area TEXT DEFAULT '',
  type TEXT DEFAULT '',
  region TEXT NOT NULL DEFAULT 'Semenanjung Malaysia',
  url TEXT DEFAULT '',
  visible BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO stockists (name, area, type, region, sort_order) VALUES
  ('R Pharmacy', 'Pelbagai cawangan', 'Farmasi', 'Semenanjung Malaysia', 1),
  ('Alpro Pharmacy', 'Pelbagai cawangan', 'Farmasi', 'Semenanjung Malaysia', 2),
  ('Kaisar Pharmacy', 'Pelbagai cawangan', 'Farmasi', 'Semenanjung Malaysia', 3),
  ('Permata Herba', 'Online & kedai', 'Herba', 'Semenanjung Malaysia', 4),
  ('Al Barakah Health & Beauty Mart', 'Online & kedai', 'Herba', 'Singapura', 5),
  ('Stockist Arab Saudi', 'Sejak 2014', 'Eksport', 'Antarabangsa', 6);

-- 6. Timeline / milestones
CREATE TABLE IF NOT EXISTS milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  year TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO milestones (year, title, description, sort_order) VALUES
  ('2004', 'Pelancaran', 'Lotion Mustajab Pati Halia dilancarkan — perintis lotion halia di Malaysia.', 1),
  ('2014', 'Eksport', 'Produk memasuki pasaran Arab Saudi.', 2),
  ('2024', '20 Tahun', '40+ stockist, dipercayai generasi.', 3);

-- 7. Videos (duta, demo, etc.)
CREATE TABLE IF NOT EXISTS videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL DEFAULT 'Duta Dunia Herbs',
  video_url TEXT NOT NULL,
  visible BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO videos (title, label, video_url, sort_order) VALUES
  ('Duta 1', 'Duta Dunia Herbs', '/IMG_0587.MP4', 1),
  ('Duta 2', 'Duta Dunia Herbs', '/IMG_0596.MP4', 2),
  ('Duta 3', 'Duta Dunia Herbs', '/IMG_0605.MP4', 3),
  ('Duta 4', 'Duta Dunia Herbs', '/IMG_0611.MP4', 4);

-- 8. Knowledge Base (for AI chatbot reference)
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL DEFAULT 'Umum',
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  visible BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO knowledge_base (category, title, content, sort_order) VALUES
  ('Produk', 'Apa itu Lotion Mustajab?', 'Lotion Mustajab ialah produk lotion pati halia pertama di Malaysia, dilancarkan pada 2004. Ia diperbuat daripada pati halia tulen 100% semula jadi. Untuk kegunaan LUARAN sahaja. Diluluskan Halal JAKIM dan KKM.', 1),
  ('Produk', 'Rangkaian Produk', 'Ada 8 variasi: Pati Halia (Mild), Lime & Ginger (Mild), Super Hot (Hot, ada capsicum), Extra Hot (Hot, fokus shaping), Extreme Hot (Extreme, paling panas), Extra Ginger (Hot, halia berganda), Pati Halia 250ml (saiz keluarga), Super Hot 250ml (saiz keluarga).', 2),
  ('Produk', 'Perbezaan Heat Level', 'Mild = hangat lembut, sesuai semua orang termasuk ibu bersalin & warga emas. Hot = lebih panas, sesuai untuk gym & shaping. Extreme = paling panas, untuk atlet & sukan lasak. Sarankan pelanggan baru mulakan dengan Mild dulu.', 3),
  ('Harga', 'Senarai Harga', 'Pati Halia 130ml: RM22.90. Lime & Ginger 130ml: RM22.90. Super Hot 130ml: RM24.90. Extra Hot 130ml: RM23.90. Extreme Hot 130ml: RM25.90. Extra Ginger 130ml: RM23.90. Pati Halia 250ml: RM38.90. Super Hot 250ml: RM42.90.', 4),
  ('Cara Guna', 'Cara Penggunaan', 'Sapu pada bahagian yang dikehendaki — sendi, otot, abdomen, pinggang. Untuk LUARAN sahaja. Jangan sapu pada luka terbuka, mata, atau kawasan sensitif. Jangan guna pada bayi. Basuh tangan selepas guna.', 5),
  ('Cara Guna', 'Tips Penggunaan', 'Untuk urutan berpantang: sapu pada perut, pinggang & badan. Untuk gym: sapu sebelum workout untuk maximakan peluh. Untuk sakit sendi: sapu dan urut perlahan pada kawasan yang sakit. Boleh guna 2-3 kali sehari.', 6),
  ('Keselamatan', 'Kelulusan & Keselamatan', 'Semua produk diluluskan Halal JAKIM dan KKM. 100% bahan semula jadi, pati halia tulen. Tiada bahan kimia berbahaya. Selamat untuk ibu bersalin (postpartum). Ibu mengandung perlu rujuk doktor dulu. Untuk luaran sahaja, BUKAN ubat.', 7),
  ('Penghantaran', 'Info Penghantaran', 'Semenanjung Malaysia: 2-5 hari bekerja. Sabah & Sarawak: 5-10 hari bekerja. Penghantaran ke seluruh Malaysia. Boleh order melalui WhatsApp, Shopee, Lazada, atau TikTok Shop.', 8),
  ('Stockist', 'Senarai Stockist', '40+ stockist seluruh Malaysia. Farmasi: R Pharmacy, Alpro Pharmacy, Kaisar Pharmacy. Eksport ke Arab Saudi sejak 2014 dan Singapura (Al Barakah Health & Beauty Mart). Juga tersedia di Shopee, Lazada, dan TikTok Shop.', 9),
  ('Syarikat', 'Tentang Dunia Herbs', 'Diasaskan pada 2004 oleh Rushdi Abdullah. Perintis lotion pati halia No.1 di Malaysia. 20+ tahun di pasaran. 100,000+ pelanggan setia. Duta rasmi: Fasha Sandha.', 10),
  ('Syarikat', 'Duta Rasmi', 'Fasha Sandha — pelakon & selebriti terkenal Malaysia — adalah duta rasmi Dunia Herbs. Beliau sendiri menggunakan dan mempercayai produk Dunia Herbs.', 11),
  ('FAQ', 'Soalan Lazim', 'Boleh guna untuk apa? Sakit sendi, otot, urutan berpantang, workout, shaping badan. Halal? Ya, JAKIM & KKM. Selamat untuk ibu mengandung? Rujuk doktor dulu, tapi selamat untuk lepas bersalin. Ada side effect? Rasa hangat/panas adalah normal. Jika alahan kulit, hentikan penggunaan.', 12),

  -- Soalan pelik / edge cases yang pelanggan selalu tanya
  ('FAQ', 'Boleh guna untuk anak kecil?', 'TIDAK disarankan untuk bayi dan kanak-kanak kecil. Untuk kanak-kanak bawah 12 tahun, perlu berhati-hati. Kalau nak guna, test sikit dulu di bahagian kecil kulit. Produk Mild paling sesuai. Jangan guna Extreme atau Super Hot untuk kanak-kanak.', 13),
  ('FAQ', 'Boleh guna untuk ibu mengandung?', 'Ibu MENGANDUNG perlu rujuk doktor dulu sebelum guna. Kami tak recommend tanpa nasihat doktor. Tapi untuk ibu LEPAS BERSALIN (postpartum), memang sangat sesuai — ramai ibu guna untuk urutan berpantang.', 14),
  ('FAQ', 'Boleh guna untuk muka?', 'TIDAK. Produk ini untuk BADAN sahaja — sendi, otot, abdomen, pinggang. Jangan sapu pada muka, mata, atau kawasan sensitif. Ini bukan skincare.', 15),
  ('FAQ', 'Kenapa rasa panas sangat?', 'Rasa hangat/panas adalah NORMAL — itu tanda produk sedang bekerja. Tahap panas bergantung pada jenis: Mild hangat je, Super Hot lebih panas, Extreme memang panas. Kalau baru pertama kali, mulakan dengan Mild. Kalau rasa tak selesa sangat, boleh cuci dengan air sabun. Jangan guna air panas sebab akan tambah rasa panas.', 16),
  ('FAQ', 'Ada expiry date?', 'Ya, semua produk ada tarikh luput yang tertera pada packaging. Biasanya tahan 2-3 tahun dari tarikh pembuatan. Simpan di tempat sejuk dan kering, jauhkan dari cahaya matahari terus.', 17),
  ('FAQ', 'Produk ni ubat ke?', 'BUKAN ubat. Ini produk penjagaan luaran (topical). Kami tak claim boleh rawat atau sembuh penyakit. Khasiat utama: legakan sakit sendi & otot, bantu urutan, memanaskan badan. Kalau ada masalah kesihatan serius, sila rujuk doktor.', 18),
  ('FAQ', 'Boleh guna setiap hari?', 'Boleh guna setiap hari, 2-3 kali sehari. Memang ramai pelanggan guna sebagai rutin harian — pagi sebelum kerja, malam sebelum tidur. Untuk workout, sapu sebelum exercise.', 19),
  ('FAQ', 'Ada bau tak?', 'Ada bau halia yang semula jadi. Lime & Ginger ada tambahan aroma limau nipis yang segar. Bau tak kuat sangat dan akan hilang selepas beberapa minit. Ramai pelanggan suka bau dia — soothing dan natural.', 20),

  -- Cara handle complaint
  ('Complaint', 'Pelanggan rasa produk tak berkesan', 'Tanya berapa lama dah guna dan guna produk mana. Kalau baru guna 1-2 kali, explain yang hasil mungkin ambil masa. Cadangkan naik ke level lebih panas kalau guna Mild. Tanya cara dia guna — mungkin tak sapu cukup atau tak urut. Jangan defensive, dengar dulu.', 21),
  ('Complaint', 'Pelanggan alah / gatal', 'Minta hentikan penggunaan serta-merta. Ini mungkin alahan pada halia — walaupun jarang berlaku. Minta basuh dengan air sabun. Kalau serius, rujuk doktor. Jangan blame pelanggan. Tunjukkan concern. Boleh cadangkan cuba Lime & Ginger yang lebih mild.', 22),
  ('Complaint', 'Pelanggan terima produk rosak / salah', 'Minta maaf dan minta pelanggan WhatsApp team dengan gambar bukti. Team akan arrange replacement secepat mungkin. Jangan suruh pelanggan beli baru. Kita jaga customer satisfaction.', 23),
  ('Complaint', 'Penghantaran lambat', 'Minta maaf atas kelewatan. Explain tempoh standard: Semenanjung 2-5 hari, Sabah/Sarawak 5-10 hari. Kalau dah lebih dari tu, minta pelanggan WhatsApp team dengan nombor tracking untuk semak status. Jangan blame courier, tunjukkan kita ambil berat.', 24),

  -- Perbandingan produk (supaya Emma boleh guide pilihan)
  ('Produk', 'Mild vs Hot vs Extreme', 'Mild (Pati Halia, Lime & Ginger): Hangat lembut, sesuai semua orang. Paling popular untuk ibu bersalin & warga emas. Hot (Super Hot, Extra Hot, Extra Ginger): Lebih panas, ada capsicum. Best untuk gym, shaping, orang aktif. Extreme (Extreme Hot): Paling panas. Untuk atlet hardcore & orang yang dah biasa Hot. Nasihat: SELALU start Mild dulu, nanti boleh naik level.', 25),
  ('Produk', 'Pati Halia vs Lime & Ginger', 'Dua-dua Mild level. Pati Halia — original bestseller, rasa hangat halia classic. Lime & Ginger — sama hangat tapi ada aroma limau nipis yang segar, lebih refreshing. Kalau customer suka bau segar, recommend Lime & Ginger. Kalau nak original proven, Pati Halia.', 26),
  ('Produk', 'Super Hot vs Extra Hot vs Extreme Hot', 'Super Hot — capsicum untuk haba max, best untuk gym & workout. Extra Hot — fokus shaping & anti-selulit. Extreme Hot — level paling panas, untuk hardcore user. Kalau customer nak bakar lemak masa gym, Super Hot. Nak slim & shape badan, Extra Hot. Nak paling power, Extreme Hot.', 27),
  ('Produk', '130ml vs 250ml', '130ml senang bawa, muat handbag, sesuai travel & try dulu. 250ml saiz keluarga, LEBIH JIMAT per ml. Contoh: Pati Halia 130ml = RM22.90 (17.6sen/ml), 250ml = RM38.90 (15.6sen/ml) — jimat ~11%. Recommend 250ml untuk pengguna tetap yang dah confirm suka.', 28),

  -- Tips close sale
  ('Sales', 'Teknik recommend ikut profil', 'Ibu bersalin/berpantang: Pati Halia (Mild) — lembut, selamat, proven ramai ibu guna. Warga emas sakit sendi: Pati Halia atau Lime & Ginger — hangat selesa. Gym/fitness: Super Hot — capsicum power. Nak kurus/shape: Extra Hot — fokus shaping. Atlet/sukan: Extreme Hot — max heat. Keluarga: 250ml — jimat, kongsi sekeluarga. First timer: SELALU Mild dulu.', 29),
  ('Sales', 'Cara handle "mahal"', 'RM22.90 untuk 130ml boleh tahan sebulan lebih. Banding pergi urut sekali dah RM80-150. Ni macam ada tukang urut sendiri di rumah. Kalau nak jimat lagi, ada 250ml lagi berbaloi. Produk proven 20 tahun, bukan produk murah yang tak berkesan. Fasha Sandha pun guna — mesti ada kualiti dia.', 30),
  ('Sales', 'Cara handle "nak fikir dulu"', 'Jangan push. Cakap "takpe, ambil masa. Kalau ada soalan boleh tanya je". Boleh mention "btw ada jugak di Shopee kalau nak compare". Bagi space. Ramai yang fikir dulu pastu datang balik. Jangan spam follow up.', 31),
  ('Sales', 'Cara handle "ada produk lain yang lebih murah"', 'Jangan bash competitor. Fokus pada USP Dunia Herbs: 20 tahun di pasaran, Halal JAKIM & KKM, 100% bahan semula jadi, 100K+ pelanggan setia, Fasha Sandha jadi duta. Harga berpatutan untuk kualiti. Produk murah belum tentu selamat dan berkesan.', 32),
  ('Sales', 'Bila nak bagi WhatsApp link', 'HANYA bagi WhatsApp link bila: 1) Customer sendiri tanya macam mana nak order. 2) Customer dah jelas berminat — dah pilih produk, tanya stok, tanya payment method. 3) Customer tanya soalan teknikal yang team perlu jawab. JANGAN bagi setiap reply. Timing penting — bagi awal nampak desperate.', 33),
  ('Sales', 'Upsell & Cross-sell', 'Kalau customer nak beli 1, mention saiz 250ml lagi jimat — tapi JANGAN push. Kalau beli Mild & suka, mention boleh try Hot level next time. Kalau beli untuk sendiri, tanya "nak bagi mak/family try jugak?" — tapi sekali je, jangan ulang. Natural je, macam kawan suggest.', 34),

  -- Info tambahan
  ('Promosi', 'Promosi Semasa', 'Tiada promosi khas buat masa ini. Harga standard seperti senarai harga. Kalau customer tanya pasal diskaun, cakap "harga ni dah ok, tapi boleh check dgn team kadang ada promo seasonal". Jangan reka promosi yang tak wujud.', 35),
  ('Penghantaran', 'Cara Order', 'Boleh order melalui: 1) WhatsApp — terus chat dengan team. 2) Shopee — search "Dunia Herbs Official". 3) Lazada — search "Dunia Herbs". 4) TikTok Shop — @duniaherbsofficial. 5) Walk-in stockist — 40+ lokasi seluruh Malaysia. Payment: online banking, card, e-wallet (bergantung platform).', 36),
  ('Penghantaran', 'Kos penghantaran', 'Kos penghantaran bergantung pada platform dan lokasi. Shopee & Lazada selalu ada free shipping voucher. WhatsApp order biasanya guna J&T atau Pos Laju — kos bergantung berat dan lokasi. Untuk detail tepat, suruh customer WhatsApp team.', 37),
  ('Syarikat', 'Sejarah Dunia Herbs', 'Ditubuhkan tahun 2004 oleh Rushdi Abdullah. Bermula dengan satu produk — Lotion Mustajab Pati Halia. Perintis lotion pati halia di Malaysia. Kini ada 8 variasi produk. Dah export ke Arab Saudi (2014) dan Singapura. 40+ stockist seluruh Malaysia. Lebih 100,000 pelanggan setia. Duta rasmi Fasha Sandha. Brand yang trusted dan proven.', 38),
  ('Keselamatan', 'Bahan-bahan utama', 'Bahan utama: Pati halia tulen (Zingiber officinale). Bahan tambahan ikut variasi: Capsicum (Super Hot, Extreme Hot) untuk haba tambahan. Limau nipis/Lime (Lime & Ginger) untuk aroma segar. Semua bahan semula jadi, tiada paraben, tiada SLS, tiada bahan kimia keras. Diluluskan KKM dan Halal JAKIM.', 39);

-- 9. Enable Row Level Security
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE stockists ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read" ON site_content FOR SELECT USING (true);
CREATE POLICY "Public read" ON products FOR SELECT USING (visible = true);
CREATE POLICY "Public read" ON testimonials FOR SELECT USING (visible = true);
CREATE POLICY "Public read" ON faqs FOR SELECT USING (visible = true);
CREATE POLICY "Public read" ON stockists FOR SELECT USING (visible = true);
CREATE POLICY "Public read" ON milestones FOR SELECT USING (true);
CREATE POLICY "Public read" ON videos FOR SELECT USING (visible = true);
CREATE POLICY "Public read" ON knowledge_base FOR SELECT USING (visible = true);

-- Authenticated full access (for admin)
CREATE POLICY "Auth full access" ON site_content FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON stockists FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON milestones FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON videos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth full access" ON knowledge_base FOR ALL USING (auth.role() = 'authenticated');

-- 8. Storage bucket for media
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Auth upload media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Auth update media" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
CREATE POLICY "Auth delete media" ON storage.objects FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
