"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { app, podcast } from "@/content/site";

// The app demo is a 9:16 phone recording. The frame is sized by whichever is
// tighter, viewport height or width, so the whole video is always visible:
// at most 70% of the viewport height (capped at 600px tall) and 72% of the width.
export function PhoneVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Autoplay muted only while on screen, and never under reduced motion.
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.6 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure
      className={`relative mx-auto shrink-0 ${className}`}
      style={{ width: `min(72vw, calc(min(70svh, 600px) * ${app.aspect}))` }}
    >
      <div className="relative overflow-hidden rounded-[2.2rem] border-[6px] border-[var(--phone-bezel,#0d1712)] bg-[#0d1712] shadow-[0_40px_80px_-30px_rgb(5_25_15/0.55)]">
        <video
          ref={ref}
          src={app.video}
          poster={app.poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="block w-full"
          style={{ aspectRatio: `${app.aspect}` }}
          aria-label="Demo of the free Peace is Possible coping skills app"
        />
        <div className="absolute inset-x-0 bottom-0 flex justify-between p-3">
          <button
            type="button"
            onClick={() => (ref.current?.paused ? ref.current.play() : ref.current?.pause())}
            className="grid size-10 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition active:scale-95"
            aria-label={playing ? "Pause demo" : "Play demo"}
          >
            {playing ? <Pause size={18} weight="fill" /> : <Play size={18} weight="fill" />}
          </button>
          <button
            type="button"
            onClick={() => {
              setMuted((m) => !m);
              ref.current?.play().catch(() => {});
            }}
            className="grid size-10 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition active:scale-95"
            aria-label={muted ? "Turn sound on" : "Mute"}
          >
            {muted ? <SpeakerSlash size={18} weight="fill" /> : <SpeakerHigh size={18} weight="fill" />}
          </button>
        </div>
      </div>
    </figure>
  );
}

// 16:9 thumbnail; the YouTube player only loads after a click. No autoplay on
// page load and no loop, unlike the old embed.
export function PodcastEmbed({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(false);
  return (
    <div className={`relative aspect-video w-full overflow-hidden rounded-[var(--radius-lg)] bg-[#0d1712] ${className}`}>
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${podcast.youtubeId}?autoplay=1&rel=0`}
          title={podcast.videoTitle}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0" aria-label={`Play: ${podcast.videoTitle}`}>
          <Image src={podcast.thumb} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.02]" />
          <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#0d1712] shadow-xl transition group-hover:scale-105 group-active:scale-95 md:size-20">
            <Play size={28} weight="fill" />
          </span>
        </button>
      )}
    </div>
  );
}
