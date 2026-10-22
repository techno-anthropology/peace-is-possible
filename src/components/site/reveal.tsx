"use client";

import { motion, useReducedMotion } from "motion/react";

// Content settles into place as it scrolls into view. Slow on purpose.
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}
