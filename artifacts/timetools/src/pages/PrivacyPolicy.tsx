import { useSeo } from "@/hooks/useSeo";
import { PageLayout } from "@/components/Layout";
import { AdSlot } from "@/components/AdSlot";
import { useLang } from "@/contexts/LangContext";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
  const { lang } = useLang();
  const { t } = useTranslation();
  useSeo({
    title: `${t("privacy.page_title")} | TimeZone.tools`,
    description: "Privacy Policy for TimeZone.tools — learn how we handle your data and use of advertising cookies.",
    canonical: `https://timezone.tools/${lang}/privacy-policy`,
    breadcrumbs: [
      { name: "TimeZone.tools", url: `https://timezone.tools/${lang}/` },
      { name: t("privacy.page_title"), url: `https://timezone.tools/${lang}/privacy-policy` },
    ],
  });

  const updated = "May 2, 2026";

  return (
    <PageLayout title={t("privacy.page_title")} description={`${t("privacy.last_updated")} ${updated}`}>
      <div className="space-y-6 text-foreground">

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("privacy.s1_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("privacy.s1_p1")}</p>
          <p className="text-muted-foreground leading-relaxed">{t("privacy.s1_p2")}</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("privacy.s2_title")}</h2>
          <p className="text-muted-foreground">{t("privacy.s2_intro")}</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li>{t("privacy.s2_li1")}</li>
            <li>{t("privacy.s2_li2")}</li>
            <li>{t("privacy.s2_li3")}</li>
            <li>{t("privacy.s2_li4")}</li>
          </ul>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("privacy.s3_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("privacy.s3_p1")}</p>
          <p className="text-muted-foreground leading-relaxed">{t("privacy.s3_p2")}</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("privacy.s4_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("privacy.s4_p1")}</p>
          <p className="text-muted-foreground leading-relaxed">
            {t("privacy.s4_p2")}{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {t("privacy.s4_opt_out")}
            </a>.
          </p>
          <p className="text-muted-foreground leading-relaxed">{t("privacy.s4_p3")}</p>
          <p className="text-muted-foreground leading-relaxed">
            <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {t("privacy.s4_learn_more")}
            </a>
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("privacy.s5_title")}</h2>
          <p className="text-muted-foreground">{t("privacy.s5_intro")}</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>
              <strong>Google AdSense</strong> —{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Google Privacy Policy
              </a>
            </li>
            <li>
              <strong>Google Analytics</strong> — {t("privacy.s5_ga4_desc")}
            </li>
            <li>
              <strong>Google Fonts</strong> — {t("privacy.s5_fonts_desc")}
            </li>
          </ul>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("privacy.s6_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("privacy.s6_p")}</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("privacy.s7_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("privacy.s7_p")}</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("privacy.s8_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("privacy.s8_p")}{" "}
            <a href="mailto:eng.muhammedkado@gmail.com" className="text-primary hover:underline">
              eng.muhammedkado@gmail.com
            </a>
          </p>
        </div>
      </div>

      <AdSlot slot="bottom" className="mt-8" />
    </PageLayout>
  );
}
