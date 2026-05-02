import { useState } from "react";
import { Mail, MessageSquare, CheckCircle } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { Layout } from "@/components/Layout";
import { useLang } from "@/contexts/LangContext";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { lang } = useLang();
  const { t } = useTranslation();
  useSeo({
    title: `${t("contact.page_title")} | TimeZone.tools`,
    description: t("contact.page_subtitle"),
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
          <h1 className="text-3xl font-bold text-foreground mb-3">{t("contact.page_title")}</h1>
          <p className="text-muted-foreground">{t("contact.page_subtitle")}</p>
        </div>

        {submitted ? (
          <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center">
            <CheckCircle className="mx-auto mb-3 text-green-600 dark:text-green-400" size={32} />
            <h2 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">{t("contact.success_title")}</h2>
            <p className="text-sm text-green-700 dark:text-green-400">{t("contact.success_desc")}</p>
            <button onClick={() => setSubmitted(false)} className="mt-4 text-sm text-green-700 dark:text-green-400 underline hover:no-underline">
              {t("contact.success_again")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card border border-card-border rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-foreground">
              <MessageSquare size={15} className="text-primary" />
              {t("contact.form_title")}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("contact.name_label")}</label>
                <input type="text" required value={form.name} onChange={update("name")}
                  placeholder={t("contact.name_placeholder")} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("contact.email_label")}</label>
                <input type="email" required value={form.email} onChange={update("email")}
                  placeholder={t("contact.email_placeholder")} className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("contact.subject_label")}</label>
              <select value={form.subject} onChange={update("subject")} className={inputClass}>
                <option value="">{t("contact.subject_placeholder")}</option>
                <option value="Bug Report">{t("contact.subject_bug")}</option>
                <option value="Feature Request">{t("contact.subject_feature")}</option>
                <option value="General Feedback">{t("contact.subject_feedback")}</option>
                <option value="Business Inquiry">{t("contact.subject_business")}</option>
                <option value="Other">{t("contact.subject_other")}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">{t("contact.message_label")}</label>
              <textarea required rows={5} value={form.message} onChange={update("message")}
                placeholder={t("contact.message_placeholder")}
                className={`${inputClass} min-h-[120px] resize-y`} />
            </div>

            <button type="submit"
              className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 active:bg-primary/80 transition-colors">
              {t("contact.send_btn")}
            </button>

            <p className="text-xs text-muted-foreground text-center">
              {t("contact.or_email")}{" "}
              <a href="mailto:contact@timezone.tools" className="text-primary hover:underline">
                contact@timezone.tools
              </a>
            </p>
          </form>
        )}

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="bg-card border border-card-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-2">{t("contact.response_title")}</h3>
            <p className="text-sm text-muted-foreground">{t("contact.response_desc")}</p>
          </div>
          <div className="bg-card border border-card-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-2">{t("contact.before_title")}</h3>
            <p className="text-sm text-muted-foreground">{t("contact.before_desc")}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
