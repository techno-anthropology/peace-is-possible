import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { home, site } from "@/content/site";

export const alt = `${site.name}: ${home.hero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function assets() {
  "use cache";
  const [logo, font] = await Promise.all([
    readFile(join(process.cwd(), "public", site.logoMark)),
    readFile(join(process.cwd(), "src/app/fonts/figtree-semibold.ttf")),
  ]);
  return { logoSrc: `data:image/png;base64,${logo.toString("base64")}`, font: font.toString("base64") };
}

export default async function OpengraphImage() {
  const { logoSrc, font } = await assets();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 85% 15%, #1f4630 0%, #10221a 45%, #07120d 100%)",
          color: "#eef5f0",
          fontFamily: "Figtree",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={logoSrc} width={96} height={89} alt="" />
          <span style={{ fontSize: 36, fontWeight: 600, letterSpacing: -0.5 }}>{site.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 104, fontWeight: 600, letterSpacing: -4, lineHeight: 1 }}>{home.hero.headline}</span>
          <span style={{ fontSize: 34, color: "#b2c7b9" }}>Eating disorder recovery coaching in Colorado Springs and online</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Figtree", data: Buffer.from(font, "base64"), weight: 600, style: "normal" }] },
  );
}
