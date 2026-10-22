export const BASE = "/v1-canopy";

// Every internal link in this direction is prefixed so it stays inside the prototype.
export const to = (path: string) => (path === "/" ? BASE : `${BASE}${path}`);
