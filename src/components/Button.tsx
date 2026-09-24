"use client";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePointerVars } from "@/lib/pointer";
import { Magnetic } from "./Magnetic";

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
  /** Link externo na mesma aba (permite voltar pelo histórico). */
  sameTab?: boolean;
  /** Hover magnético (desktop). Desligue em botões dentro de áreas densas. */
  magnetic?: boolean;
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
  sameTab = false,
  magnetic = true,
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
  // Na mesma aba mantemos o Referer: é assim que o site do cliente sabe que
  // o visitante veio do portfólio e pode oferecer o retorno pelo histórico.
  const button = external ? (
    <a
      className={classes}
      href={href}
      target={sameTab ? undefined : "_blank"}
      rel={sameTab ? undefined : "noopener noreferrer"}
      onPointerMove={onPointerMove}
    >
      {content}
    </a>
  ) : (
    <Link className={classes} href={href} onPointerMove={onPointerMove}>
      {content}
    </Link>
  );

  // O magnético vale para a linguagem de botão do site; o `text` é um link.
  if (!magnetic || resolved === "text") return button;
  return <Magnetic strength={secondary ? 0.12 : 0.18}>{button}</Magnetic>;
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
