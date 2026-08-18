"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { achievements } from "@/data/achievements";
import { Container } from "@/components/ui/Container";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

function AchievementValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const [display, setDisplay] = useState(value);

  const match = value.match(/^(\d+)(.*)$/);

  useEffect(() => {
    if (!inView || !match) return;

    const target = Number(match[1]);
    const suffix = match[2];
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(`${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, match, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

export function Achievements() {
  return (
    <section id="results" className="border-y border-line bg-ice-navy py-24 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8"
        >
          {achievements.map((item) => (
            <motion.div key={item.label} variants={staggerItem} className="text-center md:text-left">
              <div className="font-serif text-[clamp(2.25rem,5vw,3.5rem)] italic text-ice-white">
                <AchievementValue value={item.value} />
              </div>
              <p className="mt-2 text-sm uppercase tracking-wide text-ice-white-dim">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
