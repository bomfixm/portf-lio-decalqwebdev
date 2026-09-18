"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePointerVars } from "@/lib/pointer";

type Variant = "primary" | "secondary" | "text";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  /** Atalho legado: `secondary` equivale a variant="secondary". */
  secondary?: boolean;
  variant?: Variant;
  large?: boolean;
  icon?: boolean;
  className?: string;
  external?: boolean;
}

/**
 * Sistema de botões: primary (gradiente + luz que segue o cursor + sweep),
 * secondary (glass) e text (link com sublinhado animado).
 */
export function Button({
  href,
  children,
  secondary = false,
  variant,
  large = false,
  icon = true,
  className = "",
  external = false,
}: ButtonProps) {
  const onPointerMove = usePointerVars<HTMLAnchorElement>();
  const resolved: Variant = variant ?? (secondary ? "secondary" : "primary");
  const classes = [
    resolved === "text" ? "text-link" : "button",
    resolved === "secondary" && "secondary",
    large && "large",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const content = (
    <>
      <span className="button-label">{children}</span>
      {icon && <ArrowUpRight size={large ? 18 : 17} aria-hidden="true" />}
    </>
  );
  if (external) {
    return (
      <a
        className={classes}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={onPointerMove}
      >
        {content}
      </a>
    );
  }
  return (
    <Link className={classes} href={href} onPointerMove={onPointerMove}>
      {content}
    </Link>
  );
}

export const PrimaryButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="primary" />
);
export const SecondaryButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="secondary" />
);
export const TextButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="text" />
);
