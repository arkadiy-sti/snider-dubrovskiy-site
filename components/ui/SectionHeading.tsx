"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-4 inline-block font-serif text-sm italic tracking-wide text-crystal">
          {eyebrow}
        </span>
      )}
      <h2 className="text-balance text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.05] tracking-tight text-ice-white">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-balance text-lg leading-relaxed text-ice-white-dim">
          {description}
        </p>
      )}
    </motion.div>
  );
}
