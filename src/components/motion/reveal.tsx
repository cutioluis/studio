"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion, type Variants } from "motion/react";

// Shared scroll-reveal primitives. Server components wrap content with these so only the
// animation shell ships as client code. Everything animates once, on entering the viewport.

const EASE_SOFT = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 } as const;

const elements = {
  div: motion.div,
  header: motion.header,
  ul: motion.ul,
  li: motion.li,
};

type RevealTag = keyof typeof elements;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_SOFT } },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, ease: EASE_SOFT } },
};

/** Respects the OS "reduce motion" setting for every animation below it. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

interface RevealProps {
  children: ReactNode;
  as?: RevealTag;
  className?: string;
  delay?: number;
}

/** Single block that fades up when scrolled into view. */
export function Reveal({ children, as = "div", className, delay = 0 }: RevealProps) {
  const Element = elements[as];
  return (
    <Element
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: fadeUp.hidden,
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_SOFT, delay } },
      }}
    >
      {children}
    </Element>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  as?: RevealTag;
  className?: string;
  stagger?: number;
}

/** Container that reveals its RevealItem children one after another. */
export function RevealGroup({ children, as = "div", className, stagger = 0.12 }: RevealGroupProps) {
  const Element = elements[as];
  return (
    <Element
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </Element>
  );
}

interface RevealItemProps {
  children: ReactNode;
  as?: RevealTag;
  className?: string;
  /** "card" adds a subtle scale-in suited to cards; "text" is a plain fade-up. */
  variant?: "card" | "text";
}

/** Child of RevealGroup; inherits the group's timing. */
export function RevealItem({ children, as = "div", className, variant = "card" }: RevealItemProps) {
  const Element = elements[as];
  return (
    <Element className={className} variants={variant === "card" ? cardIn : fadeUp}>
      {children}
    </Element>
  );
}
