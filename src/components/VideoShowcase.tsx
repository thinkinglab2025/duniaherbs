'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getSupabaseBrowser } from '@/lib/supabase-browser';

type Video = {
  id: string;
  title: string;
  label: string;
  video_url: string;
};

const fallbackVideos: Video[] = [
  { id: '1', title: 'Duta 1', label: 'Duta Dunia Herbs', video_url: '/IMG_0587.MP4' },
  { id: '2', title: 'Duta 2', label: 'Duta Dunia Herbs', video_url: '/IMG_0596.MP4' },
  { id: '3', title: 'Duta 3', label: 'Duta Dunia Herbs', video_url: '/IMG_0605.MP4' },
  { id: '4', title: 'Duta 4', label: 'Duta Dunia Herbs', video_url: '/IMG_0611.MP4' },
];

function VideoCard({ video, index }: { video: Video; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = containerRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function toggleMute() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  return (
    <motion.div
      ref={containerRef}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? false : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-blue-950/40 bg-herb-surface/60"
    >
      <video
        ref={videoRef}
        src={video.video_url}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        loop
        muted
        preload="metadata"
      />

      {/* Mute/unmute button */}
      <button
        onClick={toggleMute}
        className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/80 backdrop-blur-sm transition hover:bg-black/70 hover:text-white opacity-0 group-hover:opacity-100"
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {muted ? (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>

      {/* Label at bottom */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
        <p className="text-stone-200 text-sm font-medium">{video.label}</p>
      </div>
    </motion.div>
  );
}

export function VideoShowcase() {
  const [videos, setVideos] = useState<Video[]>(fallbackVideos);

  useEffect(() => {
    async function load() {
      try {
        const supabase = getSupabaseBrowser();
        const { data } = await supabase
          .from('videos')
          .select('id, title, label, video_url')
          .eq('visible', true)
          .order('sort_order');
        if (data && data.length > 0) setVideos(data);
      } catch {
        // fallback to local videos
      }
    }
    load();
  }, []);

  if (videos.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {videos.map((v, i) => (
        <VideoCard key={v.id} video={v} index={i} />
      ))}
    </div>
  );
}
