export const base = "/v2-water";

// Internal links: content uses production paths; prototypes live under /v2-water.
export const to = (path: string) => (path === "/" ? base : `${base}${path}`);
