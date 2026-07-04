import { FileText, ExternalLink, Award } from "lucide-react";
import SEO from "../components/common/SEO";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/ui/ScrollReveal";
import { useTranslation } from "../i18n/I18nProvider";
import certificates from "../data/certificates.json";
import { formatDate } from "../lib/utils";

export default function Certificates() {
  const { t } = useTranslation();
  const certificates = certificates;

  return (
    <>
      <SEO
        title="Certificates"
        description="Professional certifications I've earned."
      />
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Credentials"
            title={t("certificates.title")}
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, i) => (
              <ScrollReveal key={cert.id} delay={(i % 3) * 0.08}>
                <div className="glass-card flex h-full flex-col overflow-hidden rounded-2xl">
                  <div className="flex aspect-[4/3] items-center justify-center bg-white/5">
                    {cert.image ? (
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <Award size={36} className="text-white/20" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base font-semibold text-white">
                      {cert.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/50">{cert.issuer}</p>
                    <p className="mt-1 text-xs text-white/30">
                      {formatDate(cert.date)}
                    </p>
                    <div className="mt-4 flex flex-1 items-end gap-3">
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm text-[var(--accent)] hover:underline">
                          <ExternalLink size={14} />{" "}
                          {t("certificates.viewCredential")}
                        </a>
                      )}
                      {cert.pdfUrl && (
                        <a
                          href={cert.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm text-white/60 hover:text-white">
                          <FileText size={14} /> PDF
                        </a>
                      )}
                    </div>
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
