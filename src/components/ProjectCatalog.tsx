"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { projects } from "@/data/projects";
import { categories } from "@/types/project";
import { ProjectCard } from "./ProjectCard";
import { EASE, Reveal, useReducedMotion } from "./Motion";

const normalize = (v: string) =>
  v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export function ProjectCatalog() {
  const [category, setCategory] = useState<string>("Todos");
  const [query, setQuery] = useState("");
  const reduced = useReducedMotion();
  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (category === "Todos" ||
            p.category === category ||
            p.tags.some((t) => t === category)) &&
          normalize([p.title, p.label, ...p.technologies].join(" ")).includes(
            normalize(query.trim()),
          ),
      ),
    [category, query],
  );
  return (
    <>
      <Reveal variant="up" delay={0.5}>
        <div className="catalog-controls">
          <div className="search-field">
            <Search size={18} />
            <input
              aria-label="Pesquisar projetos por nome ou tecnologia"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nome ou tecnologia..."
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Limpar busca">
                <X size={17} />
              </button>
            )}
          </div>
          <div className="filter-list" aria-label="Filtrar por categoria">
            {categories.map((c) => (
              <button
                key={c}
                aria-pressed={c === category}
                className={c === category ? "selected" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="catalog-count" role="status">
        {filtered.length}{" "}
        {filtered.length === 1 ? "projeto encontrado" : "projetos encontrados"}
        {filtered.some((p) => p.demo) && (
          <span>Inclui projetos demonstrativos</span>
        )}
      </div>
      {filtered.length ? (
        <motion.div className="project-grid catalog-grid" layout={!reduced}>
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  transition: { duration: 0.2 },
                }}
                transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
              >
                <ProjectCard project={p} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          className="empty-state"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <Search size={30} />
          <h2>Nenhum projeto por aqui.</h2>
          <p>Tente outro termo ou explore todas as categorias.</p>
          <button
            className="button secondary"
            onClick={() => {
              setCategory("Todos");
              setQuery("");
            }}
          >
            Limpar filtros
          </button>
        </motion.div>
      )}
    </>
  );
}
