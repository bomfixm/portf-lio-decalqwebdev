"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, CheckCircle2, LoaderCircle } from "lucide-react";
import {
  projectTypes,
  validateContact,
  submitContact,
  type ContactData,
  type ContactErrors,
} from "@/lib/contact";
import { siteConfig } from "@/config/site";
import { usePointerVars } from "@/lib/pointer";
const initial: ContactData = {
  name: "",
  company: "",
  email: "",
  whatsapp: "",
  projectType: "",
  message: "",
};
export function ContactForm() {
  const params = useSearchParams();
  const type = params.get("tipo");
  const [data, setData] = useState<ContactData>({
    ...initial,
    projectType: type && projectTypes.some((t) => t === type) ? type : "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const onPointerMove = usePointerVars<HTMLButtonElement>();
  const [status, setStatus] = useState<
    "idle" | "loading" | "demo" | "sent" | "error"
  >("idle");
  function update(key: keyof ContactData, value: string) {
    setData({ ...data, [key]: value });
    setErrors({ ...errors, [key]: undefined });
    if (status !== "loading") setStatus("idle");
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validateContact(data);
    setErrors(validation);
    if (Object.keys(validation).length) {
      document.getElementById(Object.keys(validation)[0])?.focus();
      return;
    }
    setStatus("loading");
    try {
      const result = await submitContact(data);
      setStatus(result.mode);
      if (result.mode === "sent") setData(initial);
    } catch {
      setStatus("error");
    }
  }
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        {[
          {
            key: "name",
            label: "Nome",
            type: "text",
            auto: "name",
            placeholder: "Como podemos chamar você?",
          },
          {
            key: "company",
            label: "Empresa",
            type: "text",
            auto: "organization",
            placeholder: "Nome da sua empresa (opcional)",
          },
          {
            key: "email",
            label: "E-mail",
            type: "email",
            auto: "email",
            placeholder: "voce@empresa.com",
          },
          {
            key: "whatsapp",
            label: "WhatsApp (opcional)",
            type: "tel",
            auto: "tel",
            placeholder: "(00) 00000-0000",
          },
        ].map((f) => {
          const key = f.key as keyof ContactData;
          return (
            <div className="form-field" key={key}>
              <label htmlFor={key}>
                {f.label}
                {["name", "email"].includes(key) && <span> *</span>}
              </label>
              <input
                id={key}
                name={key}
                type={f.type}
                autoComplete={f.auto}
                value={data[key]}
                onChange={(e) => update(key, e.target.value)}
                placeholder={f.placeholder}
                maxLength={key === "whatsapp" ? 22 : 150}
                required={["name", "email"].includes(key)}
                aria-invalid={!!errors[key]}
                aria-describedby={errors[key] ? `${key}-error` : undefined}
              />
              {errors[key] && (
                <span className="field-error" id={`${key}-error`}>
                  {errors[key]}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div className="form-field">
        <label htmlFor="projectType">
          Tipo de projeto <span>*</span>
        </label>
        <select
          id="projectType"
          value={data.projectType}
          onChange={(e) => update("projectType", e.target.value)}
          required
          aria-invalid={!!errors.projectType}
          aria-describedby={
            errors.projectType ? "projectType-error" : undefined
          }
        >
          <option value="">Selecione uma opção</option>
          {projectTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        {errors.projectType && (
          <span className="field-error" id="projectType-error">
            {errors.projectType}
          </span>
        )}
      </div>
      <div className="form-field">
        <label htmlFor="message">
          Conte sobre sua ideia <span>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          maxLength={5000}
          required
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="O que você gostaria de construir ou simplificar?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : "message-help"}
        />
        <div className="field-help" id="message-help">
          Pelo menos 20 caracteres. <span>{data.message.length}/5000</span>
        </div>
        {errors.message && (
          <span className="field-error" id="message-error">
            {errors.message}
          </span>
        )}
      </div>
      {!siteConfig.contactEndpoint && (
        <p className="form-note">
          Formulário demonstrativo. Nenhuma mensagem será enviada ou armazenada
          nesta versão.
        </p>
      )}
      <button
        className="button"
        type="submit"
        disabled={status === "loading"}
        onPointerMove={onPointerMove}
      >
        <span className="button-label">
          {status === "loading" ? "Enviando..." : "Enviar mensagem"}
        </span>
        {status === "loading" ? (
          <LoaderCircle className="spin" size={18} />
        ) : (
          <ArrowUpRight size={18} />
        )}
      </button>
      <div aria-live="polite">
        {(status === "demo" || status === "sent") && (
          <div className="form-feedback">
            <CheckCircle2 size={20} />
            <p>
              {status === "demo"
                ? "Validação concluída. Esta é uma demonstração: sua mensagem não foi enviada nem armazenada."
                : "Mensagem enviada. Obrigado por compartilhar sua ideia!"}
            </p>
          </div>
        )}
      </div>
      {status === "error" && (
        <p className="form-error" role="alert">
          Não foi possível enviar a mensagem. Seus dados continuam no formulário
          para você tentar novamente.
        </p>
      )}
    </form>
  );
}
