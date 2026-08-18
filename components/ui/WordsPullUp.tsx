"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export function WordsPullUp({
  text,
  className,
  delayOffset = 0,
  wordDelay = 0.08,
}: {
  text: string;
  className?: string;
  delayOffset?: number;
  wordDelay?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px -5% 0px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={cn("inline-flex flex-wrap", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.7,
            delay: delayOffset + i * wordDelay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          style={{ marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
