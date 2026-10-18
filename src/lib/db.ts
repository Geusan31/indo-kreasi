import { supabase, isSupabaseConfigured } from './supabase';
import {
  Game,
  Service,
  CompanyInfo,
  HomepageSection,
  Inquiry,
  Media,
  GameStatus,
  InquiryStatus,
  DashboardStats,
} from '../types';
import {
  INITIAL_COMPANY_INFO,
  INITIAL_HOMEPAGE_SECTIONS,
  INITIAL_GAMES,
  INITIAL_SERVICES,
  INITIAL_INQUIRIES,
} from './initialData';

// Local storage keys for local fallback
const STORAGE_KEYS = {
  GAMES: 'indokreasi_games',
  SERVICES: 'indokreasi_services',
  COMPANY: 'indokreasi_company',
  HOMEPAGE: 'indokreasi_homepage',
  INQUIRIES: 'indokreasi_inquiries',
  MEDIA: 'indokreasi_media',
};

// Memory cache / Local storage helper
function getLocalItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (err) {
    console.warn(`Error reading localStorage ${key}:`, err);
    return defaultValue;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event for real-time reactivity in app
    window.dispatchEvent(new Event('indokreasi_data_updated'));
  } catch (err) {
    console.warn(`Error writing localStorage ${key}:`, err);
  }
}

// ------------------------------------------------------------------------------
// GAMES
// ------------------------------------------------------------------------------

export async function getGames(options?: {
  status?: GameStatus;
  category?: string;
  search?: string;
  featuredOnly?: boolean;
}): Promise<Game[]> {
  if (isSupabaseConfigured) {
    try {
      let query = supabase
        .from('games')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (options?.status) {
        query = query.eq('status', options.status);
      }
      if (options?.category && options.category !== 'Semua Kategori') {
        query = query.eq('category', options.category);
      }
      if (options?.featuredOnly) {
        query = query.eq('featured', true);
      }
      if (options?.search) {
        query = query.ilike('title', `%${options.search}%`);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as Game[];
      }
      if (error) {
        console.warn('Supabase getGames warning, falling back to local store:', error.message);
      }
    } catch (err) {
      console.warn('Supabase getGames error:', err);
    }
  }

  // Local fallback
  let list = getLocalItem<Game[]>(STORAGE_KEYS.GAMES, INITIAL_GAMES);

  if (options?.status) {
    list = list.filter((g) => g.status === options.status);
  }
  if (options?.category && options.category !== 'Semua Kategori') {
    list = list.filter((g) => g.category === options.category);
  }
  if (options?.featuredOnly) {
    list = list.filter((g) => g.featured);
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        (g.short_description && g.short_description.toLowerCase().includes(q))
    );
  }

  return list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (!error && data) {
        return data as Game;
      }
    } catch (err) {
      console.warn('Supabase getGameBySlug error:', err);
    }
  }

  const list = getLocalItem<Game[]>(STORAGE_KEYS.GAMES, INITIAL_GAMES);
  return list.find((g) => g.slug === slug) || null;
}

export async function getGameById(id: string): Promise<Game | null> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!error && data) {
        return data as Game;
      }
    } catch (err) {
      console.warn('Supabase getGameById error:', err);
    }
  }

  const list = getLocalItem<Game[]>(STORAGE_KEYS.GAMES, INITIAL_GAMES);
  return list.find((g) => g.id === id) || null;
}

export async function createGame(gameData: Partial<Game>): Promise<Game> {
  const newGame: Game = {
    id: gameData.id || `game-${Date.now()}`,
    title: gameData.title || 'Untitled Game',
    slug: gameData.slug || `game-${Date.now()}`,
    short_description: gameData.short_description || null,
    description: gameData.description || null,
    category: gameData.category || 'Action & RPG',
    status: gameData.status || 'published',
    platform: gameData.platform || 'PC',
    release_date: gameData.release_date || new Date().toISOString().split('T')[0],
    cover_image_url: gameData.cover_image_url || null,
    banner_image_url: gameData.banner_image_url || null,
    gallery: gameData.gallery || [],
    external_url: gameData.external_url || null,
    featured: gameData.featured || false,
    sort_order: gameData.sort_order || 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('games').insert(newGame).select().single();
      if (!error && data) {
        // Also update local cache
        const localList = getLocalItem<Game[]>(STORAGE_KEYS.GAMES, INITIAL_GAMES);
        setLocalItem(STORAGE_KEYS.GAMES, [data as Game, ...localList]);
        return data as Game;
      }
      if (error) {
        console.warn('Supabase createGame error, persisting locally:', error.message);
      }
    } catch (err) {
      console.warn('Supabase createGame error:', err);
    }
  }

  const localList = getLocalItem<Game[]>(STORAGE_KEYS.GAMES, INITIAL_GAMES);
  const updated = [newGame, ...localList];
  setLocalItem(STORAGE_KEYS.GAMES, updated);
  return newGame;
}

