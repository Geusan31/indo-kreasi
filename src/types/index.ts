// ==============================================================================
// PT Indo Kreasi - Database & Application Types (Supabase Schema)
// ==============================================================================

export type GameStatus = 'draft' | 'published' | 'archived' | 'In Development' | 'Beta Testing' | 'Live Prototype' | 'Playtesting' | 'Concept & Prototyping';
export type InquiryStatus = 'new' | 'read' | 'replied' | 'archived';
export type HomepageSectionKey = 'hero' | 'featured_games' | 'about_preview' | 'services' | 'cta';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: 'admin' | string;
  created_at: string;
  updated_at: string;
}

export interface GameGalleryItem {
  title: string;
  description?: string;
  url?: string;
  type?: 'gameplay' | 'environment' | 'character' | 'mechanic';
}

export interface Game {
  id: string;
  title: string;
  slug: string;
  short_description?: string | null;
  description?: string | null;
  category: string;
  status: GameStatus;
  platform?: string | null;
  platforms?: string[];
  release_date?: string | null;
  cover_image_url?: string | null;
  banner_image_url?: string | null;
  gallery?: GameGalleryItem[];
  galleryImages?: GameGalleryItem[];
  external_url?: string | null;
  featured?: boolean;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
  tagline?: string;
  longDescription?: string;
  keyFeatures?: string[];
  techStack?: string[];
  targetRelease?: string;
  heroImage?: string;
  playerMode?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  short_description?: string | null;
  shortDescription?: string;
  description?: string | null;
  fullDescription?: string;
  icon?: string | null;
  iconName?: string;
  image_url?: string | null;
  deliverables?: string[];
  technologies?: string[];
  processSummary?: string;
  featured?: boolean;
  sort_order?: number;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
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

export interface CompanySocialLinks {
  github?: string;
  discord?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  [key: string]: string | undefined;
}

export interface CompanyInfo {
  id: string;
  company_name: string;
  tagline: string | null;
  description: string | null;
  vision: string | null;
  mission: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  logo_url: string | null;
  about_image_url: string | null;
  social_links: CompanySocialLinks;
  updated_at?: string;
}

export interface HomepageSection {
  id: string;
  section_key: HomepageSectionKey;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  image_url: string | null;
  button_text: string | null;
  button_url: string | null;
  is_visible: boolean;
  sort_order: number;
  updated_at?: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

export interface Media {
  id: string;
  file_name: string;
  file_path: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  alt_text: string | null;
  created_at: string;
}

export interface DashboardStats {
  totalGames: number;
  publishedGames: number;
  draftGames: number;
  totalServices: number;
  newInquiries: number;
  totalInquiries: number;
  recentGames: Game[];
  recentInquiries: Inquiry[];
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
