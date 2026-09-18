"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import type { Project } from "@/types/project";
export function Gallery({ images }: { images: Project["gallery"] }) {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const el = dialog.current;
    const close = () => {
      trigger.current?.focus();
    };
    el?.addEventListener("close", close);
    return () => {
      el?.removeEventListener("close", close);
    };
  }, []);
  function open(i: number, button: HTMLButtonElement) {
    setActive(i);
    trigger.current = button;
    dialog.current?.showModal();
  }
  const current = images[active];
  return (
    <>
      <div className="gallery-grid">
        {images.map((img, i) => (
          <button
            key={img.src}
            className={img.height > img.width ? "gallery-mobile" : ""}
            onClick={(e) => open(i, e.currentTarget)}
            aria-label={`Ampliar: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes="(max-width:767px) 100vw, 50vw"
            />
            <span>
              <Expand size={18} />
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Galeria ampliada"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setActive((active + 1) % images.length);
          if (e.key === "ArrowLeft")
            setActive((active - 1 + images.length) % images.length);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="lightbox-inner">
          <button
            className="lightbox-close"
            aria-label="Fechar imagem"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
          {current && (
            <Image
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="95vw"
            />
          )}
          <div className="lightbox-caption">
            <button
              aria-label="Imagem anterior"
              onClick={() =>
                setActive((active - 1 + images.length) % images.length)
              }
            >
              <ChevronLeft />
            </button>
            <p aria-live="polite">
              {active + 1} / {images.length} — {current?.alt}
            </p>
            <button
              aria-label="Próxima imagem"
              onClick={() => setActive((active + 1) % images.length)}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
