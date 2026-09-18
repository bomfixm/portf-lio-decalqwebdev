"use client";
import { useRef } from "react";
import { ScrollFill, Stagger } from "./Motion";

/** Linha do processo que se preenche conforme o usuário rola. */
export function ProcessTimeline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="process" ref={ref}>
      <div className="process-track" aria-hidden="true">
        <ScrollFill targetRef={ref} className="process-track-fill" />
      </div>
      <Stagger className="process-grid" stagger={0.14}>
        {children}
      </Stagger>
    </div>
  );
}
