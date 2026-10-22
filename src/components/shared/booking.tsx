"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowSquareOut, X } from "@phosphor-icons/react";
import { booking, coaches, ctas, type CoachId } from "@/content/site";

// Booking flow shared by every direction: "What brings you here?" chooser,
// then the coach's Google appointment page embedded in the same dialog.
// Styling comes from the palette tokens (--surface, --ink, --accent, ...) so
// each direction themes it without forking the logic.

type BookingCtx = { open: (coach?: CoachId) => void };
const Ctx = createContext<BookingCtx | null>(null);

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [coach, setCoach] = useState<CoachId | null>(null);
  const [loaded, setLoaded] = useState(false);

  const open = useCallback((preset?: CoachId) => {
    setCoach(preset ?? null);
    setLoaded(false);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  // Hidden routes stay mounted under cacheComponents; never leave a modal open.
  useEffect(() => () => dialogRef.current?.close(), []);

  const choice = coach ? booking[coach] : null;
  const person = coach ? coaches.find((c) => c.id === coach)! : null;

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <dialog
        ref={dialogRef}
        aria-labelledby="booking-title"
        onClick={(e) => e.target === e.currentTarget && close()}
        className="booking-dialog m-auto w-[min(100vw-1.5rem,56rem)] max-h-[min(100dvh-1.5rem,52rem)] overflow-hidden rounded-[var(--radius-lg)] bg-[var(--surface)] p-0 text-[var(--ink)] shadow-[0_30px_80px_-20px_rgb(5_20_12/0.45)] backdrop:bg-[rgb(6_18_12/0.55)] backdrop:backdrop-blur-sm"
      >
        <div className="flex max-h-[inherit] flex-col">
          <header className="flex items-center gap-3 border-b border-[var(--line)] px-5 py-4 md:px-7">
            {choice && (
              <button
                type="button"
                onClick={() => setCoach(null)}
                className="grid size-9 place-items-center rounded-full text-[var(--ink-2)] transition hover:bg-[var(--bg-2)] active:scale-95"
                aria-label="Back to choices"
              >
                <ArrowLeft size={18} weight="bold" />
              </button>
            )}
            <h2 id="booking-title" className="text-lg font-semibold tracking-tight">
              {choice ? `Free call with ${person!.name.split(" ")[0]}` : "What brings you here?"}
            </h2>
            <button
              type="button"
              onClick={close}
              className="ml-auto grid size-9 place-items-center rounded-full text-[var(--ink-2)] transition hover:bg-[var(--bg-2)] active:scale-95"
              aria-label="Close"
            >
              <X size={18} weight="bold" />
            </button>
          </header>

          {!choice ? (
            <div className="grid gap-3 p-5 md:grid-cols-2 md:gap-4 md:p-7">
              {(Object.keys(booking) as CoachId[]).map((id) => {
                const b = booking[id];
                const c = coaches.find((x) => x.id === id)!;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setLoaded(false);
                      setCoach(id);
                    }}
                    className="group flex items-start gap-4 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--bg)] p-4 text-left transition hover:border-[var(--accent)] active:scale-[0.99] md:p-5"
                  >
                    <Image src={c.photo} alt="" width={64} height={64} className="size-14 shrink-0 rounded-full object-cover object-top md:size-16" />
                    <span className="grid gap-1">
                      <span className="font-semibold">{b.label}</span>
                      <span className="text-sm leading-relaxed text-[var(--ink-2)]">{b.detail}</span>
                    </span>
                  </button>
                );
              })}
              <p className="text-sm text-[var(--ink-2)] md:col-span-2">
                The consultation is a free phone call. Not sure which? Start with Ronnie.
              </p>
            </div>
          ) : (
            <div className="relative min-h-0 flex-1">
              {!loaded && (
                <div className="absolute inset-0 grid content-start gap-3 p-6" aria-hidden>
                  <div className="h-6 w-1/3 animate-pulse rounded-md bg-[var(--bg-2)]" />
                  <div className="h-4 w-1/2 animate-pulse rounded-md bg-[var(--bg-2)]" />
                  <div className="mt-4 grid grid-cols-7 gap-2">
                    {Array.from({ length: 21 }).map((_, i) => (
                      <div key={i} className="aspect-square animate-pulse rounded-md bg-[var(--bg-2)]" />
                    ))}
                  </div>
                </div>
              )}
              <iframe
                key={coach}
                src={`${choice.url}?gv=true`}
                title={`Book a free consultation with ${person!.name}`}
                onLoad={() => setLoaded(true)}
                className="block h-[min(70dvh,40rem)] w-full border-0 bg-white"
              />
              <a
                href={choice.url}
                target="_blank"
                rel="noopener"
                className="flex items-center justify-center gap-2 border-t border-[var(--line)] px-5 py-3 text-sm text-[var(--ink-2)] hover:text-[var(--ink)]"
              >
                Calendar not loading? Open it in a new tab <ArrowSquareOut size={14} />
              </a>
            </div>
          )}
        </div>
      </dialog>
    </Ctx.Provider>
  );
}

type BookButtonProps = {
  coach?: CoachId;
  className?: string;
  children?: React.ReactNode;
};

export function BookButton({ coach, className, children }: BookButtonProps) {
  const { open } = useBooking();
  return (
    <button type="button" onClick={() => open(coach)} className={className}>
      {children ?? ctas.book}
    </button>
  );
}
