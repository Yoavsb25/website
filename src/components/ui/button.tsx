import { cva, type VariantProps } from "./cva-lite";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-fg hover:opacity-90",
        secondary: "bg-surface text-fg hover:bg-surface-2",
        ghost: "text-fg hover:bg-surface",
        link: "text-accent underline-offset-4 hover:underline px-0",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonVariantProps = VariantProps<{
  variant: {
    primary: string;
    secondary: string;
    ghost: string;
    link: string;
  };
  size: {
    sm: string;
    md: string;
    lg: string;
  };
}>;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonVariantProps;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
