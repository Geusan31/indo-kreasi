export interface Game {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'Action & RPG' | 'Platformer & Obby' | 'Simulator & Tycoon' | 'Mystery & Survival' | 'Racing & Arcade' | 'Action & Arena';
  status: 'In Development' | 'Beta Testing' | 'Live Prototype' | 'Playtesting' | 'Concept & Prototyping';
  platforms: string[];
  description: string;
  longDescription: string;
  keyFeatures: string[];
  techStack: string[];
  targetRelease: string;
  heroImage: string;
  galleryImages: {
    title: string;
    description: string;
    type: 'gameplay' | 'environment' | 'character' | 'mechanic';
  }[];
  featured: boolean;
  playerMode: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  deliverables: string[];
  technologies: string[];
  processSummary: string;
}

export interface StudioValue {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export interface WorkflowStep {
  step: number;
  title: string;
  phase: string;
  description: string;
  deliverables: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}
