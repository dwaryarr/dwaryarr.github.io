import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "../../i18n/I18nProvider";
import profile from "../../data/profile.json";

export default function Hero() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    toast.success("Email copied to clipboard");
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section className="section-padding flex min-h-[85vh] flex-col items-center justify-center text-center">
      {profile.available && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="badge mb-6 border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <span className="h-1.5 w-1.5 animate-glow-pulse rounded-full bg-emerald-400" />
          {t("hero.available")}
        </motion.div>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="font-display max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
        {t("hero.greeting")}{" "}
        <span className="text-gradient">{profile.name}</span>
        <br />
        <span className="text-white/60">{profile.title}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 max-w-xl text-balance text-white/50">
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/projects" className="btn-primary">
          {t("hero.cta_projects")} <ArrowRight size={16} />
        </Link>
        <Link to="/contact" className="btn-secondary">
          {t("hero.cta_contact")}
        </Link>
        {profile.resumeUrl && /\.[a-zA-Z0-9]+$/.test(profile.resumeUrl) && (
          <a href={profile.resumeUrl} download className="btn-secondary">
            <Download size={16} /> CV
          </a>
        )}
        <button
          onClick={copyEmail}
          className="btn-secondary"
          aria-label="Copy email">
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </motion.div>
    </section>
  );
}