export async function updateGame(id: string, updates: Partial<Game>): Promise<Game> {
  const updatedFields = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('games')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const localList = getLocalItem<Game[]>(STORAGE_KEYS.GAMES, INITIAL_GAMES);
        setLocalItem(
          STORAGE_KEYS.GAMES,
          localList.map((g) => (g.id === id ? (data as Game) : g))
        );
        return data as Game;
      }
      if (error) {
        console.warn('Supabase updateGame warning:', error.message);
      }
    } catch (err) {
      console.warn('Supabase updateGame error:', err);
    }
  }

  const localList = getLocalItem<Game[]>(STORAGE_KEYS.GAMES, INITIAL_GAMES);
  const index = localList.findIndex((g) => g.id === id);
  if (index === -1) {
    throw new Error('Game not found');
  }

  const merged: Game = { ...localList[index], ...updatedFields };
  localList[index] = merged;
  setLocalItem(STORAGE_KEYS.GAMES, [...localList]);
  return merged;
}

export async function deleteGame(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.from('games').delete().eq('id', id);
      if (error) {
        console.warn('Supabase deleteGame warning:', error.message);
      }
    } catch (err) {
      console.warn('Supabase deleteGame error:', err);
    }
  }

  const localList = getLocalItem<Game[]>(STORAGE_KEYS.GAMES, INITIAL_GAMES);
  setLocalItem(
    STORAGE_KEYS.GAMES,
    localList.filter((g) => g.id !== id)
  );
  return true;
}

// ------------------------------------------------------------------------------
// SERVICES
// ------------------------------------------------------------------------------

export async function getServices(options?: { activeOnly?: boolean }): Promise<Service[]> {
  if (isSupabaseConfigured) {
    try {
      let query = supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });

      if (options?.activeOnly) {
        query = query.eq('is_active', true);
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as Service[];
      }
    } catch (err) {
      console.warn('Supabase getServices error:', err);
    }
  }

  let list = getLocalItem<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  if (options?.activeOnly) {
    list = list.filter((s) => s.is_active);
  }
  return list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
}

export async function getServiceById(id: string): Promise<Service | null> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!error && data) {
        return data as Service;
      }
    } catch (err) {
      console.warn('Supabase getServiceById error:', err);
    }
  }

  const list = getLocalItem<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  return list.find((s) => s.id === id) || null;
}

export async function createService(serviceData: Partial<Service>): Promise<Service> {
  const newService: Service = {
    id: serviceData.id || `srv-${Date.now()}`,
    title: serviceData.title || 'Layanan Baru',
    slug: serviceData.slug || `service-${Date.now()}`,
    short_description: serviceData.short_description || null,
    description: serviceData.description || null,
    icon: serviceData.icon || 'Gamepad2',
    image_url: serviceData.image_url || null,
    featured: serviceData.featured ?? false,
    sort_order: serviceData.sort_order || 0,
    is_active: serviceData.is_active ?? true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('services').insert(newService).select().single();
      if (!error && data) {
        const localList = getLocalItem<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
        setLocalItem(STORAGE_KEYS.SERVICES, [...localList, data as Service]);
        return data as Service;
      }
    } catch (err) {
      console.warn('Supabase createService error:', err);
    }
  }

  const localList = getLocalItem<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  setLocalItem(STORAGE_KEYS.SERVICES, [...localList, newService]);
  return newService;
}

export async function updateService(id: string, updates: Partial<Service>): Promise<Service> {
  const updatedFields = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('services')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const localList = getLocalItem<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
        setLocalItem(
          STORAGE_KEYS.SERVICES,
          localList.map((s) => (s.id === id ? (data as Service) : s))
        );
        return data as Service;
      }
    } catch (err) {
      console.warn('Supabase updateService error:', err);
    }
  }

  const localList = getLocalItem<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  const index = localList.findIndex((s) => s.id === id);
  if (index === -1) throw new Error('Service not found');

  const merged = { ...localList[index], ...updatedFields };
  localList[index] = merged;
  setLocalItem(STORAGE_KEYS.SERVICES, [...localList]);
  return merged;
}

