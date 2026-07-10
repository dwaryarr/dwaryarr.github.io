import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../i18n/I18nProvider";

export default function ProjectCard({ project }) {
  const { t } = useTranslation();
  return (
    <div className="glass-card group flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="aspect-video w-full overflow-hidden bg-white/5">
        <img
          src={project.gallery?.[0]}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.style.opacity = 0;
          }}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="badge">{project.category}</span>
          <span className="badge">{project.status}</span>
        </div>
        <Link to={`/projects/${project.slug}`}>
          <h3 className="font-display text-lg font-semibold text-white hover:text-[var(--accent)]">
            {project.title}
          </h3>
        </Link>
        <p className="mt-2 flex-1 text-sm text-white/50">{project.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span key={tech} className="badge text-[11px]">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline">
              <ExternalLink size={14} /> {t("projects.liveDemo")}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white">
              <Github size={14} /> {t("projects.sourceCode")}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
