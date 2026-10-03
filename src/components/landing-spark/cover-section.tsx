"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, type Variants } from "motion/react";
import { IconSwap, ShineSweep } from "@/components/ui/button-effects";

// One background per career line: nails, hair/colorimetry and makeup. Photos from Unsplash (free license).
const coverImages = ["/images/hero/unas.jpg", "/images/hero/colorimetria.jpg", "/images/hero/maquillaje.jpg"];
const ROTATION_MS = 7000;

// Verbs that complete "<verb> en el mundo de la belleza."
const SCRIPT_WORDS = ["Aprende", "Emprende", "Brilla"];
const SCRIPT_WORD_MS = 3400;

// Long, soft deceleration: fast start, very gentle landing.
const EASE_SOFT = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: EASE_SOFT } },
};

const letters: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: "0.3em", filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE_SOFT } },
  exit: { opacity: 0, y: "-0.2em", filter: "blur(8px)", transition: { duration: 0.5, ease: "easeIn" } },
};

export function CoverSection() {
  const [current, setCurrent] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % coverImages.length);
    }, ROTATION_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % SCRIPT_WORDS.length);
    }, SCRIPT_WORD_MS);
    return () => clearInterval(interval);
  }, []);

  const scriptWord = SCRIPT_WORDS[wordIndex];

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-black py-24 md:py-32">
        {/* Background: slow crossfade with a gentle zoom-out (Ken Burns) on the active photo */}
        {coverImages.map((src, index) => {
          const active = index === current;
          return (
            <motion.div
              key={src}
              aria-hidden
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.1 }}
              transition={{
                opacity: { duration: 2.4, ease: "easeInOut" },
                scale: { duration: active ? ROTATION_MS / 1000 + 2.4 : 2.4, ease: active ? "linear" : "easeInOut" },
              }}
            >
              <Image src={src} alt="" fill sizes="100vw" priority={index === 0} className="object-cover" />
            </motion.div>
          );
        })}

        {/* Darkening layers so white copy stays readable over light photos */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.55)_45%,rgba(0,0,0,0.15)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="container relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex max-w-4xl flex-col items-center text-center md:items-start md:text-left"
          >
            <motion.p
              variants={rise}
              className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              +100 Alumnas Certificadas
            </motion.p>

            <h1 className="w-full text-white">
              <span className="sr-only">Aprende, emprende y brilla en el mundo de la belleza.</span>

              {/* Line 1: calligraphic verb that writes itself in and out */}
              <motion.span
                variants={rise}
                aria-hidden
                className="relative block h-[1.25em] font-script text-[4.5rem] leading-[1.25] text-primary drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] sm:text-[6.5rem] md:text-[8rem]"
              >
                <AnimatePresence initial={false}>
                  <motion.span
                    key={scriptWord}
                    variants={letters}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute inset-x-0 top-0 whitespace-nowrap md:right-auto md:-left-1"
                  >
                    {scriptWord.split("").map((char, i) => (
                      <motion.span key={`${char}-${i}`} variants={letter} className="inline-block">
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              </motion.span>

              {/* Line 2: fixed sentence the verb completes */}
              <motion.span
                variants={rise}
                aria-hidden
                className="-mt-2 block text-[2.5rem] font-light leading-[1.05] tracking-[-0.035em] drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] sm:-mt-4 sm:text-6xl md:text-7xl lg:text-[5.25rem]"
              >
                en el mundo de la <span className="font-serif italic">belleza.</span>
              </motion.span>
            </h1>

            <motion.p variants={rise} className="mt-8 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Uñas, pestañas, maquillaje, cabello y colorimetría con práctica real desde el primer día. Certifícate y emprende.
            </motion.p>

            <motion.div variants={rise} className="mt-10">
              <Link
                href="/inscripcion"
                className="group/btn relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary-deep py-2 pl-7 pr-2 text-base font-semibold text-primary-foreground shadow-[0_10px_40px_-12px_hsl(var(--primary)/0.55)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-12px_hsl(var(--primary)/0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                <ShineSweep />
                <span className="relative">Inscríbete ahora</span>
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-background text-primary transition-colors duration-500 group-hover/btn:bg-card">
                  <IconSwap className="h-5 w-5" />
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
