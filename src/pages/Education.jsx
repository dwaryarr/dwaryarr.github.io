import { GraduationCap } from "lucide-react";
import SEO from "../components/common/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/ui/ScrollReveal";
import { useTranslation } from "../i18n/I18nProvider";
import education from "../data/education.json";
import { formatDate } from "../lib/utils";

export default function Education() {
  const { t } = useTranslation();
  const education = education;

  return (
    <>
      <SEO title="Education" description="My academic background." />
      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="Academics" title={t("education.title")} />
          <div className="mt-10 space-y-6">
            {education.map((edu, i) => (
              <ScrollReveal key={edu.id} delay={i * 0.08}>
                <div className="glass-card flex items-start gap-4 rounded-2xl p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                    <GraduationCap size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-white/50">{edu.institution}</p>
                    <p className="mt-1 text-xs text-white/40">
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}{" "}
                      {edu.gpa && `· GPA ${edu.gpa}`}
                    </p>
                    <p className="mt-3 text-sm text-white/60">
                      {edu.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
