"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";
import { profile } from "@content/profile";

export function Hero() {
  const reduce = useReducedMotion();
  const initial = reduce ? false : { opacity: 0, y: 16 };
  const animate = { opacity: 1, y: 0 };
  const transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <Section className="flex min-h-[85vh] flex-col justify-end pt-32 pb-16 sm:pt-40 sm:pb-24">
      <motion.p
        initial={initial}
        animate={animate}
        transition={transition}
        className="text-subtle font-mono text-xs tracking-[0.22em] uppercase"
      >
        {profile.name} · {profile.title}
      </motion.p>
      <motion.div initial={initial} animate={animate} transition={{ ...transition, delay: 0.08 }}>
        <Heading as="h1" className="mt-6 max-w-4xl text-balance">
          {profile.statement}
        </Heading>
      </motion.div>
      <motion.p
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.16 }}
        className="text-muted mt-6 max-w-xl text-lg sm:text-xl"
      >
        {profile.tagline}
      </motion.p>
      <motion.div
        initial={initial}
        animate={animate}
        transition={{ ...transition, delay: 0.24 }}
        className="mt-10 flex flex-wrap gap-3"
      >
        <Link
          href="/#work"
          className={cn(buttonVariants({ variant: "primary", size: "lg" }), "no-underline")}
        >
          View work
        </Link>
        <Link
          href="/#contact"
          className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "no-underline")}
        >
          Get in touch
        </Link>
      </motion.div>
    </Section>
  );
}
