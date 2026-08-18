"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { coaches } from "@/data/coaches";
import { competitionGallery } from "@/data/gallery";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeUp, scaleIn, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

export function Coaches() {
  return (
    <section id="coaches" className="relative bg-ice-black py-28 md:py-36">
      <Container>
        <SectionHeading
          eyebrow="Meet Your Coaches"
          title="Two Coaches. One Standard of Excellence."
          description="Former international competitors, now dedicated entirely to developing the next generation of skaters — on and off the ice."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={scaleIn}
          className="relative mt-14 overflow-hidden rounded-2xl border border-line"
        >
          <div className="relative aspect-[16/11] w-full sm:aspect-[16/9]">
            <Image
              src="/images/coaches-banner.webp"
              alt="Stepan Dubrovskiy and Stephanie Snider, professional figure skating coaches, at Sharks Ice"
              fill
              sizes="100vw"
              className="object-cover object-[50%_22%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ice-black/70 via-transparent to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
          className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2"
        >
          {coaches.map((coach) => (
            <motion.article
              key={coach.id}
              variants={staggerItem}
              className="group relative overflow-hidden bg-ice-navy"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={coach.photo}
                  alt={coach.photoAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ice-navy via-ice-navy/10 to-transparent" />
              </div>

              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-semibold tracking-tight text-ice-white">
                  {coach.name}
                </h3>
                <p className="mt-1 font-serif text-base italic text-crystal">
                  {coach.specialty}
                </p>
                <p className="mt-5 text-base leading-relaxed text-ice-white-dim">
                  {coach.bio}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {coach.specialties.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line px-3 py-1 text-xs uppercase tracking-wide text-ice-white-dim"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/coaches/${coach.id}`}
                  className="skate-line mt-8 inline-flex items-center gap-1.5 text-sm font-medium uppercase tracking-wide text-ice-white transition-colors hover:text-crystal"
                >
                  Full Biography
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mt-8"
        >
          <p className="max-w-lg font-serif text-lg italic text-ice-white md:text-xl">
            Gallery
          </p>

          <div className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {competitionGallery.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-[3/4] w-[72vw] max-w-[320px] flex-none snap-start overflow-hidden rounded-2xl border border-line sm:w-[320px]"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 640px) 320px, 72vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