export async function deleteService(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('services').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase deleteService error:', err);
    }
  }

  const localList = getLocalItem<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  setLocalItem(
    STORAGE_KEYS.SERVICES,
    localList.filter((s) => s.id !== id)
  );
  return true;
}

// ------------------------------------------------------------------------------
// HOMEPAGE SECTIONS
// ------------------------------------------------------------------------------

export async function getHomepageSections(): Promise<HomepageSection[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('homepage_sections')
        .select('*')
        .order('sort_order', { ascending: true });

      if (!error && data && data.length > 0) {
        return data as HomepageSection[];
      }
    } catch (err) {
      console.warn('Supabase getHomepageSections error:', err);
    }
  }

  const list = getLocalItem<HomepageSection[]>(STORAGE_KEYS.HOMEPAGE, INITIAL_HOMEPAGE_SECTIONS);
  return list.sort((a, b) => a.sort_order - b.sort_order);
}

export async function updateHomepageSection(
  id: string,
  updates: Partial<HomepageSection>
): Promise<HomepageSection> {
  const updatedFields = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('homepage_sections')
        .update(updatedFields)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const localList = getLocalItem<HomepageSection[]>(
          STORAGE_KEYS.HOMEPAGE,
          INITIAL_HOMEPAGE_SECTIONS
        );
        setLocalItem(
          STORAGE_KEYS.HOMEPAGE,
          localList.map((h) => (h.id === id ? (data as HomepageSection) : h))
        );
        return data as HomepageSection;
      }
    } catch (err) {
      console.warn('Supabase updateHomepageSection error:', err);
    }
  }

  const localList = getLocalItem<HomepageSection[]>(
    STORAGE_KEYS.HOMEPAGE,
    INITIAL_HOMEPAGE_SECTIONS
  );
  const index = localList.findIndex((h) => h.id === id);
  if (index === -1) throw new Error('Homepage section not found');

  const merged = { ...localList[index], ...updatedFields };
  localList[index] = merged;
  setLocalItem(STORAGE_KEYS.HOMEPAGE, [...localList]);
  return merged;
}

// ------------------------------------------------------------------------------
// COMPANY INFO
// ------------------------------------------------------------------------------

export async function getCompanyInfo(): Promise<CompanyInfo> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('company_info')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return data as CompanyInfo;
      }
    } catch (err) {
      console.warn('Supabase getCompanyInfo error:', err);
    }
  }

  return getLocalItem<CompanyInfo>(STORAGE_KEYS.COMPANY, INITIAL_COMPANY_INFO);
}

export async function updateCompanyInfo(updates: Partial<CompanyInfo>): Promise<CompanyInfo> {
  const updatedFields = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    try {
      // First get existing id
      const { data: existing } = await supabase
        .from('company_info')
        .select('id')
        .limit(1)
        .maybeSingle();

      if (existing) {
        const { data, error } = await supabase
          .from('company_info')
          .update(updatedFields)
          .eq('id', existing.id)
          .select()
          .single();

        if (!error && data) {
          setLocalItem(STORAGE_KEYS.COMPANY, data as CompanyInfo);
          return data as CompanyInfo;
        }
      } else {
        const { data, error } = await supabase
          .from('company_info')
          .insert({ ...INITIAL_COMPANY_INFO, ...updatedFields })
          .select()
          .single();

        if (!error && data) {
          setLocalItem(STORAGE_KEYS.COMPANY, data as CompanyInfo);
          return data as CompanyInfo;
        }
      }
    } catch (err) {
      console.warn('Supabase updateCompanyInfo error:', err);
    }
  }

  const current = getLocalItem<CompanyInfo>(STORAGE_KEYS.COMPANY, INITIAL_COMPANY_INFO);
  const merged: CompanyInfo = { ...current, ...updatedFields };
  setLocalItem(STORAGE_KEYS.COMPANY, merged);
  return merged;
}

// ------------------------------------------------------------------------------
// INQUIRIES
// ------------------------------------------------------------------------------

