import { Link } from "react-router-dom";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { useMemo } from "react";
import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";
import { useTranslation } from "../../i18n/I18nProvider";
import projectsData from "../../data/projects.json";

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const projects = useMemo(() => {
    const filtered = projectsData.filter((p) => p.featured);
    return filtered.sort((a, b) => {
      // try numeric id first, fallback to createdAt date or string comparison
      const ai = Number(a.id);
      const bi = Number(b.id);
      if (!Number.isNaN(ai) && !Number.isNaN(bi)) return bi - ai;
      if (a.createdAt && b.createdAt)
        return new Date(b.createdAt) - new Date(a.createdAt);
      return String(b.id).localeCompare(String(a.id));
    });
  }, [projectsData]);

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Portfolio"
            title={t("projects.title")}
            subtitle={t("projects.subtitle")}
          />
          <Link
            to="/projects"
            className="hidden shrink-0 items-center gap-1.5 text-sm text-white/60 hover:text-white sm:flex">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.08}>
              <div className="glass-card group h-full overflow-hidden rounded-2xl p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="badge">{p.category}</span>
                  <span className="badge">{p.status}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-white/50">{p.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="badge text-[11px]">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-3">
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline">
                      <ExternalLink size={14} /> {t("projects.liveDemo")}
                    </a>
                  )}
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white">
                      <Github size={14} /> {t("projects.sourceCode")}
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
