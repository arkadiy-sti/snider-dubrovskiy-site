"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Navigation as NavigationIcon } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { Container } from "@/components/ui/Container";
import { fadeUp, scaleIn, viewportOnce } from "@/lib/animations";

export function Location() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.location.mapsQuery
  )}`;

  return (
    <section id="location" className="relative bg-ice-navy py-28 md:py-36">
      <Container className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
        >
          <span className="mb-4 inline-block font-serif text-sm italic tracking-wide text-crystal">
            Where We Train
          </span>
          <h2 className="text-balance text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-ice-white">
            Train Where Champions Train
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ice-white-dim">
            Professional coaching deserves a professional environment. Training
            sessions take place at {siteConfig.location.facility}, providing
            athletes with the ice quality and facilities required for serious
            development.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ice-white-dim">
            {siteConfig.location.description}
          </p>

          <div className="mt-8 flex items-center gap-3 text-ice-white">
            <MapPin size={18} className="text-crystal" />
            <span className="text-base">
              {siteConfig.location.facility}, {siteConfig.location.region}
            </span>
          </div>

          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium uppercase tracking-wide text-ice-white transition-colors hover:border-crystal hover:text-crystal"
          >
            <NavigationIcon size={16} />
            Get Directions
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scaleIn}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line md:aspect-[16/11]"
        >
          <Image
            src="/images/students-program.webp"
            alt="Coaches with young figure skaters on the ice at Sharks Ice, San Jose"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-[62%_35%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ice-navy/70 via-transparent to-transparent" />
        </motion.div>
      </Container>
    </section>
  );
}