export async function getInquiries(options?: {
  status?: InquiryStatus;
  search?: string;
}): Promise<Inquiry[]> {
  if (isSupabaseConfigured) {
    try {
      let query = supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (options?.status) {
        query = query.eq('status', options.status);
      }
      if (options?.search) {
        query = query.or(
          `name.ilike.%${options.search}%,email.ilike.%${options.search}%,subject.ilike.%${options.search}%`
        );
      }

      const { data, error } = await query;
      if (!error && data) {
        return data as Inquiry[];
      }
    } catch (err) {
      console.warn('Supabase getInquiries error:', err);
    }
  }

  let list = getLocalItem<Inquiry[]>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
  if (options?.status) {
    list = list.filter((i) => i.status === options.status);
  }
  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.email.toLowerCase().includes(q) ||
        (i.subject && i.subject.toLowerCase().includes(q))
    );
  }
  return list.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function createInquiry(
  inquiry: Omit<Inquiry, 'id' | 'created_at' | 'updated_at'>
): Promise<Inquiry> {
  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    ...inquiry,
    status: inquiry.status || 'new',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert({
          name: inquiry.name,
          email: inquiry.email,
          subject: inquiry.subject,
          message: inquiry.message,
          status: 'new',
        })
        .select()
        .single();

      if (!error && data) {
        const localList = getLocalItem<Inquiry[]>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
        setLocalItem(STORAGE_KEYS.INQUIRIES, [data as Inquiry, ...localList]);
        return data as Inquiry;
      }
    } catch (err) {
      console.warn('Supabase createInquiry error:', err);
    }
  }

  const localList = getLocalItem<Inquiry[]>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
  const updated = [newInquiry, ...localList];
  setLocalItem(STORAGE_KEYS.INQUIRIES, updated);
  return newInquiry;
}

export async function updateInquiryStatus(id: string, status: InquiryStatus): Promise<Inquiry> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        const localList = getLocalItem<Inquiry[]>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
        setLocalItem(
          STORAGE_KEYS.INQUIRIES,
          localList.map((i) => (i.id === id ? (data as Inquiry) : i))
        );
        return data as Inquiry;
      }
    } catch (err) {
      console.warn('Supabase updateInquiryStatus error:', err);
    }
  }

  const localList = getLocalItem<Inquiry[]>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
  const index = localList.findIndex((i) => i.id === id);
  if (index === -1) throw new Error('Inquiry not found');

  const updated: Inquiry = {
    ...localList[index],
    status,
    updated_at: new Date().toISOString(),
  };
  localList[index] = updated;
  setLocalItem(STORAGE_KEYS.INQUIRIES, [...localList]);
  return updated;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('inquiries').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase deleteInquiry error:', err);
    }
  }

  const localList = getLocalItem<Inquiry[]>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
  setLocalItem(
    STORAGE_KEYS.INQUIRIES,
    localList.filter((i) => i.id !== id)
  );
  return true;
}

// ------------------------------------------------------------------------------
// MEDIA
// ------------------------------------------------------------------------------

export async function getMediaList(): Promise<Media[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as Media[];
      }
    } catch (err) {
      console.warn('Supabase getMediaList error:', err);
    }
  }

  return getLocalItem<Media[]>(STORAGE_KEYS.MEDIA, []);
}

export async function createMediaRecord(
  media: Omit<Media, 'id' | 'created_at'>
): Promise<Media> {
  const newMedia: Media = {
    id: `med-${Date.now()}`,
    ...media,
    created_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('media').insert(newMedia).select().single();
      if (!error && data) {
        const localList = getLocalItem<Media[]>(STORAGE_KEYS.MEDIA, []);
        setLocalItem(STORAGE_KEYS.MEDIA, [data as Media, ...localList]);
        return data as Media;
      }
    } catch (err) {
      console.warn('Supabase createMediaRecord error:', err);
    }
  }

  const localList = getLocalItem<Media[]>(STORAGE_KEYS.MEDIA, []);
  setLocalItem(STORAGE_KEYS.MEDIA, [newMedia, ...localList]);
  return newMedia;
}

export async function deleteMediaRecord(id: string): Promise<boolean> {
  if (isSupabaseConfigured) {
    try {
      await supabase.from('media').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase deleteMediaRecord error:', err);
    }
  }

  const localList = getLocalItem<Media[]>(STORAGE_KEYS.MEDIA, []);
  setLocalItem(
    STORAGE_KEYS.MEDIA,
    localList.filter((m) => m.id !== id)
  );
  return true;
}

// ------------------------------------------------------------------------------
// DASHBOARD STATS
// ------------------------------------------------------------------------------

export async function getDashboardStats(): Promise<DashboardStats> {
  const [games, services, inquiries] = await Promise.all([
    getGames(),
    getServices(),
    getInquiries(),
  ]);

  const publishedGames = games.filter((g) => g.status === 'published').length;
  const draftGames = games.filter((g) => g.status === 'draft').length;
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;

  return {
    totalGames: games.length,
    publishedGames,
    draftGames,
    totalServices: services.length,
    newInquiries,
    totalInquiries: inquiries.length,
    recentGames: games.slice(0, 4),
    recentInquiries: inquiries.slice(0, 4),
  };
}
