"use client";

import { useState, useSyncExternalStore } from "react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";
import { site } from "@/content/site";

// A plain HTML form posting to the Shopify store's contact endpoint with
// Shopify's field names, so it works without JavaScript. The email pattern is
// enforced by the browser; script only swaps the native bubble for an inline message.
const emailPattern = "[^\\s@]+@[^\\s@]+\\.[^\\s@]+";
const emailMessage = "Enter an email address like name@example.com";

// Shopify sends the visitor back with ?contact_posted=true after a successful post.
const usePosted = () =>
  useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("contact_posted") === "true",
    () => false,
  );

const field =
  "w-full rounded-[var(--radius-sm)] border border-[var(--line-strong)] bg-[var(--field)] px-3.5 py-2.5 text-[var(--ink)] placeholder:text-[var(--ink-3)] outline-none transition focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/25";

export function ContactForm({ className = "" }: { className?: string }) {
  const posted = usePosted();
  const [emailError, setEmailError] = useState(false);

  if (posted) {
    return (
      <div role="status" className={`flex items-start gap-3 rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--bg-2)] p-5 ${className}`}>
        <CheckCircle size={24} weight="fill" className="shrink-0 text-[var(--accent)]" />
        <div>
          <p className="font-semibold">Thanks, your message is in.</p>
          <p className="mt-1 text-sm text-[var(--ink-2)]">We&apos;ll reply within a couple of days.</p>
        </div>
      </div>
    );
  }

  return (
    <form method="post" action={`${site.store}/contact`} acceptCharset="UTF-8" className={`grid gap-5 ${className}`}>
      <input type="hidden" name="form_type" value="contact" />
      <input type="hidden" name="utf8" value="✓" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Name
          <input name="contact[name]" autoComplete="name" className={field} />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          <span>
            Phone number <span className="font-normal text-[var(--ink-3)]">(optional)</span>
          </span>
          <input name="contact[phone]" type="tel" autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium">
        Email
        <input
          name="contact[email]"
          type="email"
          required
          pattern={emailPattern}
          title={emailMessage}
          autoComplete="email"
          aria-invalid={emailError}
          aria-describedby="contact-email-error"
          onInvalid={(e) => {
            e.preventDefault();
            setEmailError(true);
            e.currentTarget.focus();
          }}
          onInput={(e) => emailError && e.currentTarget.validity.valid && setEmailError(false)}
          className={`${field} ${emailError ? "border-[var(--danger)]" : ""}`}
        />
        <span id="contact-email-error" className="flex items-center gap-1.5 text-sm font-normal text-[var(--danger)]" aria-live="polite">
          {emailError && (
            <>
              <WarningCircle size={16} weight="fill" /> {emailMessage}
            </>
          )}
        </span>
      </label>
      <label className="grid gap-2 text-sm font-medium">
        Message
        <textarea name="contact[body]" rows={5} aria-describedby="contact-body-note" className={field} />
        <span id="contact-body-note" className="text-sm font-normal text-[var(--ink-2)]">
          Please don&apos;t share anything urgent here. For a crisis, call or text 988.
        </span>
      </label>
      <button
        type="submit"
        className="justify-self-start rounded-full bg-[var(--accent)] px-6 py-3 font-semibold text-[var(--accent-ink)] transition hover:brightness-110 active:scale-[0.98]"
      >
        Send message
      </button>
    </form>
  );
}
