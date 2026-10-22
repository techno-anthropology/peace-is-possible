// Canopy-only CSS (keyframes for the lite hero, marquee). Shipped as a <style>
// element because the project's turbopack CSS rule disables CSS modules.
const css = `
/* Lite hero for phones: a canopy photo with CSS light shafts and a few falling leaves. */
.cn-shaft {
  position: absolute;
  top: -20%;
  height: 150%;
  transform-origin: top center;
  background: linear-gradient(to bottom, rgb(255 244 210 / 0.55), rgb(255 244 210 / 0) 80%);
  filter: blur(18px);
  mix-blend-mode: screen;
  opacity: 0.35;
}

.cn-leaf {
  position: absolute;
  top: -8%;
  color: var(--leaf-color);
  opacity: 0;
}

@media (prefers-reduced-motion: no-preference) {
  .cn-shaft {
    animation: cn-breathe 9s ease-in-out infinite alternate;
  }
  .cn-leaf {
    animation: cn-fall var(--dur) linear var(--delay) infinite;
  }
}

@keyframes cn-breathe {
  from {
    opacity: 0.18;
  }
  to {
    opacity: 0.5;
  }
}

@keyframes cn-fall {
  0% {
    opacity: 0;
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  10% {
    opacity: 0.9;
  }
  50% {
    transform: translate3d(var(--drift), 55vh, 0) rotate(160deg);
  }
  90% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translate3d(0, 110vh, 0) rotate(320deg);
  }
}

/* Testimonial marquee */
.cn-marquee {
  display: flex;
  width: max-content;
}
@media (prefers-reduced-motion: no-preference) {
  .cn-marquee {
    animation: cn-scroll 70s linear infinite;
  }
  .cn-marqueeWrap:hover .cn-marquee,
  .cn-marqueeWrap:focus-within .cn-marquee {
    animation-play-state: paused;
  }
}
@keyframes cn-scroll {
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

/* Bag drawer slides in from the right. */
@media (prefers-reduced-motion: no-preference) {
  .bag-sheet[open] {
    animation: bag-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
}
@keyframes bag-in {
  from {
    transform: translate3d(100%, 0, 0);
  }
}

.cn-fadeIn {
  animation: cn-fadeIn 1.6s ease both;
}
@keyframes cn-fadeIn {
  from {
    opacity: 0;
  }
}
`;

export function SiteStyles() {
  return <style href="site-styles" precedence="default">{css}</style>;
}
