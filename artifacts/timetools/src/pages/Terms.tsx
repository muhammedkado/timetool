import { useSeo } from "@/hooks/useSeo";
import { PageLayout } from "@/components/Layout";
import { useLang } from "@/contexts/LangContext";
import { useTranslation } from "react-i18next";

export default function Terms() {
  const { lang, langPath } = useLang();
  const { t } = useTranslation();
  useSeo({
    title: `${t("terms.page_title")} | TimeZone.tools`,
    description: "Terms of Service for TimeZone.tools — conditions of use for our free time and date tools.",
    canonical: `https://timezone.tools/${lang}/terms`,
  });

  const updated = "May 2, 2026";

  return (
    <PageLayout title={t("terms.page_title")} description={`${t("terms.last_updated")} ${updated}`}>
      <div className="space-y-6 text-foreground">

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("terms.s1_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("terms.s1_p")}</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("terms.s2_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("terms.s2_p")}</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("terms.s3_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("terms.s3_p1")}</p>
          <p className="text-muted-foreground leading-relaxed">{t("terms.s3_p2")}</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("terms.s4_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("terms.s4_p")}</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("terms.s5_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("terms.s5_p")}{" "}
            <a href={langPath("/privacy-policy")} className="text-primary hover:underline">
              {t("terms.s5_privacy")}
            </a>{" "}
            {t("terms.s5_p2")}
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("terms.s6_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("terms.s6_p")}</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("terms.s7_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("terms.s7_p")}</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("terms.s8_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">{t("terms.s8_p")}</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">{t("terms.s9_title")}</h2>
          <p className="text-muted-foreground leading-relaxed">
            {t("terms.s9_p")}{" "}
            <a href="mailto:eng.muhammedkado@gmail.com" className="text-primary hover:underline">
              eng.muhammedkado@gmail.com
            </a>
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
