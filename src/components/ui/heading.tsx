import { cn } from "@/lib/cn";

export function Heading({
  as: Comp = "h2",
  className,
  children,
  id,
}: {
  as?: "h1" | "h2" | "h3";
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const styles = {
    h1: "font-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-7xl",
    h2: "font-display text-3xl leading-tight tracking-[-0.02em] sm:text-4xl",
    h3: "font-display text-xl leading-snug sm:text-2xl",
  } as const;

  return (
    <Comp id={id} className={cn(styles[Comp], className)}>
      {children}
    </Comp>
  );
}
