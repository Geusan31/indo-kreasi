import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, MapPin, Clock, Copy, Check, AlertCircle, ExternalLink } from 'lucide-react';
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

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const mailtoUrl = `mailto:${COMPANY_CONFIG.email}?subject=${encodeURIComponent(
        `[Inquiry] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Halo Tim PT Indo Kreasi,\n\nNama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}`
      )}`;

      setSubmissionResult({
        success: true,
        mailtoUrl,
      });
    }, 400);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(COMPANY_CONFIG.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
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
        <SectionHeading
          kicker="Kontak Studio"
          title="Hubungi PT Indo Kreasi"
          description="Sampaikan pertanyaan seputar portofolio game, proposal kolaborasi, atau penjajakan kerja sama pengembangan."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-[#171321] border border-[#332A45] rounded-xl p-6 sm:p-8">
            {submissionResult?.success ? (
              <div className="space-y-5">
                <div className="p-4 rounded-lg bg-[#201A2D] border border-[#332A45] text-xs text-[#A7A1B5] space-y-2">
                  <p className="font-semibold text-[#F5F3FF]">
                    Pesan Siap Dikirim
                  </p>
                  <p>
                    Sebagai aplikasi frontend tanpa penyimpanan database server, pesan Anda dapat langsung dikirim melalui klien email resmi.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={submissionResult.mailtoUrl}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] text-xs font-semibold text-white transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Buka Aplikasi Email</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#201A2D] hover:bg-[#282138] border border-[#332A45] text-xs font-medium text-[#A7A1B5] hover:text-[#F5F3FF] transition-colors"
                  >
                    <span>Tulis Pesan Lain</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-medium text-[#F5F3FF]">
                      Nama Lengkap
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      placeholder="Nama Anda"
                      className={`w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border text-xs sm:text-sm text-[#F5F3FF] placeholder-[#A7A1B5]/50 focus:outline-none transition-colors ${
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
                      Alamat Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="nama@domain.com"
                      className={`w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border text-xs sm:text-sm text-[#F5F3FF] placeholder-[#A7A1B5]/50 focus:outline-none transition-colors ${
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

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-medium text-[#F5F3FF]">
                    Subjek
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={() => handleBlur('subject')}
                    placeholder="Topik pembahasan..."
                    className={`w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border text-xs sm:text-sm text-[#F5F3FF] placeholder-[#A7A1B5]/50 focus:outline-none transition-colors ${
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

                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-medium text-[#F5F3FF]">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    placeholder="Tuliskan detail pertanyaan atau proposal kerja sama..."
                    className={`w-full px-3.5 py-2 rounded-lg bg-[#201A2D] border text-xs sm:text-sm text-[#F5F3FF] placeholder-[#A7A1B5]/50 focus:outline-none transition-colors resize-y ${
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:bg-[#8B5CF6]/50 text-xs font-semibold text-white transition-colors"
                >
                  <span>{isSubmitting ? 'Memproses...' : 'Kirim Pesan'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Direct Details */}
          <div className="lg:col-span-5 space-y-5">
            <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-4">
              <h3 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase">
                Alamat Surel Langsung
              </h3>

              <div className="p-3 rounded-lg bg-[#201A2D] border border-[#332A45] flex items-center justify-between gap-3 text-xs">
                <span className="font-mono text-[#F5F3FF] truncate">
                  {COMPANY_CONFIG.email}
                </span>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded bg-[#171321] hover:bg-[#282138] border border-[#332A45] text-[#C4B5FD] transition-colors"
                  title="Salin email"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#171321] border border-[#332A45] space-y-3.5 text-xs">
              <h3 className="font-semibold text-xs text-[#F5F3FF] tracking-wider uppercase">
                Operasional
              </h3>

              <div className="flex items-start gap-2.5 text-[#A7A1B5]">
                <MapPin className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.location}</span>
              </div>

              <div className="flex items-start gap-2.5 text-[#A7A1B5]">
                <Clock className="w-4 h-4 text-[#8B5CF6] shrink-0 mt-0.5" />
                <span>{COMPANY_CONFIG.workingHours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
