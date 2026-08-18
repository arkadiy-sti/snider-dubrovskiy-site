"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WordsPullUp } from "@/components/ui/WordsPullUp";
import { HeroAtmosphere } from "@/components/hero/HeroAtmosphere";
import { fadeUp, fadeIn } from "@/lib/animations";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 40]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const eyebrowOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const headlineLines = siteConfig.hero.headline.reduce<
    { line: string; offset: number }[]
  >((acc, line) => {
    const prevWords = acc.reduce((sum, l) => sum + l.line.split(" ").length, 0);
    acc.push({ line, offset: prevWords * 0.1 });
    return acc;
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[720px] w-full bg-ice-black p-2 md:p-3"
    >
      <motion.div
        style={{ scale, borderRadius: radius }}
        className="relative h-full w-full overflow-hidden"
      >
        <Image
          src="/images/hero-portrait.webp"
          alt="Stepan Dubrovskiy and Stephanie Snider, professional figure skating coaches, standing together on the ice at a professional arena"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_18%] md:object-[center_14%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ice-black via-ice-black/55 to-ice-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-ice-black/70 via-transparent to-transparent" />
        <div className="bg-grain absolute inset-0" />

        <HeroAtmosphere />

        <div className="relative z-10 flex h-full flex-col justify-end pb-20 pt-32 md:pb-24">
          <motion.div
            style={{ y: contentY, opacity: contentOpacity }}
            className="mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16"
          >
            <motion.span
              style={{ opacity: eyebrowOpacity }}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="mb-6 inline-block font-serif text-base italic tracking-wide text-crystal"
            >
              {siteConfig.hero.eyebrow}
            </motion.span>

            <h1 className="max-w-4xl text-balance text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.98] tracking-tight text-ice-white">
              {headlineLines.map(({ line, offset }) => (
                <span key={line} className="block overflow-hidden">
                  <WordsPullUp text={line} delayOffset={offset} />
                </span>
              ))}
            </h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.55 }}
              className="mt-7 max-w-xl text-balance text-lg leading-relaxed text-ice-white-dim md:text-xl"
            >
              {siteConfig.hero.subheadline}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton href="#register" variant="primary">
                {siteConfig.cta.primary}
              </MagneticButton>
              <MagneticButton href="#coaches" variant="ghost">
                {siteConfig.cta.secondary}
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
          aria-hidden="true"
        >
          <ChevronDown className="h-5 w-5 animate-bounce text-ice-white-dim" />
        </motion.div>
      </motion.div>
    </section>
  );
}
