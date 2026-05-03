import { Clock, Users, Calendar, Timer, Briefcase, Globe, Zap, Shield } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";
import { Layout } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";
import { useLang } from "@/contexts/LangContext";
import { useTranslation } from "react-i18next";

export default function About() {
  const { lang, langPath } = useLang();
  const { t } = useTranslation();
  useSeo({
    title: `${t("about.page_title")} | TimeZone.tools`,
    description: t("about.page_subtitle"),
    canonical: `https://timezone.tools/${lang}/about`,
    breadcrumbs: [
      { name: "TimeZone.tools", url: `https://timezone.tools/${lang}/` },
      { name: t("about.page_title"), url: `https://timezone.tools/${lang}/about` },
    ],
  });

  const tools = [
    { icon: Clock, name: t("nav.timezone_converter"), desc: t("tz.page_description") },
    { icon: Users, name: t("nav.meeting_planner"), desc: t("meet.page_description") },
    { icon: Calendar, name: t("nav.date_difference"), desc: t("dateDiff.page_description") },
    { icon: Timer, name: t("nav.countdown_timer"), desc: t("countdown.page_description") },
    { icon: Briefcase, name: t("nav.working_days"), desc: t("workDays.page_description") },
  ];

  const values = [
    { icon: Zap, title: t("about.value_fast_title"), desc: t("about.value_fast_desc") },
    { icon: Shield, title: t("about.value_private_title"), desc: t("about.value_private_desc") },
    { icon: Globe, title: t("about.value_global_title"), desc: t("about.value_global_desc") },
  ];

  const techs = ["React", "TypeScript", "Vite", "Tailwind CSS", "i18next", "date-fns", "IANA Timezone DB"];

  return (
    <Layout showSidebar>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
            <Clock size={28} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t("about.page_title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("about.page_subtitle")}
          </p>
        </div>

        <AdSlot slot="top" className="mb-10" />

        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6">{t("about.mission_title")}</h2>
          <div className="bg-card border border-card-border rounded-xl p-6">
            <p className="text-muted-foreground leading-relaxed mb-4">{t("about.mission_p1")}</p>
            <p className="text-muted-foreground leading-relaxed">{t("about.mission_p2")}</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6">{t("about.tools_title")}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tools.map(({ icon: Icon, name, desc }) => (
              <div key={name} className="bg-card border border-card-border rounded-xl p-5 flex gap-4">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary flex-shrink-0 h-fit">
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6">{t("about.values_title")}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card border border-card-border rounded-xl p-5 text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mb-3">
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-foreground mb-6">{t("about.tech_title")}</h2>
          <div className="bg-card border border-card-border rounded-xl p-6">
            <p className="text-muted-foreground leading-relaxed mb-4">{t("about.tech_p")}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {techs.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full font-medium border border-border">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-6">{t("about.contact_title")}</h2>
          <div className="bg-card border border-card-border rounded-xl p-6">
            <p className="text-muted-foreground leading-relaxed mb-4">{t("about.contact_p")}</p>
            <a
              href={langPath("/contact")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {t("about.contact_btn")}
            </a>
          </div>
        </section>

        <AdSlot slot="bottom" className="mt-4" />
      </div>
    </Layout>
  );
}
