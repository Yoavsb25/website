import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";

export function Section({
  id,
  className,
  children,
  ariaLabelledBy,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  ariaLabelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn("scroll-mt-24 py-20 sm:py-28", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
