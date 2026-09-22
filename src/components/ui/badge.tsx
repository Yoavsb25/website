import { cn } from "@/lib/cn";

export function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "bg-surface text-muted inline-flex items-center rounded-sm px-2 py-0.5 font-mono text-xs tracking-wide",
        className,
      )}
    >
      {children}
    </span>
  );
}
