import { useParams, Link, Navigate } from "react-router-dom";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import SEO from "../components/common/SEO";
import ScrollReveal from "../components/ui/ScrollReveal";
import { useTranslation } from "../i18n/I18nProvider";
import projects from "../data/projects.json";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <>
      <SEO
        title={project.title}
        description={project.summary}
        image={project.gallery?.[0]}
      />
      <article className="section-padding">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/projects"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white">
            <ArrowLeft size={14} /> Back to projects
          </Link>

          <ScrollReveal>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="badge">{project.category}</span>
              <span className="badge">{project.status}</span>
            </div>
            <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-white/60">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary">
                  <ExternalLink size={16} /> {t("projects.liveDemo")}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary">
                  <Github size={16} /> {t("projects.sourceCode")}
                </a>
              )}
            </div>
          </ScrollReveal>

          {project.gallery?.length > 0 && (
            <ScrollReveal
              delay={0.1}
              className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((img) => (
                <div
                  key={img}
                  className="glass-card overflow-hidden rounded-2xl">
                  <img
                    src={img}
                    alt={project.title}
                    className="aspect-video w-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.opacity = 0;
                    }}
                  />
                </div>
              ))}
            </ScrollReveal>
          )}

          <ScrollReveal delay={0.15} className="mt-10 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span key={tech} className="badge">
                {tech}
              </span>
            ))}
          </ScrollReveal>

          {project.caseStudy && (
            <ScrollReveal
              delay={0.2}
              className="mt-12 grid gap-6 sm:grid-cols-3">
              <CaseBlock
                title={t("projects.challenges")}
                text={project.caseStudy.challenges}
              />
              <CaseBlock
                title={t("projects.solutions")}
                text={project.caseStudy.solutions}
              />
              <CaseBlock
                title={t("projects.results")}
                text={project.caseStudy.results}
              />
            </ScrollReveal>
          )}
        </div>
      </article>
    </>
  );
}

function CaseBlock({ title, text }) {
  if (!text) return null;
  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-[var(--accent)]">
        {title}
      </h3>
      <p className="text-sm text-white/60">{text}</p>
    </div>
  );
}
