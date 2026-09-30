import type { Metadata } from "next";
import { PageHeading } from "@/components/PageHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { carregarMetricas, metricas, PERIODO } from "@/lib/metricas";

export const metadata: Metadata = {
  title: "Métricas",
  description: "Painel interno de métricas do portfólio.",
  robots: { index: false, follow: false },
};

export default async function MetricasPage() {
  const valores = await carregarMetricas();

  return (
    <div className="container metricas">
      <PageHeading
        eyebrow="Painel interno"
        lines={["O que dá", "para medir daqui."]}
        description={`Cada número abaixo tem um significado exato. Período: ${PERIODO}.`}
      />

      {!valores && (
        <Reveal variant="up">
          <div className="metricas-aviso" role="status">
            <strong>Aguardando integração</strong>
            <p>
              Nenhuma fonte de dados está conectada, então o painel não exibe
              números. Preferimos a lacuna a um número inventado.
            </p>
            <p className="metricas-falta">
              Para ligar, faltam três coisas: ativar o Web Analytics no projeto
              da Vercel, instalar o pacote de coleta e apontar
              <code> carregarMetricas()</code> para a API — o ponto de
              instrumentação já existe em <code>src/lib/metricas.ts</code>.
            </p>
          </div>
        </Reveal>
      )}

      <Stagger className="metricas-grade" stagger={0.07}>
        {metricas.map((m) => (
          <StaggerItem className="metricas-item" key={m.id} variant="up">
            <h2>{m.titulo}</h2>
            <p className="metricas-valor" aria-label="Sem dados">
              {valores?.[m.id] ?? "—"}
            </p>
            <p className="metricas-significado">{m.significado}</p>
            {m.limite && <p className="metricas-limite">{m.limite}</p>}
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
