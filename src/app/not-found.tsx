import { Button } from "@/components/Button";
import { Reveal } from "@/components/Motion";

export default function NotFound() {
  return (
    <div className="container not-found">
      <div className="page-glow" aria-hidden="true" />
      <Reveal variant="blur">
        <span className="eyebrow">404 / Caminho não encontrado</span>
        <h1>
          Parece que você encontrou uma rota que{" "}
          <span className="gradient-text">ainda não desenvolvemos.</span>
        </h1>
        <p>Vamos voltar para um lugar conhecido?</p>
        <Button href="/">Voltar para o início</Button>
      </Reveal>
    </div>
  );
}
