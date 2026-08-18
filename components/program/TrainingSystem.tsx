"use client";

import { motion } from "framer-motion";
import { programPillars } from "@/data/programs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

export function TrainingSystem() {
  return (
    <section id="program" className="relative bg-ice-navy py-28 md:py-36">
      <Container>
        <SectionHeading
          eyebrow="Our Methodology"
          title="A Training System Built Around the Athlete"
          description="Every skater develops differently. Our coaching system combines technical development, movement quality, athletic preparation, performance psychology and individual progression into one personalized training strategy. No two athletes receive exactly the same program."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4"
        >
          {programPillars.map((pillar, i) => (
            <motion.div
              key={pillar.id}
              variants={staggerItem}
              className="group relative bg-ice-navy p-8 transition-colors duration-500 hover:bg-ice-navy-light md:p-10"
            >
              <span className="font-serif text-sm italic text-crystal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ice-white">
                {pillar.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ice-white-dim">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
