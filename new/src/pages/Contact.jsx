import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/ui/SectionHeading';
import ScrollReveal from '../components/ui/ScrollReveal';
import { useTranslation } from '../i18n/I18nProvider';
import { contactSchema } from '../lib/contactSchema';
import { submitContactForm } from '../lib/googleAppsScript';
import { profileStore } from '../lib/stores';

export default function Contact() {
  const { t } = useTranslation();
  const profile = profileStore.getAll();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data) {
    setSubmitting(true);
    try {
      await submitContactForm(data);
      toast.success(t('contact.success'));
      reset();
    } catch (err) {
      toast.error(err.message || t('contact.error'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO title="Contact" description="Get in touch for projects and collaborations." />
      <section className="section-padding">
        <div className="mx-auto max-w-5xl">
          <SectionHeading eyebrow="Say hello" title={t('contact.title')} subtitle={t('contact.subtitle')} />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
            <ScrollReveal className="space-y-4">
              <InfoRow icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
              <InfoRow icon={Phone} label="Phone" value={profile.phone} href={`tel:${profile.phone}`} />
              <InfoRow icon={MapPin} label="Location" value={profile.location} />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <form onSubmit={handleSubmit(onSubmit)} className="glass-card space-y-5 rounded-2xl p-6">
                <Field label={t('contact.name')} error={errors.name?.message}>
                  <input {...register('name')} className="form-input" placeholder="John Doe" />
                </Field>
                <Field label={t('contact.email')} error={errors.email?.message}>
                  <input {...register('email')} type="email" className="form-input" placeholder="john@example.com" />
                </Field>
                <Field label={t('contact.subject')} error={errors.subject?.message}>
                  <input {...register('subject')} className="form-input" placeholder="Project inquiry" />
                </Field>
                <Field label={t('contact.message')} error={errors.message?.message}>
                  <textarea {...register('message')} rows={5} className="form-input resize-none" placeholder="Tell me about your project…" />
                </Field>

                <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
                  {submitting ? t('contact.sending') : (
                    <>
                      {t('contact.send')} <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({ icon: Icon, label, value, href }) {
  const content = (
    <div className="glass-card flex items-center gap-3 rounded-xl p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)]">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xs text-white/40">{label}</p>
        <p className="text-sm text-white/90">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-white/70">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
