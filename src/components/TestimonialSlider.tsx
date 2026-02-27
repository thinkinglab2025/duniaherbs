'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

const allTestimonials: Testimonial[] = [
  { quote: 'Produk ni memang berkesan. Saya guna untuk sakit lutut, lega dalam masa singkat.', author: 'Siti A.', role: 'Pelanggan sejak 2019' },
  { quote: 'Lotion Mustajab pilihan keluarga kami. Halal, selamat dan berkesan.', author: 'Ahmad R.', role: 'Bapa 3 anak' },
  { quote: 'Lepas bersalin saya guna Pati Halia. Memang mustajab untuk urutan badan.', author: 'Nurul H.', role: 'Ibu baru' },
  { quote: 'Saya pakai Super Hot sebelum gym. Badan cepat panas, peluh lebih banyak.', author: 'Faizal M.', role: 'Gym enthusiast' },
  { quote: 'Dah 5 tahun guna. Satu keluarga pakai produk ni — dari nenek sampai cucu.', author: 'Aminah Y.', role: 'Pelanggan setia' },
  { quote: 'Sakit pinggang saya kurang selepas seminggu guna. Recommended sangat!', author: 'Rahman K.', role: 'Pemandu lori' },
  { quote: 'Produk halal dan selamat. Saya percaya Dunia Herbs sejak dulu lagi.', author: 'Zainab S.', role: 'Surirumah' },
  { quote: 'Extreme Hot memang gila panas! Sesuai lepas main futsal. Otot tak cramp.', author: 'Izzat D.', role: 'Pemain futsal' },
  { quote: 'Mak saya yang recommend. Sekarang saya pun dah jadi pelanggan tetap!', author: 'Haslinda W.', role: 'Pelanggan sejak 2021' },
  { quote: 'Bau wangi halia, tak melekit. Memang selesa pakai setiap hari.', author: 'Kamal J.', role: 'Pekerja pejabat' },
  { quote: 'Saya beli untuk ibu. Dia kata sakit sendi dah kurang banyak. Terbaik!', author: 'Liyana T.', role: 'Anak yang prihatin' },
  { quote: 'Guna masa mengandung pun selamat. Doktor kata OK sebab luaran sahaja.', author: 'Farihah N.', role: 'Ibu mengandung' },
  { quote: 'Kawan office semua dah mula pakai. Viral sebab memang berkesan.', author: 'Daniel L.', role: 'Eksekutif IT' },
  { quote: 'Saya runner. Lepas lari 10km, sapu lotion ni terus rasa lega otot kaki.', author: 'Syafiq B.', role: 'Pelari marathon' },
  { quote: 'Dulu selalu pergi urut. Sekarang jimat, pakai Dunia Herbs je dah cukup.', author: 'Rokiah M.', role: 'Pesara kerajaan' },
  { quote: 'Packaging cantik, kualiti terjamin. Sesuai buat hadiah untuk orang tersayang.', author: 'Aiman Z.', role: 'Pembeli pertama' },
];

export function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);
  const total = allTestimonials.length;
  const perPage = 2;
  const pages = Math.ceil(total / perPage);

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % pages) + pages) % pages);
  }, [pages]);

  function startAutoSlide() {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % pages);
    }, 5000);
  }

  function stopAutoSlide() {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  useEffect(() => {
    if (!reduceMotion) startAutoSlide();
    return stopAutoSlide;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, pages]);

  const visible = allTestimonials.slice(current * perPage, current * perPage + perPage);

  return (
    <div
      onMouseEnter={stopAutoSlide}
      onMouseLeave={() => { if (!reduceMotion) startAutoSlide(); }}
    >
      <div className="grid md:grid-cols-2 gap-6 min-h-[200px]">
        {visible.map((t, i) => (
          <motion.div
            key={`${current}-${i}`}
            initial={reduceMotion ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-2xl border border-blue-950/40 bg-herb-surface/60 p-6 backdrop-blur-md"
          >
            <p className="text-herb-gold/60 text-4xl font-serif leading-none mb-4">&ldquo;</p>
            <p className="text-stone-300 italic leading-relaxed">{t.quote}</p>
            <p className="mt-4 text-herb-gold text-sm font-medium">{t.author}</p>
            <p className="text-stone-500 text-xs">{t.role}</p>
          </motion.div>
        ))}
      </div>

      {/* Dots + arrows */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => goTo(current - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-950/50 text-stone-500 transition hover:border-herb-gold hover:text-herb-gold"
          aria-label="Sebelum"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? 'w-6 bg-herb-gold' : 'w-2 bg-stone-700 hover:bg-stone-500'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(current + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-950/50 text-stone-500 transition hover:border-herb-gold hover:text-herb-gold"
          aria-label="Seterusnya"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
