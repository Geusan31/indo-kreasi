import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Mail,
  MapPin,
  Clock,
  Copy,
  Check,
  AlertCircle,
  Send,
  Loader2,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { createInquiry, getCompanyInfo } from '../lib/db';
import { CompanyInfo } from '../types';
import { useToast } from '../components/ui/Toast';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const querySubject = searchParams.get('subject') || '';
  const { showToast } = useToast();

  const [company, setCompany] = useState<CompanyInfo | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Kemitraan Studio & Co-Dev',
    subject: querySubject || '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    async function loadCompany() {
      try {
        const data = await getCompanyInfo();
        setCompany(data);
      } catch (e) {
        console.warn('Error loading company info:', e);
      }
    }
    loadCompany();
  }, []);

  useEffect(() => {
    if (querySubject) {
      setFormData((prev) => ({ ...prev, subject: querySubject }));
    }
  }, [querySubject]);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Nama lengkap wajib diisi.';
        if (value.trim().length < 2) return 'Nama minimal 2 karakter.';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Alamat email wajib diisi.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Format alamat email tidak valid.';
        }
        return undefined;
      case 'subject':
        if (!value.trim()) return 'Subjek pesan wajib diisi.';
        if (value.trim().length < 3) return 'Subjek minimal 3 karakter.';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Pesan wajib diisi.';
        if (value.trim().length < 10) return 'Pesan minimal 10 karakter.';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message),
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    });

    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    try {
      setIsSubmitting(true);
      await createInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: `[${formData.category}] ${formData.subject.trim()}`,
        message: formData.message.trim(),
        status: 'new',
      });

      setIsSubmitted(true);
      showToast('Pesan berhasil terkirim dan tercatat di studio');
    } catch (err: any) {
      showToast(err.message || 'Gagal mengirim pesan', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    const emailToCopy = company?.email || 'halo@indokreasi.id';
    navigator.clipboard.writeText(emailToCopy);
    setCopiedEmail(true);
    showToast('Alamat email berhasil disalin');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleResetForm = () => {
    setFormData({
      name: '',
      email: '',
      category: 'Kemitraan Studio & Co-Dev',
      subject: '',
      message: '',
    });
    setTouched({});
    setErrors({});
    setIsSubmitted(false);
  };

  const faqs = [
    {
      q: 'Berapa lama estimasi pengerjaan prototipe mekanik (greybox)?',
      a: 'Untuk purwarupa mekanik cepat (greybox), timeline rata-rata berkisar antara 2 hingga 4 minggu kerja setelah Game Design Document (GDD) disetujui.',
    },
    {
      q: 'Apakah PT Indo Kreasi melayani integrasi brand ke dunia virtual?',
      a: 'Ya, kami memiliki keahlian khusus dalam merancang aktivasi brand, ruang pamer interaktif 3D, serta mini-game eksklusif berhadiah kosmetik digital di platform virtual modern.',
    },
    {
      q: 'Bagaimana kepemilikan hak cipta (IP) pada proyek kerjasama?',
      a: 'Seluruh hak cipta, model 3D, dan kode sumber yang dikembangkan dalam skema work-for-hire diserahkan penuh kepada klien sesuai kesepakatan tertulis di bawah perjanjian kerahasiaan (NDA).',
    },
    {
      q: 'Platform apa saja yang didukung oleh game studio?',
      a: 'Fokus utama kami adalah arsitektur cross-platform: PC (Windows / macOS) serta optimasi performa tinggi untuk perangkat mobile (iOS & Android) dan tablet.',
    },
  ];

  const contactEmail = company?.email || 'halo@indokreasi.id';
  const mailtoLink = `mailto:${contactEmail}?subject=${encodeURIComponent(
    formData.subject || 'Inquiry PT Indo Kreasi'
  )}&body=${encodeURIComponent(
    `Halo PT Indo Kreasi,\n\nNama: ${formData.name}\nKategori: ${formData.category}\n\n${formData.message}`
  )}`;

  return (
    <div className="w-full py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        <SectionHeading
          kicker="Kontak Studio"
          title="Hubungi PT Indo Kreasi"
          description="Sampaikan pertanyaan seputar portofolio game, proposal kolaborasi, atau penjajakan kerja sama pengembangan bersama tim kami."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form Area */}
          <div className="lg:col-span-7 bg-[#171321] border border-[#332A45] rounded-2xl p-6 sm:p-9 shadow-xl">
            {isSubmitted ? (
              <div className="space-y-6 py-8 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="font-display font-bold text-xl text-[#F5F3FF]">
                    Pesan Berhasil Terkirim
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A7A1B5] leading-relaxed">
                    Terima kasih telah menghubungi PT Indo Kreasi. Tim kami akan mempelajari kebutuhan proyek Anda dan membalas dalam waktu maksimal 24 jam kerja.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-[#F5F3FF] transition-colors"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-medium text-[#F5F3FF]">
                      Nama Lengkap <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="Nama Anda"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#201A2D] border text-xs sm:text-sm text-[#F5F3FF] placeholder-[#A7A1B5]/50 focus:outline-none transition-colors ${
                        touched.name && errors.name
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#332A45] focus:ring-1 focus:ring-[#8B5CF6]'
                      }`}
                      aria-required="true"
                    />
                    {touched.name && errors.name && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-medium text-[#F5F3FF]">
                      Alamat Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="nama@perusahaan.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#201A2D] border text-xs sm:text-sm text-[#F5F3FF] placeholder-[#A7A1B5]/50 focus:outline-none transition-colors ${
                        touched.email && errors.email
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#332A45] focus:ring-1 focus:ring-[#8B5CF6]'
                      }`}
                      aria-required="true"
                    />
                    {touched.email && errors.email && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="category" className="block text-xs font-medium text-[#F5F3FF]">
                      Kategori Kebutuhan
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#201A2D] border border-[#332A45] text-xs sm:text-sm text-[#F5F3FF] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6] transition-colors"
                    >
                      <option value="Kemitraan Studio & Co-Dev">Kemitraan Studio & Co-Dev</option>
                      <option value="Penerbitan & Distribusi Game">Penerbitan & Distribusi Game</option>
                      <option value="Desain Aset 3D & Voxel">Desain Aset 3D & Voxel</option>
                      <option value="Aktivasi Brand Virtual World">Aktivasi Brand Virtual World</option>
                      <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="block text-xs font-medium text-[#F5F3FF]">
                      Subjek Pembahasan <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={() => handleBlur('subject')}
                      placeholder="Topik proyek atau penawaran kerja sama..."
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#201A2D] border text-xs sm:text-sm text-[#F5F3FF] placeholder-[#A7A1B5]/50 focus:outline-none transition-colors ${
                        touched.subject && errors.subject
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#332A45] focus:ring-1 focus:ring-[#8B5CF6]'
                      }`}
                      aria-required="true"
                    />
                    {touched.subject && errors.subject && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="message" className="block text-xs font-medium text-[#F5F3FF]">
                      Pesan Rinci <span className="text-red-400">*</span>
                    </label>
                    <span className="text-[11px] text-[#A7A1B5]">
                      {formData.message.length} karakter
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    placeholder="Tuliskan gambaran proyek, target waktu, atau poin diskusi yang ingin Anda bahas..."
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#201A2D] border text-xs sm:text-sm text-[#F5F3FF] placeholder-[#A7A1B5]/50 focus:outline-none transition-colors resize-y ${
                      touched.message && errors.message
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-[#332A45] focus:ring-1 focus:ring-[#8B5CF6]'
                    }`}
                    aria-required="true"
                  />
                  {touched.message && errors.message && (
                    <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Mengirimkan Pesan...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Kirim Pesan ke Studio</span>
                      </>
                    )}
                  </button>

                  <a
                    href={mailtoLink}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-xs font-medium text-[#C4B5FD] transition-colors"
                  >
                    <span>Kirim via Email Client</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Direct Details & Studio Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-7 rounded-2xl bg-[#171321] border border-[#332A45] space-y-4">
              <h3 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase">
                Alamat Surel Langsung
              </h3>

              <div className="p-3.5 rounded-xl bg-[#201A2D] border border-[#332A45] flex items-center justify-between gap-3 text-xs">
                <span className="font-mono text-[#F5F3FF] font-medium truncate">
                  {contactEmail}
                </span>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-[#171321] hover:bg-[#282138] border border-[#332A45] text-[#C4B5FD] transition-colors"
                  title="Salin alamat email"
                  aria-label="Salin alamat surel"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-xs text-[#A7A1B5] leading-relaxed">
                Anda juga dapat mengirimkan presentasi pitch deck atau file dokumen langsung ke alamat email di atas.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#171321] border border-[#332A45] space-y-4 text-xs">
              <h3 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase">
                Lokasi & Waktu Operasional
              </h3>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-[#A7A1B5]">
                  <MapPin className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    {company?.address || 'Bandung & Jakarta, Indonesia'}
                  </span>
                </div>

                <div className="flex items-start gap-2.5 text-[#A7A1B5]">
                  <Clock className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Senin – Jumat, 09:00 – 18:00 WIB (Kecuali Hari Libur Nasional)
                  </span>
                </div>
              </div>
            </div>

            <div className="p-7 rounded-2xl bg-[#171321] border border-[#332A45] space-y-3 text-xs">
              <h3 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase">
                Komitmen Kerahasiaan (NDA)
              </h3>
              <p className="text-[#A7A1B5] leading-relaxed">
                Kami siap menandatangani perjanjian non-disclosure (NDA) bilateral sebelum mendiskusikan konsep hak cipta atau dokumen teknis rahasia Anda.
              </p>
            </div>
          </div>
        </div>

        {/* Studio FAQ Accordion */}
        <section className="space-y-6">
          <SectionHeading
            kicker="Tanya Jawab"
            title="Pertanyaan yang Sering Diajukan"
            description="Informasi seputar alur kemitraan, durasi pengerjaan, dan hak kekayaan intelektual."
          />

          <div className="space-y-3 max-w-4xl">
            {faqs.map((faq, idx) => {
              const isOpen = expandedFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#171321] border border-[#332A45] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-semibold text-sm text-[#F5F3FF]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8B5CF6] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#A7A1B5] leading-relaxed border-t border-[#332A45]/50 mt-2 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
