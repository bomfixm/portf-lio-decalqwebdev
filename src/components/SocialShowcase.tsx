import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check, Play } from "lucide-react";
import { socialMedia } from "@/data/services";
import { siteConfig } from "@/config/site";
import { Reveal, Stagger, StaggerItem } from "./Motion";

/**
 * Vitrine do serviço de social media. As peças são composições abstratas
 * montadas em CSS — nenhuma imagem de cliente, nenhum número inventado — e o
 * aviso de conceito fica visível junto delas.
 */
export function SocialShowcase() {
  return (
    <section className="social container" id="social-media" data-tone="social">
      <div className="social-grid">
        <div className="social-copy">
          <Reveal variant="up">
            <div className="eyebrow">{socialMedia.eyebrow}</div>
            <h2>
              {socialMedia.title}{" "}
              <span className="gradient-text">{socialMedia.highlight}</span>
            </h2>
            <p>{socialMedia.description}</p>
          </Reveal>
          <Stagger as="ul" className="social-list" stagger={0.07} delay={0.1}>
            {socialMedia.deliverables.map((item) => (
              <StaggerItem as="li" key={item} variant="left">
                <Check size={15} aria-hidden="true" />
                {item}
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal variant="fade" delay={0.2}>
            <Link
              href="/contato?tipo=Social%20Media"
              className="service-link social-cta"
            >
              Pedir um orçamento de social media <ArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>

        <Reveal variant="right" className="social-stage" amount={0.25}>
          <div className="social-pieces" aria-hidden="true">
            <figure className="peca vertical">
              <span className="peca-ratio">9:16</span>
              <div className="peca-topo">
                <Image
                  src={siteConfig.logo || "/brand/logo.png"}
                  alt=""
                  width={239}
                  height={160}
                />
                <i />
              </div>
              <span className="peca-play">
                <Play size={16} fill="currentColor" strokeWidth={0} />
              </span>
              <div className="peca-legenda">
                <i />
                <i />
              </div>
              <div className="peca-progresso">
                <i />
              </div>
            </figure>

            <figure className="peca carrossel">
              <span className="peca-ratio">4:5</span>
              <div className="peca-paginas">
                <i />
                <i />
                <i />
              </div>
              <div className="peca-texto">
                <i />
                <i />
              </div>
              <div className="peca-pontos">
                <i className="on" />
                <i />
                <i />
              </div>
            </figure>

            <figure className="peca post">
              <span className="peca-ratio">1:1</span>
              <div className="peca-marca">
                <Image
                  src={siteConfig.logo || "/brand/logo.png"}
                  alt=""
                  width={239}
                  height={160}
                />
              </div>
              <div className="peca-texto">
                <i />
                <i />
              </div>
            </figure>
          </div>
        </Reveal>
      </div>

      <Stagger as="ul" className="social-formats" stagger={0.08}>
        {socialMedia.formats.map((f) => (
          <StaggerItem as="li" key={f.id} className="social-format">
            <span className="social-format-top">
              <strong>{f.label}</strong>
              <span className="social-format-ratio">{f.ratio}</span>
            </span>
            <p>{f.description}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal variant="fade">
        <p className="social-note">{socialMedia.disclaimer}</p>
      </Reveal>
    </section>
  );
}
