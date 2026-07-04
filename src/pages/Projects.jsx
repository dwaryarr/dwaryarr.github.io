import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import SEO from "../components/common/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/ui/ScrollReveal";
import ProjectCard from "../components/projects/ProjectCard";
import { useTranslation } from "../i18n/I18nProvider";
import projects from "../data/projects.json";
import { cn } from "../lib/utils";

export default function Projects() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.category))],
    [projects],
  );

  const filtered = projects.filter((p) => {
    const matchesQuery =
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.summary.toLowerCase().includes(query.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = category === "All" || p.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <>
      <SEO title="Projects" description="A collection of things I've built." />
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Work"
            title={t("projects.title")}
            subtitle={t("projects.subtitle")}
          />

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="glass flex items-center gap-2 rounded-xl px-4 py-2.5 sm:w-80">
              <Search size={16} className="text-white/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("projects.search")}
                className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                    category === c
                      ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]"
                      : "border-white/10 bg-white/5 text-white/60 hover:text-white",
                  )}>
                  {c === "All" ? t("projects.all") : c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <ScrollReveal key={p.id} delay={(i % 3) * 0.06}>
                <ProjectCard project={p} />
              </ScrollReveal>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-16 text-center text-white/40">
              No projects match your search.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
