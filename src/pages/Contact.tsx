import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, MapPin, Clock, Send, Copy, Check, AlertCircle, Info, ExternalLink, MessageSquare } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { COMPANY_CONFIG } from '../data/company';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const querySubject = searchParams.get('subject') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: querySubject || '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    timestamp?: string;
    mailtoUrl?: string;
  } | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);

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
        // standard regex
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Format alamat email tidak valid (contoh: nama@domain.com).';
        }
        return undefined;
      case 'subject':
        if (!value.trim()) return 'Subjek pesan wajib diisi.';
        if (value.trim().length < 3) return 'Subjek minimal 3 karakter.';
        return undefined;
      case 'message':
        if (!value.trim()) return 'Pesan formulir wajib diisi.';
        if (value.trim().length < 10) return 'Pesan minimal 10 karakter agar kami dapat memahami kebutuhan Anda.';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
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

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    // Simulate brief client-side processing
    setTimeout(() => {
      setIsSubmitting(false);

      // Construct verified mailto link with encoded data
      const mailtoUrl = `mailto:${COMPANY_CONFIG.email}?subject=${encodeURIComponent(
        `[Inquiry Indo Kreasi] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Halo Tim PT Indo Kreasi,\n\nNama: ${formData.name}\nEmail Pengirim: ${formData.email}\n\nPesan:\n${formData.message}\n\n-- Dikirim melalui formulir kontak indokreasi.id`
      )}`;

      setSubmissionResult({
        success: true,
        timestamp: new Date().toLocaleTimeString('id-ID'),
        mailtoUrl,
      });
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(COMPANY_CONFIG.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleResetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTouched({});
    setErrors({});
    setSubmissionResult(null);
  };

  return (
    <div className="w-full py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <SectionHeading
          kicker="HUBUNGI KAMI"
          title="Mari Kolaborasi & Wujudkan Dunia Virtual Anda"
          description="Punya pertanyaan terkait portofolio game, penjajakan lisensi, atau kebutuhan pengembangan bersama studio kami? Kami siap mendengar dari Anda."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#171321] border border-[#332A45] rounded-2xl p-6 sm:p-10 shadow-xl">
            {submissionResult?.success ? (
              /* Honest Demo Submission Feedback */
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="p-4 rounded-xl bg-violet-950/50 border border-[#8B5CF6]/50 flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#C4B5FD] shrink-0 mt-0.5" />
                  <div className="space-y-1 text-sm text-[#F5F3FF]">
                    <strong className="block text-[#C4B5FD] font-semibold">
                      Validasi Formulir Berhasil (Demonstrasi Frontend)
                    </strong>
                    <p className="text-xs text-[#A7A1B5] leading-relaxed">
                      Situs ini adalah aplikasi frontend client-side tanpa basis server penyimpanan. Data Anda telah divalidasi dengan aman di peramban pada pukul {submissionResult.timestamp}.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-[#201A2D] border border-[#332A45] space-y-4">
                  <h4 className="font-display font-bold text-base text-[#F5F3FF]">
                    Ringkasan Pesan Siap Kirim:
                  </h4>
                  <div className="text-xs font-mono space-y-1.5 text-[#A7A1B5]">
                    <div>
                      <strong className="text-[#F5F3FF]">Pengirim:</strong> {formData.name} ({formData.email})
                    </div>
                    <div>
                      <strong className="text-[#F5F3FF]">Subjek:</strong> {formData.subject}
                    </div>
                    <div className="pt-2 border-t border-[#332A45]/60 text-[#DDD6FE]">
                      &quot;{formData.message}&quot;
                    </div>
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row gap-3">
                    <a
                      href={submissionResult.mailtoUrl}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white shadow-md transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Buka Aplikasi Email & Kirim</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#171321] hover:bg-[#201A2D] border border-[#332A45] text-xs font-semibold text-[#A7A1B5] hover:text-[#F5F3FF] transition-all"
                    >
                      <span>Tulis Pesan Baru</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-xs font-mono font-medium text-[#F5F3FF]">
                      Nama Lengkap <span className="text-[#8B5CF6]">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="e.g. Raditya Pratama"
                      className={`w-full px-4 py-2.5 rounded-lg bg-[#201A2D] border text-sm text-[#F5F3FF] placeholder-[#A7A1B5]/50 focus:outline-none transition-all ${
                        touched.name && errors.name
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#332A45] focus:ring-2 focus:ring-[#8B5CF6]'
                      }`}
                      aria-required="true"
                      aria-invalid={touched.name && !!errors.name}
                      aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                    />
                    {touched.name && errors.name && (
                      <p id="name-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-xs font-mono font-medium text-[#F5F3FF]">
                      Alamat Email <span className="text-[#8B5CF6]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="e.g. raditya@perusahaan.id"
                      className={`w-full px-4 py-2.5 rounded-lg bg-[#201A2D] border text-sm text-[#F5F3FF] placeholder-[#A7A1B5]/50 focus:outline-none transition-all ${
                        touched.email && errors.email
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-[#332A45] focus:ring-2 focus:ring-[#8B5CF6]'
                      }`}
                      aria-required="true"
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                    />
                    {touched.email && errors.email && (
                      <p id="email-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-xs font-mono font-medium text-[#F5F3FF]">
                    Subjek Perbincangan <span className="text-[#8B5CF6]">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={() => handleBlur('subject')}
                    placeholder="e.g. Kerja Sama Pengembangan Aset Voxel / Uji Coba Alpha"
                    className={`w-full px-4 py-2.5 rounded-lg bg-[#201A2D] border text-sm text-[#F5F3FF] placeholder-[#A7A1B5]/50 focus:outline-none transition-all ${
                      touched.subject && errors.subject
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-[#332A45] focus:ring-2 focus:ring-[#8B5CF6]'
                    }`}
                    aria-required="true"
                    aria-invalid={touched.subject && !!errors.subject}
                    aria-describedby={touched.subject && errors.subject ? 'subject-error' : undefined}
                  />
                  {touched.subject && errors.subject && (
                    <p id="subject-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-mono font-medium text-[#F5F3FF]">
                    Pesan Detail <span className="text-[#8B5CF6]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    placeholder="Ceritakan gambaran proyek, target waktu, atau hal yang ingin Anda tanyakan..."
                    className={`w-full px-4 py-2.5 rounded-lg bg-[#201A2D] border text-sm text-[#F5F3FF] placeholder-[#A7A1B5]/50 focus:outline-none transition-all resize-y ${
                      touched.message && errors.message
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                        : 'border-[#332A45] focus:ring-2 focus:ring-[#8B5CF6]'
                    }`}
                    aria-required="true"
                    aria-invalid={touched.message && !!errors.message}
                    aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                  />
                  {touched.message && errors.message && (
                    <p id="message-error" className="text-xs text-red-400 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Honest Frontend Note */}
                <div className="p-3.5 rounded-lg bg-[#201A2D]/70 border border-[#332A45]/80 text-[11px] text-[#A7A1B5] leading-relaxed">
                  <span className="text-[#C4B5FD] font-semibold block mb-0.5">Catatan Demonstrasi:</span>
                  {COMPANY_CONFIG.isDemoNotice} Klik tombol di bawah untuk memvalidasi input dan membuka klien email resmi.
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:bg-[#8B5CF6]/50 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(139,92,246,0.35)] transition-all focus:outline-none focus:ring-2 focus:ring-[#C4B5FD]"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Memproses Validasi...' : 'Kirim Pesan Simulasi'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Information Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Email Card with One-Click Copy */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#171321] border border-[#332A45] space-y-4">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C4B5FD] font-semibold block">
                EMAIL UTAMA
              </span>

              <h3 className="text-xl font-display font-bold text-[#F5F3FF]">
                Hubungi Langsung Lewat Surel
              </h3>

              <div className="p-3.5 rounded-xl bg-[#201A2D] border border-[#332A45] flex items-center justify-between gap-3">
                <span className="text-sm font-mono text-[#F5F3FF] truncate">
                  {COMPANY_CONFIG.email}
                </span>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="shrink-0 p-2 rounded-lg bg-[#171321] hover:bg-[#282138] border border-[#332A45] text-[#C4B5FD] hover:text-white transition-all text-xs flex items-center gap-1.5"
                  title="Salin alamat surel"
                  aria-label="Salin alamat surel ke papan klip"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-mono text-[11px]">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="font-mono text-[11px]">Salin</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-1">
                <a
                  href={`mailto:${COMPANY_CONFIG.email}?subject=${encodeURIComponent(
                    'Inquiry Kolaborasi PT Indo Kreasi'
                  )}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B5CF6] hover:text-[#C4B5FD] transition-colors"
                >
                  <span>Buka di Aplikasi Email Bawaan</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Operating Details */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#171321] border border-[#332A45] space-y-5 text-sm">
              <span className="font-mono text-xs uppercase tracking-widest text-[#C4B5FD] font-semibold block">
                INFORMASI KANTOR
              </span>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F5F3FF] block">Pusat Kreatif & Studio:</strong>
                    <span className="text-xs text-[#A7A1B5]">{COMPANY_CONFIG.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F5F3FF] block">Jam Operasional:</strong>
                    <span className="text-xs text-[#A7A1B5]">{COMPANY_CONFIG.workingHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-[#8B5CF6] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F5F3FF] block">Waktu Respon:</strong>
                    <span className="text-xs text-[#A7A1B5]">1–2 hari kerja untuk evaluasi proposal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
