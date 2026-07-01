import { createStore } from './localStore';

import profileSeed from '../data/profile.json';
import projectsSeed from '../data/projects.json';
import skillsSeed from '../data/skills.json';
import experienceSeed from '../data/experience.json';
import educationSeed from '../data/education.json';
import certificatesSeed from '../data/certificates.json';
import socialsSeed from '../data/socials.json';
import timelineSeed from '../data/timeline.json';
import blogsSeed from '../data/blogs.json';

export const profileStore = createStore('profile', profileSeed);
export const projectsStore = createStore('projects', projectsSeed);
export const skillsStore = createStore('skills', skillsSeed);
export const experienceStore = createStore('experience', experienceSeed);
export const educationStore = createStore('education', educationSeed);
export const certificatesStore = createStore('certificates', certificatesSeed);
export const socialsStore = createStore('socials', socialsSeed);
export const timelineStore = createStore('timeline', timelineSeed);
export const blogsStore = createStore('blogs', blogsSeed);

export const allStores = {
  profile: profileStore,
  projects: projectsStore,
  skills: skillsStore,
  experience: experienceStore,
  education: educationStore,
  certificates: certificatesStore,
  socials: socialsStore,
  timeline: timelineStore,
  blogs: blogsStore,
};
