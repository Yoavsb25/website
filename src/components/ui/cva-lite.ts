import { clsx } from "clsx";

type ClassValue = string | false | null | undefined;

type Config<V extends Record<string, Record<string, string>>> = {
  variants?: V;
  defaultVariants?: { [K in keyof V]?: keyof V[K] & string };
};

export type VariantProps<V extends Record<string, Record<string, string>>> = {
  [K in keyof V]?: keyof V[K] & string;
};

/** Minimal class-variance helper to avoid an extra dependency. */
export function cva<V extends Record<string, Record<string, string>>>(
  base: string,
  config: Config<V> = {},
) {
  return (props?: VariantProps<V> & { className?: string }) => {
    const classes: ClassValue[] = [base];
    const variants = config.variants ?? ({} as V);
    for (const key of Object.keys(variants) as (keyof V & string)[]) {
      const value = (props?.[key] as string | undefined) ?? config.defaultVariants?.[key];
      if (value && variants[key]?.[value]) {
        classes.push(variants[key][value]);
      }
    }
    classes.push(props?.className);
    return clsx(classes);
  };
}
