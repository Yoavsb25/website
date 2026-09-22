import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/cn";

export default function NotFound() {
  return (
    <Section className="flex min-h-[70vh] flex-col justify-center">
      <p className="text-subtle font-mono text-xs tracking-[0.2em] uppercase">404</p>
      <Heading as="h1" className="mt-4">
        This page is not on the map.
      </Heading>
      <p className="text-muted mt-4 max-w-md">
        The route you asked for was never exported — or it moved.
      </p>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8 w-fit no-underline")}>
        Back home
      </Link>
    </Section>
  );
}
