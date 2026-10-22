"use client";

import { useState } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";

// Field names match Shopify's contact form (form_type=contact, contact[...])
// so the production build can post straight to the store's /contact endpoint.
// In the prototype, submission is simulated and nothing is sent.

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("contact[email]")?.toString().trim() ?? "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter an email address like name@example.com");
      return;
    }
    setEmailError(null);
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 900);
  };

  if (status === "sent") {
    return (
      <div role="status" className={`flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--bg-2)] p-5 ${className}`}>
        <CheckCircle size={24} weight="fill" className="shrink-0 text-[var(--accent)]" />
        <div>
          <p className="font-semibold">Thanks, your message is in.</p>
          <p className="mt-1 text-sm text-[var(--ink-2)]">Prototype only: nothing was sent. In production this posts to the Shopify store.</p>
        </div>
      </div>
    );
  }

  const field =
    "w-full rounded-[var(--radius-sm)] border border-[var(--line-strong)] bg-[var(--field)] px-3.5 py-2.5 text-[var(--ink)] placeholder:text-[var(--ink-3)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25";

  return (
    <form onSubmit={onSubmit} noValidate className={`grid gap-5 ${className}`}>
      <input type="hidden" name="form_type" value="contact" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Name
          <input name="contact[name]" autoComplete="name" className={field} />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Phone number <span className="sr-only">(optional)</span>
          <input name="contact[phone]" type="tel" autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium">
        Email
        <input
          name="contact[email]"
          type="email"
          required
          autoComplete="email"
          aria-invalid={!!emailError}
          aria-describedby="contact-email-error"
          className={`${field} ${emailError ? "border-[var(--danger)]" : ""}`}
        />
        <span id="contact-email-error" className="flex items-center gap-1.5 text-sm font-normal text-[var(--danger)]" aria-live="polite">
          {emailError && (
            <>
              <WarningCircle size={16} weight="fill" /> {emailError}
            </>
          )}
        </span>
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Message
        <textarea name="contact[body]" rows={5} className={field} />
        <span className="text-sm font-normal text-[var(--ink-2)]">Please don&apos;t share anything urgent here. For a crisis, call or text 988.</span>
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="justify-self-start rounded-full bg-[var(--accent)] px-6 py-3 font-semibold text-[var(--accent-ink)] transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
