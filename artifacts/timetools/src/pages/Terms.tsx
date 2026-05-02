import { useSeo } from "@/hooks/useSeo";
import { PageLayout } from "@/components/Layout";
import { useLang } from "@/contexts/LangContext";

export default function Terms() {
  const { lang } = useLang();
  useSeo({
    title: "Terms of Service | TimeZone.tools",
    description: "Terms of Service for TimeZone.tools — conditions of use for our free time and date tools.",
    canonical: `https://timezone.tools/${lang}/terms`,
  });

  const updated = "May 2, 2026";

  return (
    <PageLayout title="Terms of Service" description={`Last updated: ${updated}`}>
      <div className="space-y-6 text-foreground">

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using TimeZone.tools (the "Service"), you agree to be bound by these
            Terms of Service. If you do not agree to these terms, please do not use the Service.
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">2. Description of Service</h2>
          <p className="text-muted-foreground leading-relaxed">
            TimeZone.tools provides free, client-side web tools for time zone conversion, meeting
            planning, date difference calculation, countdown timers, and working days calculation.
            The Service is provided free of charge and requires no user registration.
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">3. Accuracy of Information</h2>
          <p className="text-muted-foreground leading-relaxed">
            While we strive to provide accurate time and date calculations using the IANA timezone
            database, TimeZone.tools makes no warranty that the information provided is complete,
            reliable, or error-free. Timezone rules change periodically due to political decisions.
            Always verify critical scheduling information with official sources.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The Service should not be used for time-critical applications where errors could result
            in significant harm, including but not limited to medical, legal, or financial decisions.
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">4. Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            The TimeZone.tools name, logo, website design, and original content are the intellectual
            property of TimeZone.tools. All rights are reserved. You may not reproduce, distribute,
            or create derivative works without prior written permission.
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">5. Advertising</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Service is funded through Google AdSense advertisements. By using the Service, you
            acknowledge that advertisements may be displayed. We are not responsible for the content
            of third-party advertisements. Google AdSense may use cookies for personalized ads —
            see our{" "}
            <a href="../privacy-policy" className="text-primary hover:underline">Privacy Policy</a>{" "}
            for details.
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">6. Disclaimer of Warranties</h2>
          <p className="text-muted-foreground leading-relaxed">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND,
            EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">7. Limitation of Liability</h2>
          <p className="text-muted-foreground leading-relaxed">
            TO THE FULLEST EXTENT PERMITTED BY LAW, TIMEZONE.TOOLS SHALL NOT BE LIABLE FOR ANY
            INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR
            RELATED TO YOUR USE OF THE SERVICE.
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">8. Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to modify these Terms at any time. Changes will be posted on this
            page with an updated date. Continued use of the Service after changes constitutes
            acceptance of the modified Terms.
          </p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-3">
          <h2 className="text-lg font-semibold">9. Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions about these Terms? Contact us at{" "}
            <a href="mailto:contact@timezone.tools" className="text-primary hover:underline">
              contact@timezone.tools
            </a>
          </p>
        </div>

      </div>
    </PageLayout>
  );
}
