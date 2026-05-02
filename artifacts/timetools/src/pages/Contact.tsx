import { useState } from "react";
import { Mail, MessageSquare, CheckCircle } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LangContext";

export default function Contact() {
  const { lang } = useLang();
  useSeo({
    title: "Contact | TimeZone.tools",
    description: "Contact the TimeZone.tools team — bug reports, feature requests, and general feedback welcome.",
    canonical: `https://timezone.tools/${lang}/contact`,
  });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    const body = encodeURIComponent(`Name: ${name}\n\nMessage:\n${message}`);
    const sub = encodeURIComponent(subject || "TimeZone.tools Contact");
    window.location.href = `mailto:contact@timezone.tools?subject=${sub}&body=${body}&reply-to=${encodeURIComponent(email)}`;
    setSubmitted(true);
  };

  const inputClass = "w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm text-foreground min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors";

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
            <Mail size={28} />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Contact Us</h1>
          <p className="text-muted-foreground">
            Bug report, feature request, or general feedback — we'd love to hear from you.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center">
            <CheckCircle className="mx-auto mb-3 text-green-600 dark:text-green-400" size={32} />
            <h2 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Your email client opened!</h2>
            <p className="text-sm text-green-700 dark:text-green-400">
              Please send the email from your mail app. We typically respond within 24 hours.
            </p>
            <button onClick={() => setSubmitted(false)} className="mt-4 text-sm text-green-700 dark:text-green-400 underline hover:no-underline">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card border border-card-border rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-foreground">
              <MessageSquare size={15} className="text-primary" />
              Send us a message
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Your Name</label>
                <input type="text" required value={form.name} onChange={update("name")}
                  placeholder="Jane Smith" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email Address</label>
                <input type="email" required value={form.email} onChange={update("email")}
                  placeholder="jane@example.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Subject</label>
              <select value={form.subject} onChange={update("subject")} className={inputClass}>
                <option value="">Select a subject…</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="General Feedback">General Feedback</option>
                <option value="Business Inquiry">Business Inquiry</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Message</label>
              <textarea required rows={5} value={form.message} onChange={update("message")}
                placeholder="Describe your issue or request in detail…"
                className={`${inputClass} min-h-[120px] resize-y`} />
            </div>

            <button type="submit"
              className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 active:bg-primary/80 transition-colors">
              Send Message
            </button>

            <p className="text-xs text-muted-foreground text-center">
              Or email us directly at{" "}
              <a href="mailto:contact@timezone.tools" className="text-primary hover:underline">
                contact@timezone.tools
              </a>
            </p>
          </form>
        )}

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="bg-card border border-card-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-2">Response Time</h3>
            <p className="text-sm text-muted-foreground">We typically respond within <strong className="text-foreground">24–48 hours</strong> on business days.</p>
          </div>
          <div className="bg-card border border-card-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-2">Before You Write</h3>
            <p className="text-sm text-muted-foreground">Check our FAQ sections on each tool page — your question may already be answered.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
