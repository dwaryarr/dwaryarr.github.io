import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { useTranslation } from "../../i18n/I18nProvider";
import skills from "../../data/skills.json";

export default function TechStackSection() {
  const { t } = useTranslation();
  const techs = skills.flatMap((g) => g.items.map((i) => i.name));
  const unique = [...new Set(techs)];

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Toolbox" title={t("techstack.title")} center />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {unique.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -6, scale: 1.06 }}
              className="glass-card flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-2xl text-center hover:shadow-glow">
              <span className="font-display text-xl font-bold text-[var(--accent)]">
                {name[0]}
              </span>
              <span className="px-1 text-[11px] text-white/60">{name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
