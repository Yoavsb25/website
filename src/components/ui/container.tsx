import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  as: Comp = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
}) {
  return <Comp className={cn("mx-auto w-full max-w-5xl px-5 sm:px-8", className)}>{children}</Comp>;
}
