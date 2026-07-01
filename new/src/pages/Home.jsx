import SEO from '../components/common/SEO';
import Hero from '../components/sections/Hero';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import SkillsSection from '../components/sections/SkillsSection';
import TechStackSection from '../components/sections/TechStackSection';
import { profileStore } from '../lib/stores';

export default function Home() {
  const profile = profileStore.getAll();
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
