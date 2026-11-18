import { useState } from 'react';
import type { FormEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { AnimatedSectionHeading } from './AnimatedSectionHeading';
import { FloatingIconBadge } from './FloatingIconBadge';

interface ContactSuccessMeta {
  id: string;
  deliveredVia: 'smtp-and-inbox' | 'server-inbox';
  timestamp: string;
}

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMeta, setSuccessMeta] = useState<ContactSuccessMeta | null>(null);

  const validateClient = (): string | null => {
    if (name.trim().length < 2) return 'Please enter your full name (at least 2 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return 'Please enter a valid email address.';
    if (subject.trim().length < 2) return 'Please provide a subject for your message.';
    if (message.trim().length < 10)
      return 'Please write a message of at least 10 characters.';
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const validationError = validateClient();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        id?: string;
        deliveredVia?: 'smtp-and-inbox' | 'server-inbox';
        timestamp?: string;
        error?: string;
      };

      if (!response.ok || !payload.ok || !payload.id) {
        setErrorMsg(
          payload.error ||
            'Delivery could not be completed. Please email amsiddiquikhan147@gmail.com directly.'
        );
        return;
      }

      setSuccessMeta({
        id: payload.id,
        deliveredVia: payload.deliveredVia || 'server-inbox',
        timestamp: payload.timestamp || new Date().toISOString(),
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setErrorMsg(
        'Network error while sending your message. You can reach Ali directly via email or WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSectionHeading
          title="Contact Me"
          subtitle="Get in Touch to Discuss Your Project or Just Say Hello."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* LEFT SIDE: 3 Contact Info Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-5">
            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:border-[#25C77A] hover:shadow-md transition-all duration-300 flex items-center gap-5"
            >
              <FloatingIconBadge size="lg" delayMs={0} className="shrink-0">
                <MapPin className="w-6 h-6" />
              </FloatingIconBadge>
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-wide text-[#64748B]">
                  Location
                </p>
                <p className="mt-1 text-base sm:text-lg font-bold text-[#1E293B] group-hover:text-[#189D5E] transition-colors">
                  {PERSONAL_INFO.location}
                </p>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.a
              href={`mailto:${PERSONAL_INFO.email}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:border-[#25C77A] hover:shadow-md transition-all duration-300 flex items-center gap-5"
            >
              <FloatingIconBadge size="lg" delayMs={250} className="shrink-0">
                <Mail className="w-6 h-6" />
              </FloatingIconBadge>
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-wide text-[#64748B]">
                  Email
                </p>
                <p className="mt-1 text-base sm:text-lg font-bold text-[#1E293B] group-hover:text-[#189D5E] transition-colors break-all">
                  {PERSONAL_INFO.email}
                </p>
              </div>
            </motion.a>

            {/* Phone / WhatsApp Card */}
            <motion.a
              href={PERSONAL_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:border-[#25C77A] hover:shadow-md transition-all duration-300 flex items-center gap-5"
            >
              <FloatingIconBadge size="lg" delayMs={500} className="shrink-0">
                <Phone className="w-6 h-6" />
              </FloatingIconBadge>
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-wide text-[#64748B]">
                  Phone / WhatsApp
                </p>
                <p className="mt-1 text-base sm:text-lg font-bold text-[#1E293B] group-hover:text-[#189D5E] transition-colors tabular-nums">
                  {PERSONAL_INFO.whatsappDisplay}
                </p>
              </div>
            </motion.a>
          </div>

          {/* RIGHT SIDE: Functional Send Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-9 shadow-sm border border-slate-200/80"
          >
            <AnimatePresence mode="wait">
              {successMeta ? (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full flex flex-col items-center justify-center text-center py-8 px-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-[#25C77A]/15 text-[#189D5E] flex items-center justify-center mb-5"
                  >
                    <CheckCircle2 className="w-9 h-9" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-[#1E293B]">
                    Message Received
                  </h3>
                  <p className="mt-3 max-w-md text-base text-[#64748B] leading-relaxed">
                    {successMeta.deliveredVia === 'smtp-and-inbox'
                      ? 'Your message has been delivered to Ali Murtaza’s email inbox and logged on the server.'
                      : 'Your message has been securely recorded in Ali Murtaza’s server inquiry inbox.'}
                  </p>
                  <p className="mt-2 text-xs font-mono text-[#64748B]">
                    Reference ID: {successMeta.id}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSuccessMeta(null)}
                      className="px-6 py-3 rounded-xl bg-[#25C77A] text-white font-semibold text-sm hover:bg-[#2EDB88] transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <a
                      href={PERSONAL_INFO.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E293B] text-white font-semibold text-sm hover:bg-[#25C77A] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  {errorMsg && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 p-4 rounded-xl bg-[#E74C5A]/10 border border-[#E74C5A]/30 text-[#B42331] text-sm"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-semibold text-[#1E293B] mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ali Murtaza"
                        className="w-full px-4 py-3 rounded-xl bg-[#EEF3FA]/70 border border-slate-200 text-[#1E293B] placeholder:text-[#64748B]/70 focus:outline-none focus:bg-white focus:border-[#25C77A] focus:ring-2 focus:ring-[#25C77A]/20 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-semibold text-[#1E293B] mb-2"
                      >
                        Your Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#EEF3FA]/70 border border-slate-200 text-[#1E293B] placeholder:text-[#64748B]/70 focus:outline-none focus:bg-white focus:border-[#25C77A] focus:ring-2 focus:ring-[#25C77A]/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-sm font-semibold text-[#1E293B] mb-2"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Web application or AI project inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-[#EEF3FA]/70 border border-slate-200 text-[#1E293B] placeholder:text-[#64748B]/70 focus:outline-none focus:bg-white focus:border-[#25C77A] focus:ring-2 focus:ring-[#25C77A]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-[#1E293B] mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell me about your project goals, timeline, and ideas..."
                      className="w-full px-4 py-3 rounded-xl bg-[#EEF3FA]/70 border border-slate-200 text-[#1E293B] placeholder:text-[#64748B]/70 focus:outline-none focus:bg-white focus:border-[#25C77A] focus:ring-2 focus:ring-[#25C77A]/20 transition-all resize-y"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#25C77A] text-white font-semibold text-base shadow-[0_8px_20px_rgba(37,199,122,0.26)] hover:bg-[#2EDB88] hover:shadow-[0_12px_26px_rgba(37,199,122,0.34)] disabled:opacity-65 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25C77A] focus-visible:ring-offset-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
