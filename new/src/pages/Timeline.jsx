import { Briefcase, GraduationCap, Award, Rocket } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/ui/SectionHeading';
import ScrollReveal from '../components/ui/ScrollReveal';
import { useTranslation } from '../i18n/I18nProvider';
import { timelineStore } from '../lib/stores';
import { formatDate } from '../lib/utils';

const ICONS = { work: Briefcase, education: GraduationCap, certificate: Award, project: Rocket };

export default function Timeline() {
  const { t } = useTranslation();
  const events = [...timelineStore.getAll()].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <SEO title="Timeline" description="My career timeline." />
      <section className="section-padding">
        <div className="mx-auto max-w-3xl">
          <SectionHeading eyebrow="Journey" title={t('timeline.title')} center />

          <div className="relative mt-14 ml-4 border-l border-white/10 sm:ml-6">
            {events.map((ev, i) => {
              const Icon = ICONS[ev.type] || Rocket;
              return (
                <ScrollReveal key={ev.id} delay={i * 0.06} className="relative mb-10 pl-8 last:mb-0">
                  <span className="absolute -left-[21px] flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-ink-900 text-[var(--accent)] shadow-glow-sm">
                    <Icon size={16} />
                  </span>
                  <div className="glass-card rounded-2xl p-5">
                    <p className="text-xs font-medium uppercase tracking-wide text-[var(--accent)]">{formatDate(ev.date)}</p>
                    <h3 className="mt-1 font-display text-base font-semibold text-white">{ev.title}</h3>
                    <p className="mt-1.5 text-sm text-white/50">{ev.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
