"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/siteConfig";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass border-b border-line py-3" : "bg-transparent py-6"
      )}
    >
      <Container className="flex items-center justify-between">
        <a
          href="#top"
          className="font-serif text-lg italic tracking-wide text-ice-white"
          aria-label={`${siteConfig.name} — home`}
        >
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Primary">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="skate-line text-sm font-medium uppercase tracking-wide text-ice-white-dim transition-colors hover:text-ice-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#register"
          className="hidden rounded-full border border-line px-6 py-2.5 text-sm font-medium uppercase tracking-wide text-ice-white transition-colors hover:border-crystal hover:text-crystal md:inline-flex"
        >
          {siteConfig.cta.nav}
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full p-2 text-ice-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden glass border-t border-line md:hidden"
          >
            <Container className="flex flex-col gap-1 py-6">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-lg font-medium text-ice-white-dim transition-colors hover:text-ice-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#register"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-ice-white px-6 py-3.5 text-sm font-medium uppercase tracking-wide text-ice-black"
              >
                {siteConfig.cta.nav}
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
