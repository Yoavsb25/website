"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="flex min-h-[50vh] flex-col justify-center">
      <Heading as="h1">Something went wrong</Heading>
      <p className="text-muted mt-4">An unexpected error occurred while rendering this page.</p>
      <Button className="mt-8 w-fit" onClick={reset}>
        Try again
      </Button>
    </Section>
  );
}
