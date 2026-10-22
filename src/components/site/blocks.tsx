import type { Block } from "@/content/articles";
import { crisis } from "@/content/site";

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// Plain semantic HTML; the `.prose-pip` wrapper styles it.
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return <h2 key={i}>{b.text}</h2>;
          case "h3":
            return <h3 key={i}>{b.text}</h3>;
          case "p":
            return <p key={i}>{b.text}</p>;
          case "ul":
            return (
              <ul key={i}>
                {b.items.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i}>
                {b.items.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ol>
            );
        }
      })}
    </>
  );
}

export function CrisisNotice({ className = "" }: { className?: string }) {
  return (
    <aside aria-label={crisis.title} className={className}>
      <p className="font-semibold">{crisis.title}</p>
      <p className="mt-1 opacity-80">{crisis.body}</p>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        {crisis.lines.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="underline decoration-1 underline-offset-4 hover:opacity-80">
              {l.label}: {l.detail}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
