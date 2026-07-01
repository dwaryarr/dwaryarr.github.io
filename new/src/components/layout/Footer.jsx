import { Github, Linkedin, Instagram, Facebook, Twitter, Mail, MessageCircle } from 'lucide-react';
import { useTranslation } from '../../i18n/I18nProvider';
import { socialsStore } from '../../lib/stores';

const ICONS = { Github, Linkedin, Instagram, Facebook, Twitter, Mail, MessageCircle };

export default function Footer() {
  const { t } = useTranslation();
  const socials = socialsStore.getAll();

  return (
    <footer className="section-padding border-t border-white/10 pb-10 pt-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {socials.map((s) => {
            const Icon = ICONS[s.icon] || Mail;
            return (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="glass-card flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:text-[var(--accent)] focus-ring"
              >
                <Icon size={16} />
              </a>
            );
          })}
        </div>
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} Your Name. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
