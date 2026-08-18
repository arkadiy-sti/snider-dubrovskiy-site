"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { fadeUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

const details = ["Every detail matters.", "Every edge matters.", "Every session matters."];

export function HookSection() {
  return (
    <section className="bg-grain relative overflow-hidden bg-ice-black py-32 md:py-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(94,200,255,0.08),transparent_65%)]" />
      <Container className="relative">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="max-w-4xl text-balance text-[clamp(2.25rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-ice-white"
        >
          Talent Is Only the Beginning.
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ delay: 0.15 }}
          className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-ice-white-dim md:text-xl"
        >
          What separates promising skaters from exceptional athletes is the
          environment, coaching system and attention they receive every day.
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-14 flex flex-col gap-2 border-t border-line pt-10"
        >
          {details.map((line) => (
            <motion.span
              key={line}
              variants={staggerItem}
              className="font-serif text-2xl italic text-crystal md:text-3xl"
            >
              {line}
            </motion.span>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
