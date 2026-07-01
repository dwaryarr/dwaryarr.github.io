import { MapPin, Mail, Briefcase, Languages } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/ui/SectionHeading';
import ScrollReveal from '../components/ui/ScrollReveal';
import { useTranslation } from '../i18n/I18nProvider';
import { profileStore } from '../lib/stores';

export default function About() {
  const { t } = useTranslation();
  const profile = profileStore.getAll();

  const facts = [
    { icon: MapPin, label: 'Location', value: profile.location },
    { icon: Mail, label: 'Email', value: profile.email },
    { icon: Briefcase, label: 'Experience', value: `${profile.yearsOfExperience}+ years` },
    { icon: Languages, label: 'Languages', value: profile.languages?.join(', ') },
  ];

  return (
    <>
      <SEO title="About" description={profile.bio} />
      <section className="section-padding">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Profile" title={t('about.title')} />

          <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr]">
            <ScrollReveal>
              <div className="glass-card overflow-hidden rounded-2xl p-2">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="aspect-square w-full rounded-xl object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-lg leading-relaxed text-white/70">{profile.bio}</p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.label} className="glass-card flex items-center gap-3 rounded-xl p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
                      <f.icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">{f.label}</p>
                      <p className="text-sm text-white/90">{f.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
