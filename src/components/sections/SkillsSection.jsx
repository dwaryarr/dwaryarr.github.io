import SectionHeading from "../ui/SectionHeading";
import ScrollReveal from "../ui/ScrollReveal";
import AnimatedProgressBar from "../ui/AnimatedProgressBar";
import { useTranslation } from "../../i18n/I18nProvider";
import skills from "../../data/skills.json";

export default function SkillsSection({ compact = false }) {
  const { t } = useTranslation();
  const groups = skills;

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Capabilities"
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
          center={compact}
        />
        <div
          className={`mt-10 grid gap-6 ${compact ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          {groups.map((group, i) => (
            <ScrollReveal key={group.category} delay={i * 0.1}>
              <div className="glass-card h-full rounded-2xl p-6">
                <h3 className="mb-5 font-display text-lg font-semibold text-white">
                  {group.category}
                </h3>
                <div className="space-y-4">
                  {group.items.map((item) => (
                    <AnimatedProgressBar
                      key={item.name}
                      label={item.name}
                      level={item.level}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
