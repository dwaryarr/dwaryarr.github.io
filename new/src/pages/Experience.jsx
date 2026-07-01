import { Briefcase } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/ui/SectionHeading';
import ScrollReveal from '../components/ui/ScrollReveal';
import { useTranslation } from '../i18n/I18nProvider';
import { experienceStore } from '../lib/stores';
import { formatDate } from '../lib/utils';

export default function Experience() {
  const { t, lang } = useTranslation();
  const experience = experienceStore.getAll();

  return (
    <>
      <SEO title="Experience" description="My professional work history." />
      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="Career" title={t('experience.title')} subtitle={t('experience.subtitle')} />

          <div className="mt-10 space-y-6">
            {experience.map((exp, i) => (
              <ScrollReveal key={exp.id} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                        <Briefcase size={18} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-white">{exp.role}</h3>
                        <p className="text-sm text-white/50">{exp.company} · {exp.location}</p>
                      </div>
                    </div>
                    <span className="badge">
                      {formatDate(exp.startDate, lang === 'id' ? 'id-ID' : 'en-US')} — {exp.endDate === 'Present' ? 'Present' : formatDate(exp.endDate, lang === 'id' ? 'id-ID' : 'en-US')}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-white/60">{exp.description}</p>
                  {exp.achievements?.length > 0 && (
                    <ul className="mt-4 space-y-2">
                      {exp.achievements.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-sm text-white/70">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
