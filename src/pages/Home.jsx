import SEO from "../components/common/SEO";
import Hero from "../components/sections/Hero";
import FeaturedProjects from "../components/sections/FeaturedProjects";
import SkillsSection from "../components/sections/SkillsSection";
import TechStackSection from "../components/sections/TechStackSection";
import profile from "../data/profile.json";

export default function Home() {
  return (
    <>
      <SEO title="Home" description={profile.tagline} />
      <Hero />
      <FeaturedProjects />
      <SkillsSection compact />
      <TechStackSection />
    </>
  );
}
